from datetime import datetime, timedelta, timezone
import bcrypt
from jose import jwt, JWTError
from app.config import Settings

def hash_password(plain_password: str) -> str:
    password_bytes = plain_password.encode("utf-8")
    hashed = bcrypt.hashpw(password_bytes, bcrypt.gensalt())
    return hashed.decode("utf-8")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(
        plain_password.encode("utf-8"), hashed_password.encode("utf-8")
    )
    
def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=Settings.access_token_expire_minutes
    )
    to_encode.update({"exp": expire})
    return jwt.encode(
        to_encode, Settings.jwt_secret_key, algorithm=Settings.jwt_algorithm
    )
    
def decode_access_token(token: str) -> dict | None:
    try: 
        payload = jwt.decode(
            token, Settings.jwt_secret_key, algorithm=[Settings.jwt_algorithm]
        )
        return payload
    except JWTError:
        return None