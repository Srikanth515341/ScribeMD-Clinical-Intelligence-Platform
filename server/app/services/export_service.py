# server/app/services/export_service.py

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.consultation import Consultation
from app.models.clinical_note import ClinicalNote
from app.models.export import Export


def export_consultation_note(
    db: Session,
    consultation_id: int,
    doctor_id: int,
    export_type: str
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

    export_type = export_type.lower()

    if export_type not in ["json", "pdf", "ehr"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid export type"
        )

    file_name = f"consultation_{consultation_id}.{export_type}"

    export_record = Export(
        consultation_id=consultation_id,
        export_type=export_type,
        file_name=file_name,
        status="completed"
    )

    db.add(export_record)
    db.commit()
    db.refresh(export_record)

    return export_record