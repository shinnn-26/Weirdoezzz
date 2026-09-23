from pydantic import BaseModel,field_validator
import re
class RegistrationCreate(BaseModel):
 full_name:str; college_id:str; phone:str; department:str; year:str; cluster:str; consent:bool; email:str=""; audition_date:str=''; dance_style:str|None=None; experience:str|None=None; instagram:str|None=None; team_name:str|None=None
 @field_validator('full_name','college_id','department','year')
 @classmethod
 def nonempty(cls,v):
  if not v.strip(): raise ValueError('This field is required.')
  return v.strip()
 @field_validator('phone')
 @classmethod
 def phone_ok(cls,v):
  if not re.fullmatch(r'\+?[0-9\s-]{10,15}',v.strip()): raise ValueError('Please enter a valid phone number.')
  return v.strip()
 @field_validator('cluster')
 @classmethod
 def cluster_ok(cls,v):
  if v not in ('CS','Non-CS'): raise ValueError('Please select your cluster.')
  return v
 @field_validator('consent')
 @classmethod
 def consent_ok(cls,v):
  if not v: raise ValueError('Consent is required.')
  return v
class StatusUpdate(BaseModel): status:str
