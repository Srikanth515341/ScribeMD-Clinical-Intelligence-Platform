# server/app/routes/__init__.py

from app.routes.auth import router as auth_router
from app.routes.users import router as users_router
from app.routes.patients import router as patients_router
from app.routes.consultations import router as consultations_router
from app.routes.notes import router as notes_router
from app.routes.exports import router as exports_router
from app.routes.health import router as health_router

__all__ = [
    "auth_router",
    "users_router",
    "patients_router",
    "consultations_router",
    "notes_router",
    "exports_router",
    "health_router",
]