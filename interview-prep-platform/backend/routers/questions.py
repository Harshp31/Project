from fastapi import APIRouter

router = APIRouter()

@router.post("/questions")
async def get_questions():
    # Placeholder — full implementation in Phase 2
    return {"message": "Questions endpoint ready", "questions": []}