# server/app/routes/notes.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.dependencies.auth import get_current_user
from app.models.user import User

from app.services.note_generation_service import (
    generate_note_for_consultation,
    get_note_by_consultation
)


router = APIRouter()


@router.post("/generate/{consultation_id}")
def generate_note(
    consultation_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    note = generate_note_for_consultation(
        db=db,
        consultation_id=consultation_id,
        doctor_id=current_user.id
    )

    return {
        "message": "Clinical note generated successfully",
        "note": note
    }


@router.get("/{consultation_id}")
def get_note(
    consultation_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return get_note_by_consultation(
        db=db,
        consultation_id=consultation_id,
        doctor_id=current_user.id
    )