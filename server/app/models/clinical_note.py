# server/app/models/clinical_note.py

from sqlalchemy import (
    Column,
    Integer,
    Text,
    String,
    DateTime,
    ForeignKey
)
from sqlalchemy.sql import func

from app.core.database import Base


class ClinicalNote(Base):
    __tablename__ = "clinical_notes"

    id = Column(Integer, primary_key=True, index=True)

    consultation_id = Column(
        Integer,
        ForeignKey("consultations.id"),
        nullable=False,
        unique=True
    )

    subjective = Column(Text, nullable=True)
    objective = Column(Text, nullable=True)
    assessment = Column(Text, nullable=True)
    plan = Column(Text, nullable=True)

    ai_mode = Column(String(30), default="mock")

    created_at = Column(DateTime(timezone=True), server_default=func.now())