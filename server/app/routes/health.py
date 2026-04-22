# server/app/routes/health.py

from fastapi import APIRouter
from app.core.config import settings


router = APIRouter()


@router.get("/")
def health_check():
    return {
        "status": "healthy",
        "app_name": settings.APP_NAME,
        "version": settings.APP_VERSION
    }