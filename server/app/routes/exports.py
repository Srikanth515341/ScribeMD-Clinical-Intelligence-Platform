# server/app/routes/exports.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.dependencies.auth import get_current_user
from app.models.user import User

from app.services.export_service import export_consultation_note


router = APIRouter()


@router.post("/{consultation_id}/{export_type}")
def export_note(
    consultation_id: int,
    export_type: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    export_record = export_consultation_note(
        db=db,
        consultation_id=consultation_id,
        doctor_id=current_user.id,
        export_type=export_type
    )

    return {
        "message": "Export completed successfully",
        "export": export_record
    }