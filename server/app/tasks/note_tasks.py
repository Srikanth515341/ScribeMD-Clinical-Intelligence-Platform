# server/app/tasks/note_tasks.py

from app.core.celery_app import celery


@celery.task(name="generate_clinical_note_task")
def generate_clinical_note_task(consultation_id: int):
    return {
        "message": "Background note generation task queued",
        "consultation_id": consultation_id,
        "status": "completed"
    }