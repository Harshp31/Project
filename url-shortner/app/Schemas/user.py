from pydantic import BaseModel, HttpUrl, ConfigDict
from datetime import datetime

class URLCreate(BaseModel):
    long_url: HttpUrl
    
class URLOut(BaseModel):
    short_code: str
    long_url: HttpUrl
    click_count: int
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)
    