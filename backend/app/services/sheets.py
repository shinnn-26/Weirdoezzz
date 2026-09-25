import json
import gspread
from google.oauth2.service_account import Credentials
from app.config import settings

HEADERS=[
 'Registration ID','Timestamp','Full Name','Phone','Department','Year','Student Type','Cluster','Audition Date','Audition Time','Dance Style','Previous Dance Experience','Status'
]

def append_registration(r):
 if not settings.google_sheet_id: raise RuntimeError('GOOGLE_SHEET_ID is not configured')
 if not settings.google_service_account_json: raise RuntimeError('GOOGLE_SERVICE_ACCOUNT_JSON is not configured')
 info=json.loads(settings.google_service_account_json)
 credentials=Credentials.from_service_account_info(info,scopes=['https://www.googleapis.com/auth/spreadsheets'])
 sheet=gspread.authorize(credentials).open_by_key(settings.google_sheet_id).sheet1
 current_headers=sheet.get('A1:M1')
 if not current_headers or current_headers[0]!=HEADERS:
  sheet.update('A1:M1',[HEADERS],value_input_option='USER_ENTERED')
 row=[
  r.registration_id,r.timestamp.isoformat() if r.timestamp else '',r.full_name,r.phone,r.department,r.year,r.student_type,r.cluster,r.audition_date,r.audition_time or '',r.dance_style or '',r.experience or '',r.status or 'Registered'
 ]
 column_a=sheet.col_values(1)
 next_row=max(2,len(column_a)+1)
 sheet.update(f'A{next_row}:M{next_row}',[row],value_input_option='USER_ENTERED')
