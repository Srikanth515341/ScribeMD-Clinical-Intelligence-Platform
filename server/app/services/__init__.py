# server/app/services/__init__.py

from app.services.auth_service import register_user, login_user
from app.services.patient_service import (
    create_patient,
    get_all_patients,
    get_patient_by_id,
    update_patient,
    delete_patient,
)
from app.services.consultation_service import (
    create_consultation,
    get_all_consultations,
    get_consultation_by_id,
    update_consultation,
    delete_consultation,
)
from app.services.note_generation_service import (
    generate_note_for_consultation,
    get_note_by_consultation,
)
from app.services.export_service import export_consultation_note
from app.services.audit_service import (
    create_audit_log,
    get_all_audit_logs,
)

__all__ = [
    "register_user",
    "login_user",
    "create_patient",
    "get_all_patients",
    "get_patient_by_id",
    "update_patient",
    "delete_patient",
    "create_consultation",
    "get_all_consultations",
    "get_consultation_by_id",
    "update_consultation",
    "delete_consultation",
    "generate_note_for_consultation",
    "get_note_by_consultation",
    "export_consultation_note",
    "create_audit_log",
    "get_all_audit_logs",
]