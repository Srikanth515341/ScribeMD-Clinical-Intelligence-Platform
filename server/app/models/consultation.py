# server/app/models/consultation.py

from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    DateTime,
    ForeignKey
)
from sqlalchemy.sql import func

from app.core.database import Base


class Consultation(Base):
    __tablename__ = "consultations"

    id = Column(Integer, primary_key=True, index=True)

    doctor_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    patient_id = Column(Integer, ForeignKey("patients.id"), nullable=False)

    symptoms = Column(Text, nullable=True)
    transcript = Column(Text, nullable=False)

    status = Column(String(30), default="pending")
    created_at = Column(DateTime(timezone=True), server_default=func.now())