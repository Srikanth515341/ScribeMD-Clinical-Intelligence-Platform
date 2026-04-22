# server/app/routes/auth.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.auth import RegisterRequest, LoginRequest
from app.services.auth_service import register_user, login_user


router = APIRouter()


@router.post("/register")
def register(data: RegisterRequest, db: Session = Depends(get_db)):
    user = register_user(
        db=db,
        full_name=data.full_name,
        email=data.email,
        password=data.password
    )

    return {
        "message": "Registration successful",
        "user": {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "role": user.role
        }
    }


@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    return login_user(
        db=db,
        email=data.email,
        password=data.password
    )