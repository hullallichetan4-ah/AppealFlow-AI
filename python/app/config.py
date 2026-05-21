import os
import secrets
from datetime import timedelta
from pathlib import Path


class Settings:
    BASE_DIR = Path(__file__).resolve().parents[1]
    PROJECT_NAME = "AppealFlow AI Backend"
    DATABASE_URL = os.getenv("DATABASE_URL", f"sqlite:///{BASE_DIR / 'appealflow.db'}")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", secrets.token_urlsafe(32))
    JWT_ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE = timedelta(minutes=int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60")))
    CORS_ORIGINS = [
        origin.strip()
        for origin in os.getenv(
            "CORS_ORIGINS",
            "http://localhost:3000,http://127.0.0.1:5500,http://localhost:5500,http://127.0.0.1:8000,http://localhost:8000,null",
        ).split(",")
        if origin.strip()
    ]


settings = Settings()
