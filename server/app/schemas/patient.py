# server/app/schemas/patient.py

from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime


class PatientCreate(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=120)
    age: int = Field(..., ge=0, le=120)
    gender: str = Field(..., min_length=1, max_length=20)
    phone: Optional[str] = None
    email: Optional[EmailStr] = None


class PatientUpdate(BaseModel):
    full_name: Optional[str] = Field(default=None, min_length=2, max_length=120)
    age: Optional[int] = Field(default=None, ge=0, le=120)
    gender: Optional[str] = Field(default=None, min_length=1, max_length=20)
    phone: Optional[str] = None
    email: Optional[EmailStr] = None


class PatientResponse(BaseModel):
    id: int
    full_name: str
    age: int
    gender: str
    phone: Optional[str]
    email: Optional[EmailStr]
    created_at: datetime

    class Config:
        from_attributes = True