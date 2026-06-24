from app.celery_app import celery_app
from app.database import SessionLocal
from app.models.url import URL


@celery_app.task(name="log_click")
def log_click(short_code: str):
    db = SessionLocal()
    try:
        url_entry = db.query(URL).filter(URL.short_code == short_code).first()
        if url_entry:
            url_entry.click_count += 1
            db.commit()
    finally:
        db.close()