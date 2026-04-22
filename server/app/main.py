# server/app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.database import Base, engine

from app.routes.auth import router as auth_router
from app.routes.users import router as users_router
from app.routes.patients import router as patients_router
from app.routes.consultations import router as consultations_router
from app.routes.notes import router as notes_router
from app.routes.exports import router as exports_router
from app.routes.health import router as health_router


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    debug=settings.DEBUG
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.FRONTEND_URL,
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router, prefix="/api/health", tags=["Health"])
app.include_router(auth_router, prefix="/api/auth", tags=["Auth"])
app.include_router(users_router, prefix="/api/users", tags=["Users"])
app.include_router(patients_router, prefix="/api/patients", tags=["Patients"])
app.include_router(
    consultations_router,
    prefix="/api/consultations",
    tags=["Consultations"]
)
app.include_router(notes_router, prefix="/api/notes", tags=["Clinical Notes"])
app.include_router(exports_router, prefix="/api/exports", tags=["Exports"])


@app.get("/")
def root():
    return {
        "message": f"Welcome to {settings.APP_NAME} API",
        "version": settings.APP_VERSION,
        "status": "running"
    }