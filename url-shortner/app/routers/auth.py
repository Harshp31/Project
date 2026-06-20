import redis
from app.config import Settings

redis_client = redis.Redis.from_url(Settings.redis_url, decode_responses=True)