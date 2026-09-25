from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import logging
from app.database.db import get_db
from app.models.registration import Registration
from app.schemas.registration import RegistrationCreate,CS_DEPARTMENTS
from app.services.sheets import append_registration

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post('/register')
def create(payload: RegistrationCreate, db: Session = Depends(get_db)):
    cluster = 'CS' if payload.department in CS_DEPARTMENTS else 'Non-CS'
    date = '7 October 2026' if cluster == 'CS' else '6 October 2026'
    count = db.query(Registration).count() + 1
    rid = f'WZ-2026-{count:03d}'
    r = Registration(
        registration_id=rid,
        full_name=payload.full_name,
        college_id=None,
        email=payload.email,
        phone=payload.phone,
        department=payload.department,
        year=payload.year,
        student_type=payload.student_type,
        cluster=cluster,
        audition_date=date,
        dance_style=payload.dance_style,
        experience=payload.experience,
        instagram=payload.instagram,
        team_name=payload.team_name
    )
    db.add(r)
    db.commit()
    db.refresh(r)
    logger.info('Registration saved to Neon: %s',r.registration_id)
    try:
        append_registration(r)
        r.sheet_synced=True
        r.sheet_error=None
        db.commit()
    except Exception as e:
        logger.exception('Google Sheets sync failed')
        r.sheet_synced=False
        r.sheet_error=str(e)
        db.commit()
    return {
        'registration_id':r.registration_id,
        'full_name':r.full_name,
        'department':r.department,
        'student_type':r.student_type,
        'dance_style':r.dance_style,
        'cluster':r.cluster,
        'audition_date':r.audition_date,
        'sheet_synced':r.sheet_synced
    }
