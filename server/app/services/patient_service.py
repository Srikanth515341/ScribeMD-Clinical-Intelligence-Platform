# server/app/services/patient_service.py

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.patient import Patient


def create_patient(db: Session, data):
    patient = Patient(
        full_name=data.full_name,
        age=data.age,
        gender=data.gender,
        phone=data.phone,
        email=data.email
    )

    db.add(patient)
    db.commit()
    db.refresh(patient)

    return patient


def get_all_patients(db: Session):
    return db.query(Patient).order_by(Patient.id.desc()).all()


def get_patient_by_id(db: Session, patient_id: int):
    patient = db.query(Patient).filter(Patient.id == patient_id).first()

    if not patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found"
        )

    return patient


def update_patient(db: Session, patient_id: int, data):
    patient = get_patient_by_id(db, patient_id)

    update_data = data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(patient, key, value)

    db.commit()
    db.refresh(patient)

    return patient


def delete_patient(db: Session, patient_id: int):
    patient = get_patient_by_id(db, patient_id)

    db.delete(patient)
    db.commit()

    return {"message": "Patient deleted successfully"}