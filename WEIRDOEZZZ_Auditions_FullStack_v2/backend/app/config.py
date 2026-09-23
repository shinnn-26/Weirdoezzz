from pydantic_settings import BaseSettings,SettingsConfigDict
class Settings(BaseSettings):
 database_url:str='postgresql+psycopg://postgres:postgres@localhost:5432/weirdoezzz'
 frontend_url:str='http://localhost:5173'
 google_sheet_id:str=''
 google_service_account_json:str=''
 admin_username:str='admin'
 admin_password:str='change-me-now'
 jwt_secret:str='change-this-in-production'
 model_config=SettingsConfigDict(env_file='.env',extra='ignore')
settings=Settings()
