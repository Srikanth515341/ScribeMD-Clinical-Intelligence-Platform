# server/app/services/ai_service.py

from app.core.config import settings


def generate_mock_clinical_note(transcript: str):
    short_text = transcript.strip()

    if len(short_text) > 180:
        short_text = short_text[:180] + "..."

    return {
        "subjective": f"Patient reports: {short_text}",
        "objective": "Patient consultation reviewed. Basic observations recorded.",
        "assessment": "Initial clinical assessment suggests follow-up evaluation.",
        "plan": "Prescribe required tests, medications if needed, and follow-up in 7 days."
    }


def generate_ai_note(transcript: str):
    """
    For now uses mock mode.
    Later real OpenAI integration can be added without changing routes.
    """

    if settings.AI_MODE == "mock" or not settings.OPENAI_API_KEY:
        return generate_mock_clinical_note(transcript)

    return generate_mock_clinical_note(transcript)