from datetime import datetime,timedelta,timezone
import jwt
from fastapi import Depends,HTTPException
from fastapi.security import HTTPBearer,HTTPAuthorizationCredentials
from app.config import settings
security=HTTPBearer()
def make_token(subject): return jwt.encode({'sub':subject,'exp':datetime.now(timezone.utc)+timedelta(hours=8)},settings.jwt_secret,algorithm='HS256')
def admin_required(creds:HTTPAuthorizationCredentials=Depends(security)):
 try:
  p=jwt.decode(creds.credentials,settings.jwt_secret,algorithms=['HS256'])
  if p.get('sub')!='admin': raise Exception()
  return True
 except Exception: raise HTTPException(401,'Invalid or expired admin token')
