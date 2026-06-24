from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.url import URL
from app.models.user import User
from app.schemas.url import URLCreate, URLOut
from app.core.encoding import encode
from app.dependencies.auth import get_current_user
from app.dependencies.rate_limiter import rate_limiter
from app.redis_client import redis_client
from app.tasks.analytics import log_click

router = APIRouter(tags=["urls"])

CACHE_TTL_SECONDS = 3600  # cache long URLs for 1 hour


@router.post(
    "/shorten",
    response_model=URLOut,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(rate_limiter)],
)
def shorten_url(
    url_in: URLCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    new_url = URL(long_url=str(url_in.long_url), owner_id=current_user.id)
    db.add(new_url)
    db.commit()
    db.refresh(new_url)

    new_url.short_code = encode(new_url.id)
    db.commit()
    db.refresh(new_url)

    return new_url


@router.get("/{short_code}")
def redirect_to_long_url(short_code: str, db: Session = Depends(get_db)):
    cached_url = redis_client.get(f"short_code:{short_code}")

    if cached_url:
        log_click.delay(short_code)
        return RedirectResponse(url=cached_url, status_code=status.HTTP_302_FOUND)

    url_entry = db.query(URL).filter(URL.short_code == short_code).first()
    if not url_entry:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Short URL not found",
        )

    redis_client.set(
        f"short_code:{short_code}", url_entry.long_url, ex=CACHE_TTL_SECONDS
    )

    log_click.delay(short_code)

    return RedirectResponse(url=url_entry.long_url, status_code=status.HTTP_302_FOUND)