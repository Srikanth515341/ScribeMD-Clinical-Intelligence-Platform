# server/app/tasks/export_tasks.py

from app.core.celery_app import celery


@celery.task(name="export_clinical_note_task")
def export_clinical_note_task(consultation_id: int, export_type: str):
    return {
        "message": "Background export task queued",
        "consultation_id": consultation_id,
        "export_type": export_type,
        "status": "completed"
    }