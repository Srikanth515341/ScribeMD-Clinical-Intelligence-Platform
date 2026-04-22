# server/app/routes/consultations.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.dependencies.auth import get_current_user
from app.models.user import User

from app.schemas.consultation import (
    ConsultationCreate,
    ConsultationUpdate
)

from app.services.consultation_service import (
    create_consultation,
    get_all_consultations,
    get_consultation_by_id,
    update_consultation,
    delete_consultation
)


router = APIRouter()


@router.post("/")
def add_consultation(
    data: ConsultationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    consultation = create_consultation(
        db=db,
        doctor_id=current_user.id,
        data=data
    )

    return {
        "message": "Consultation created successfully",
        "consultation": consultation
    }


@router.get("/")
def list_consultations(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return get_all_consultations(
        db=db,
        doctor_id=current_user.id
    )


@router.get("/{consultation_id}")
def get_consultation(
    consultation_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return get_consultation_by_id(
        db=db,
        consultation_id=consultation_id,
        doctor_id=current_user.id
    )


@router.put("/{consultation_id}")
def edit_consultation(
    consultation_id: int,
    data: ConsultationUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return update_consultation(
        db=db,
        consultation_id=consultation_id,
        doctor_id=current_user.id,
        data=data
    )


@router.delete("/{consultation_id}")
def remove_consultation(
    consultation_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return delete_consultation(
        db=db,
        consultation_id=consultation_id,
        doctor_id=current_user.id
    )