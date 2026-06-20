 # Settings (env vars), loaded via pydantic
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str
    redis_url: str
    jwt_secret_key: str
    jwt_algorithm: str
    access_token_expire_minutes: int
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
    
 