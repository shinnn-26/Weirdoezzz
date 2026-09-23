# WEIRDOEZZZ — Dance Auditions 2026

Production-oriented React/Vite + FastAPI + PostgreSQL registration platform with Google Sheets synchronization and a protected admin dashboard.

## Event
- CS Clusters: 28 September 2026, 2:30 PM–4:30 PM
- Non-CS Clusters: 29 September 2026, 2:30 PM–4:30 PM
- Venue: East Block – Dance Floor
- Contacts: Sarvesh — 9952849291; Yuvan — 9094853407

## 1. Add real assets
The uploaded KIT Coimbatore college logo has been added as `frontend/public/assets/college-logo.png` and is used by the website. The uploaded dance photos are also included in `frontend/public/assets/` as `gallery-1.jpg` through `gallery-10.jpg`.

## 2. PostgreSQL
Create a database named `weirdoezzz` and put your connection string in `backend/.env`.

Example:
`DATABASE_URL=postgresql+psycopg://postgres:PASSWORD@localhost:5432/weirdoezzz`

## 3. Google Sheets
1. Create a Google Cloud project.
2. Enable Google Sheets API.
3. Create a service account and a JSON key.
4. Create a Google Sheet.
5. Share the sheet with the service-account email as Editor.
6. Set `GOOGLE_SHEET_ID` and `GOOGLE_SERVICE_ACCOUNT_JSON` in `backend/.env`.

The backend saves to PostgreSQL first. Google Sheets sync is attempted afterward. If Sheets fails, the registration remains in PostgreSQL with `sheet_synced=false` and can be retried from the admin API.

For production, use a secret manager rather than storing a raw JSON key in source control.

## 4. Backend
```powershell
cd backend
python -m venv venv
.\\venv\\Scripts\\Activate.ps1
pip install -r requirements.txt
copy .env.example .env
python -m uvicorn app.main:app --reload --port 8000
```

API docs: `http://localhost:8000/docs`

## 5. Frontend
```powershell
cd frontend
npm install
npm run dev
```

Optional `frontend/.env`:
`VITE_API_URL=http://localhost:8000/api`

## 6. Admin
Open `/admin`. Set a strong `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `JWT_SECRET` in the backend environment.

## 7. Production deployment
- Frontend: Vercel
- Backend: Render/Railway or another FastAPI host
- Database: managed PostgreSQL such as Neon
- Set `FRONTEND_URL` to the deployed frontend origin.
- Set HTTPS-only production domains.
- Never commit `.env` or service-account credentials.
- Put Google credentials in the host's encrypted secret/environment system.

## API
- `POST /api/register`
- `POST /api/admin/login`
- `GET /api/admin/stats` (protected)
- `GET /api/admin/registrations` (protected)
- `PATCH /api/admin/registrations/{id}/status` (protected)
- `POST /api/admin/registrations/{id}/sync` (protected)
- `GET /health`

## Important production hardening
Add HTTPS, a managed secret store, database backups, structured logging, monitoring, stricter origin configuration, and a distributed rate limiter (for example Redis) before a high-traffic public launch. The included implementation already validates inputs, prevents duplicate college IDs, uses backend-only Google credentials, authenticates admin APIs, and preserves registrations when Sheets is temporarily unavailable.
