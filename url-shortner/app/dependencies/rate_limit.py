from fastapi import Request, HTTPException, status
from app.redis_client import redis_client

RATE_LIMIT = 10          # max requests
WINDOW_SECONDS = 60      # per this many seconds


def rate_limiter(request: Request):
    client_ip = request.client.host
    key = f"rate_limit:{client_ip}"

    current_count = redis_client.incr(key)

    if current_count == 1:
        # first request in this window — start the expiry clock
        redis_client.expire(key, WINDOW_SECONDS)

    if current_count > RATE_LIMIT:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail=f"Rate limit exceeded. Max {RATE_LIMIT} requests per {WINDOW_SECONDS}s.",
        )