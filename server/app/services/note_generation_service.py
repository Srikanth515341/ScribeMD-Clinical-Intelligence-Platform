# server/app/services/note_generation_service.py

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.consultation import Consultation
from app.models.clinical_note import ClinicalNote

from app.core.config import settings
from app.services.ai_service import generate_ai_note


def generate_note_for_consultation(
    db: Session,
    consultation_id: int,
    doctor_id: int
):
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

    existing_note = (
        db.query(ClinicalNote)
        .filter(ClinicalNote.consultation_id == consultation_id)
        .first()
    )

    if existing_note:
        return existing_note

    generated = generate_ai_note(consultation.transcript)

    note = ClinicalNote(
        consultation_id=consultation.id,
        subjective=generated["subjective"],
        objective=generated["objective"],
        assessment=generated["assessment"],
        plan=generated["plan"],
        ai_mode=settings.AI_MODE
    )

    consultation.status = "completed"

    db.add(note)
    db.commit()
    db.refresh(note)

    return note


def get_note_by_consultation(
    db: Session,
    consultation_id: int,
    doctor_id: int
):
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

    note = (
        db.query(ClinicalNote)
        .filter(ClinicalNote.consultation_id == consultation_id)
        .first()
    )

    if not note:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Clinical note not found"
        )

    return note