from sqlalchemy import create_engine,text
from sqlalchemy.orm import DeclarativeBase,sessionmaker
from app.config import settings
engine=create_engine(settings.database_url,pool_pre_ping=True)
SessionLocal=sessionmaker(bind=engine,autocommit=False,autoflush=False)
class Base(DeclarativeBase): pass
def get_db():
 db=SessionLocal()
 try: yield db
 finally: db.close()

def ensure_schema_compatibility():
    # create_all handles new installs; these statements keep an existing Neon table usable after the form changes.
    with engine.begin() as conn:
        conn.execute(text("ALTER TABLE registrations ADD COLUMN IF NOT EXISTS student_type VARCHAR(50) DEFAULT 'Day Scholar'"))
        try:
            conn.execute(text("ALTER TABLE registrations ALTER COLUMN college_id DROP NOT NULL"))
        except Exception:
            pass
