# server/app/models/export.py

from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey
)
from sqlalchemy.sql import func

from app.core.database import Base


class Export(Base):
    __tablename__ = "exports"

    id = Column(Integer, primary_key=True, index=True)

    consultation_id = Column(
        Integer,
        ForeignKey("consultations.id"),
        nullable=False
    )

    export_type = Column(String(30), nullable=False)   # pdf / json / ehr
    file_name = Column(String(255), nullable=True)
    status = Column(String(30), default="completed")

    created_at = Column(DateTime(timezone=True), server_default=func.now())