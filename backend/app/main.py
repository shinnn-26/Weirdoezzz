from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter,_rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from app.config import settings
from app.database.db import Base,engine
from app.routes.register import router as register_router
from app.routes.admin import router as admin_router
app=FastAPI(title='WEIRDOEZZZ Auditions API',version='1.0.0')
app.state.limiter=Limiter(key_func=get_remote_address);app.add_exception_handler(RateLimitExceeded,_rate_limit_exceeded_handler)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.frontend_url.rstrip("/"),
        "https://weirdoezzz-czdren6o1-dracarys11.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
Base.metadata.create_all(bind=engine)
app.include_router(register_router,prefix='/api');app.include_router(admin_router,prefix='/api')
@app.get('/health')
def health(): return {'status':'ok'}
