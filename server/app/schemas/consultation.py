# server/app/schemas/consultation.py

from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class ConsultationCreate(BaseModel):
    patient_id: int
    symptoms: Optional[str] = None
    transcript: str = Field(..., min_length=5)


class ConsultationUpdate(BaseModel):
    symptoms: Optional[str] = None
    transcript: Optional[str] = Field(default=None, min_length=5)
    status: Optional[str] = None


class ConsultationResponse(BaseModel):
    id: int
    doctor_id: int
    patient_id: int
    symptoms: Optional[str]
    transcript: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True