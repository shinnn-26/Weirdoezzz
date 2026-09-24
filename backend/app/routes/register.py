from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.models.registration import Registration
from app.schemas.registration import RegistrationCreate
from app.services.sheets import append_registration

router = APIRouter()


@router.post("/register")
def create(
    payload: RegistrationCreate,
    db: Session = Depends(get_db)
):
    existing = (
        db.query(Registration)
        .filter(Registration.college_id == payload.college_id)
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=409,
            detail="You are already registered for the WEIRDOEZZZ audition."
        )

    if payload.cluster == "CS":
        date = "28 September 2026"
    else:
        date = "29 September 2026"

    count = db.query(Registration).count() + 1
    rid = f"WZ-2026-{count:03d}"

    r = Registration(
        registration_id=rid,
        full_name=payload.full_name,
        college_id=payload.college_id,
        email=payload.email,
        phone=payload.phone,
        department=payload.department,
        year=payload.year,
        cluster=payload.cluster,
        audition_date=date,
        dance_style=payload.dance_style,
        experience=payload.experience,
        instagram=payload.instagram,
        team_name=payload.team_name
    )

    # Save registration to PostgreSQL
    db.add(r)
    db.commit()
    db.refresh(r)

    # Sync registration to Google Sheets
    try:
        append_registration(r)

        r.sheet_synced = True
        r.sheet_error = None
        db.commit()

    except Exception as e:
        print("GOOGLE SHEETS ERROR:", repr(e))

        r.sheet_synced = False
        r.sheet_error = str(e)
        db.commit()

    return {
        "registration_id": r.registration_id,
        "full_name": r.full_name,
        "cluster": r.cluster,
        "audition_date": r.audition_date,
        "sheet_synced": r.sheet_synced
    }