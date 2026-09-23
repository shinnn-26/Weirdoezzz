import json,gspread
from google.oauth2.service_account import Credentials
from app.config import settings
HEADERS=['Registration ID','Timestamp','Full Name','College ID','Email','Phone','Department','Year','Cluster','Audition Date','Audition Time','Venue','Dance Style','Experience','Instagram','Status']
def append_registration(r):
 if not settings.google_sheet_id or not settings.google_service_account_json: raise RuntimeError('Google Sheets is not configured')
 raw=settings.google_service_account_json
 info=json.loads(raw)
 scopes=['https://www.googleapis.com/auth/spreadsheets']
 creds=Credentials.from_service_account_info(info,scopes=scopes)
 client=gspread.authorize(creds); sheet=client.open_by_key(settings.google_sheet_id).sheet1
 if not sheet.row_values(1): sheet.append_row(HEADERS)
 row=[r.registration_id,r.timestamp.isoformat(),r.full_name,r.college_id,r.email,r.phone,r.department,r.year,r.cluster,r.audition_date,r.audition_time,r.venue,r.dance_style or '',r.experience or '',r.instagram or '',r.status]
 sheet.append_row(row,value_input_option='USER_ENTERED')
