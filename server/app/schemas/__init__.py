# server/app/schemas/__init__.py

from app.schemas.auth import RegisterRequest, LoginRequest, TokenData
from app.schemas.user import UserResponse, UserProfileResponse
from app.schemas.patient import PatientCreate, PatientUpdate, PatientResponse
from app.schemas.consultation import (
    ConsultationCreate,
    ConsultationUpdate,
    ConsultationResponse,
)
from app.schemas.clinical_note import (
    ClinicalNoteCreate,
    ClinicalNoteResponse,
)
from app.schemas.export import ExportCreate, ExportResponse
from app.schemas.common import (
    MessageResponse,
    TokenResponse,
    PaginationParams,
    IDResponse,
    ErrorResponse,
    HealthResponse,
    SearchQuery,
)

__all__ = [
    "RegisterRequest",
    "LoginRequest",
    "TokenData",
    "UserResponse",
    "UserProfileResponse",
    "PatientCreate",
    "PatientUpdate",
    "PatientResponse",
    "ConsultationCreate",
    "ConsultationUpdate",
    "ConsultationResponse",
    "ClinicalNoteCreate",
    "ClinicalNoteResponse",
    "ExportCreate",
    "ExportResponse",
    "MessageResponse",
    "TokenResponse",
    "PaginationParams",
    "IDResponse",
    "ErrorResponse",
    "HealthResponse",
    "SearchQuery",
]