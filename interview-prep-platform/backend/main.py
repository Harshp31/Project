from fastapi import FastAPI

from backend.routers.health import router as health_router
from backend.routers.questions import router as questions_router


app = FastAPI(title="Interview Prep API")

# Routers
app.include_router(health_router)
app.include_router(questions_router)


