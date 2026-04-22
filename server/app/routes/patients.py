# server/app/routes/patients.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.dependencies.auth import get_current_user
from app.models.user import User

from app.schemas.patient import PatientCreate, PatientUpdate
from app.services.patient_service import (
    create_patient,
    get_all_patients,
    get_patient_by_id,
    update_patient,
    delete_patient
)


router = APIRouter()


@router.post("/")
def add_patient(
    data: PatientCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    patient = create_patient(db, data)

    return {
        "message": "Patient created successfully",
        "patient": patient
    }


@router.get("/")
def list_patients(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return get_all_patients(db)


@router.get("/{patient_id}")
def get_patient(
    patient_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return get_patient_by_id(db, patient_id)


@router.put("/{patient_id}")
def edit_patient(
    patient_id: int,
    data: PatientUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return update_patient(db, patient_id, data)


@router.delete("/{patient_id}")
def remove_patient(
    patient_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return delete_patient(db, patient_id)