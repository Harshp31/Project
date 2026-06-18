#FastAPI app instances, mounts routers and startup
from fastapi import FastAPI
 
from app.routers import auth, urls
 
app = FastAPI(title="URL Shortener API")
 
app.include_router(auth.router)
app.include_router(urls.router)
 
 
@app.get("/health")
def health_check():
    return {"status": "ok"}