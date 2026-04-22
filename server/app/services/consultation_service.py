# server/app/services/consultation_service.py

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.consultation import Consultation


def create_consultation(db: Session, doctor_id: int, data):
    consultation = Consultation(
        doctor_id=doctor_id,
        patient_id=data.patient_id,
        symptoms=data.symptoms,
        transcript=data.transcript,
        status="pending"
    )

    db.add(consultation)
    db.commit()
    db.refresh(consultation)

    return consultation


def get_all_consultations(db: Session, doctor_id: int):
    return (
        db.query(Consultation)
        .filter(Consultation.doctor_id == doctor_id)
        .order_by(Consultation.id.desc())
        .all()
    )


def get_consultation_by_id(db: Session, consultation_id: int, doctor_id: int):
    consultation = (
        db.query(Consultation)
        .filter(
            Consultation.id == consultation_id,
            Consultation.doctor_id == doctor_id
        )
        .first()
    )

    if not consultation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Consultation not found"
        )

    return consultation


def update_consultation(db: Session, consultation_id: int, doctor_id: int, data):
    consultation = get_consultation_by_id(db, consultation_id, doctor_id)

    update_data = data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(consultation, key, value)

    db.commit()
    db.refresh(consultation)

    return consultation


def delete_consultation(db: Session, consultation_id: int, doctor_id: int):
    consultation = get_consultation_by_id(db, consultation_id, doctor_id)

    db.delete(consultation)
    db.commit()

    return {"message": "Consultation deleted successfully"}