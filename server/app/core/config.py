# server/app/core/config.py

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "ClinicalDocAI"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True

    HOST: str = "127.0.0.1"
    PORT: int = 8000

    FRONTEND_URL: str = "http://localhost:3000"

    DATABASE_URL: str = "postgresql://postgres:Srikanth@123@localhost:5432/ClinicalDocAI-Backend"

    SECRET_KEY: str = "clinicaldocai_super_secret_key_change_in_production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24

    OPENAI_API_KEY: str = ""
    AI_MODE: str = "mock"

    REDIS_URL: str = "redis://localhost:6379/0"

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True
    )


settings = Settings()