# server/app/schemas/export.py

from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class ExportCreate(BaseModel):
    consultation_id: int
    export_type: str


class ExportResponse(BaseModel):
    id: int
    consultation_id: int
    export_type: str
    file_name: Optional[str]
    status: str
    created_at: datetime

    class Config:
        from_attributes = True