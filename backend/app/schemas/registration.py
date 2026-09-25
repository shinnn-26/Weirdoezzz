from pydantic import BaseModel,field_validator
import re

DEPARTMENTS={
 'Artificial Intelligence and Data Science',
 'Artificial Intelligence and Machine Learning',
 'Computer Science and Engineering',
 'Computer Science and Business Systems',
 'Cyber Security',
 'Mechanical Engineering',
 'Electronics and Communication Engineering',
 'Electrical and Electronics Engineering',
 'Biotechnology',
 'Biomedical Engineering',
 'Very Large Scale Integration',
 'Aeronautical Engineering'
}
CS_DEPARTMENTS={
 'Artificial Intelligence and Data Science',
 'Artificial Intelligence and Machine Learning',
 'Computer Science and Engineering',
 'Computer Science and Business Systems',
 'Cyber Security'
}
STUDENT_TYPES={'Day Scholar','Day Scholar (College Bus)','Hosteller'}
DANCE_STYLES={'Classical','Folk','Western','Hip-Hop','Contemporary','Bollywood','Freestyle','Other'}

class RegistrationCreate(BaseModel):
 full_name:str; phone:str; department:str; year:str; student_type:str; dance_style:str; consent:bool; cluster:str|None=None; email:str=""; audition_date:str=''; experience:str|None=None; instagram:str|None=None; team_name:str|None=None
 @field_validator('full_name','department','year','student_type','dance_style')
 @classmethod
 def nonempty(cls,v):
  if not v.strip(): raise ValueError('This field is required.')
  return v.strip()
 @field_validator('phone')
 @classmethod
 def phone_ok(cls,v):
  if not re.fullmatch(r'\+?[0-9\s-]{10,15}',v.strip()): raise ValueError('Please enter a valid phone number.')
  return v.strip()
 @field_validator('department')
 @classmethod
 def department_ok(cls,v):
  if v not in DEPARTMENTS: raise ValueError('Please select a valid department.')
  return v
 @field_validator('year')
 @classmethod
 def year_ok(cls,v):
  if v not in {'1','2','3','4'}: raise ValueError('Please select year 1, 2, 3 or 4.')
  return v
 @field_validator('student_type')
 @classmethod
 def student_type_ok(cls,v):
  if v not in STUDENT_TYPES: raise ValueError('Please select a valid student type.')
  return v
 @field_validator('dance_style')
 @classmethod
 def dance_style_ok(cls,v):
  if v not in DANCE_STYLES: raise ValueError('Please select a valid dance style.')
  return v
 @field_validator('consent')
 @classmethod
 def consent_ok(cls,v):
  if not v: raise ValueError('Consent is required.')
  return v

class StatusUpdate(BaseModel): status:str
