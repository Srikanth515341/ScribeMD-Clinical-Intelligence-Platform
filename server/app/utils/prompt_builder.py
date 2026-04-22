# server/app/utils/prompt_builder.py

def build_clinical_prompt(transcript: str) -> str:
    return f"""
You are a clinical documentation assistant.

Convert the following doctor-patient conversation into structured SOAP notes.

Conversation:
{transcript}

Return:
Subjective
Objective
Assessment
Plan
""".strip()