# server/app/services/audit_service.py

from sqlalchemy.orm import Session

from app.models.audit_log import AuditLog


def create_audit_log(
    db: Session,
    action: str,
    entity: str,
    entity_id: int = None,
    user_id: int = None
):
    log = AuditLog(
        user_id=user_id,
        action=action,
        entity=entity,
        entity_id=entity_id
    )

    db.add(log)
    db.commit()
    db.refresh(log)

    return log


def get_all_audit_logs(db: Session):
    return (
        db.query(AuditLog)
        .order_by(AuditLog.id.desc())
        .all()
    )