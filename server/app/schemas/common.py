# server/app/schemas/common.py

from pydantic import BaseModel
from typing import Optional


class MessageResponse(BaseModel):
    message: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class PaginationParams(BaseModel):
    skip: int = 0
    limit: int = 10


class IDResponse(BaseModel):
    id: int


class ErrorResponse(BaseModel):
    detail: str


class HealthResponse(BaseModel):
    status: str
    app_name: str
    version: str


class SearchQuery(BaseModel):
    query: Optional[str] = None