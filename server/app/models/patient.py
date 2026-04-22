# server/app/models/patient.py

from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from app.core.database import Base


class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String(120), nullable=False)
    age = Column(Integer, nullable=False)
    gender = Column(String(20), nullable=False)

    phone = Column(String(30), nullable=True)
    email = Column(String(120), nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())