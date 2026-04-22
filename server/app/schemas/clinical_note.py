# server/app/schemas/clinical_note.py

from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ClinicalNoteCreate(BaseModel):
    consultation_id: int
    subjective: Optional[str] = None
    objective: Optional[str] = None
    assessment: Optional[str] = None
    plan: Optional[str] = None


class ClinicalNoteResponse(BaseModel):
    id: int
    consultation_id: int
    subjective: Optional[str]
    objective: Optional[str]
    assessment: Optional[str]
    plan: Optional[str]
    ai_mode: str
    created_at: datetime

    class Config:
        from_attributes = True