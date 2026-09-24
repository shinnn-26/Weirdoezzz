import json
import gspread

from google.oauth2.service_account import Credentials
from app.config import settings


HEADERS = [
    "Registration ID",
    "Timestamp",
    "Full Name",
    "College ID",
    "Email",
    "Phone",
    "Department",
    "Year",
    "Cluster",
    "Audition Date",
    "Audition Time",
    "Dance Style",
    "Instagram",
    "Team/Group",
    "Status",
]


def append_registration(r):
    if not settings.google_sheet_id:
        raise RuntimeError("GOOGLE_SHEET_ID is not configured")

    if not settings.google_service_account_json:
        raise RuntimeError("GOOGLE_SERVICE_ACCOUNT_JSON is not configured")

    # Load service-account credentials
    info = json.loads(settings.google_service_account_json)

    scopes = [
        "https://www.googleapis.com/auth/spreadsheets"
    ]

    credentials = Credentials.from_service_account_info(
        info,
        scopes=scopes
    )

    client = gspread.authorize(credentials)

    # Open spreadsheet
    spreadsheet = client.open_by_key(settings.google_sheet_id)

    # First worksheet
    sheet = spreadsheet.sheet1

    # Make sure headers exist in A1:O1
    current_headers = sheet.get("A1:O1")

    if not current_headers or current_headers[0] != HEADERS:
        sheet.update(
            "A1:O1",
            [HEADERS],
            value_input_option="USER_ENTERED"
        )

    # Registration data
    row = [
        r.registration_id,
        r.timestamp.isoformat() if r.timestamp else "",
        r.full_name,
        r.college_id,
        r.email,
        r.phone,
        r.department,
        r.year,
        r.cluster,
        r.audition_date,
        r.audition_time or "",
        r.dance_style or "",
        r.instagram or "",
        r.team_name or "",
        r.status or "Registered",
    ]

    # Find the next empty row using column A
    column_a = sheet.col_values(1)

    next_row = len(column_a) + 1

    # Never write registration data above row 2
    if next_row < 2:
        next_row = 2

    # Explicitly write to A:O
    sheet.update(
        f"A{next_row}:O{next_row}",
        [row],
        value_input_option="USER_ENTERED"
    )

    print(
        f"Google Sheets sync successful: "
        f"{r.registration_id} → row {next_row}"
    )
