from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime
from app.database.db import get_db
from app.models.registration import Registration
from app.schemas.registration import StatusUpdate
from app.config import settings
from app.utils.auth import make_token,admin_required
from app.services.sheets import append_registration
router=APIRouter()
@router.post('/admin/login')
def login(body:dict):
 if body.get('username')!=settings.admin_username or body.get('password')!=settings.admin_password: raise HTTPException(401,'Invalid admin credentials')
 return {'access_token':make_token('admin')}
@router.get('/admin/stats')
def stats(_:bool=Depends(admin_required),db:Session=Depends(get_db)):
 today=datetime.utcnow().date(); return {'total':db.query(Registration).count(),'cs':db.query(Registration).filter(Registration.cluster=='CS').count(),'non_cs':db.query(Registration).filter(Registration.cluster=='Non-CS').count(),'today':db.query(Registration).filter(func.date(Registration.timestamp)==today).count()}
@router.get('/admin/registrations')
def list_regs(search:str='',cluster:str='',department:str='',year:str='',date:str='',_:bool=Depends(admin_required),db:Session=Depends(get_db)):
 q=db.query(Registration)
 if search:q=q.filter((Registration.full_name.ilike(f'%{search}%'))|(Registration.college_id.ilike(f'%{search}%'))|(Registration.email.ilike(f'%{search}%')))
 if cluster:q=q.filter(Registration.cluster==cluster)
 if department:q=q.filter(Registration.department.ilike(f'%{department}%'))
 if year:q=q.filter(Registration.year==year)
 if date:q=q.filter(Registration.audition_date==date)
 return [{c:getattr(r,c) for c in ['id','registration_id','full_name','college_id','email','phone','department','year','cluster','audition_date','status','sheet_synced']} for r in q.order_by(Registration.timestamp.desc()).all()]
@router.patch('/admin/registrations/{id}/status')
def status(id:int,p:StatusUpdate,_:bool=Depends(admin_required),db:Session=Depends(get_db)):
 if p.status not in ['Registered','Shortlisted','Auditioned','Selected','Not Selected']: raise HTTPException(400,'Invalid status')
 r=db.get(Registration,id)
 if not r: raise HTTPException(404,'Registration not found')
 r.status=p.status;db.commit();return {'ok':True}
@router.post('/admin/registrations/{id}/sync')
def sync(id:int,_:bool=Depends(admin_required),db:Session=Depends(get_db)):
 r=db.get(Registration,id)
 if not r: raise HTTPException(404,'Registration not found')
 try: append_registration(r);r.sheet_synced=True;r.sheet_error=None;db.commit();return {'ok':True}
 except Exception as e: raise HTTPException(502,f'Google Sheets sync failed: {e}')
