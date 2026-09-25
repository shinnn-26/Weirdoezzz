from sqlalchemy import String,Integer,DateTime,Boolean,Text
from sqlalchemy.orm import Mapped,mapped_column
from datetime import datetime
from app.database.db import Base

class Registration(Base):
 __tablename__='registrations'
 id:Mapped[int]=mapped_column(Integer,primary_key=True)
 registration_id:Mapped[str]=mapped_column(String(30),unique=True,index=True)
 timestamp:Mapped[datetime]=mapped_column(DateTime,default=datetime.utcnow,index=True)
 full_name:Mapped[str]=mapped_column(String(120))
 # Legacy field retained as nullable for compatibility with an existing Neon table. It is no longer collected or shown in the website.
 college_id:Mapped[str|None]=mapped_column(String(80),unique=True,index=True,nullable=True)
 email:Mapped[str]=mapped_column(String(255),default='')
 phone:Mapped[str]=mapped_column(String(20))
 department:Mapped[str]=mapped_column(String(100))
 year:Mapped[str]=mapped_column(String(20))
 student_type:Mapped[str]=mapped_column(String(50),default='Day Scholar')
 cluster:Mapped[str]=mapped_column(String(20))
 audition_date:Mapped[str]=mapped_column(String(40))
 audition_time:Mapped[str]=mapped_column(String(40),default='2:30 PM – 4:30 PM')
 venue:Mapped[str]=mapped_column(String(120),default='East Block – Dance Floor')
 dance_style:Mapped[str|None]=mapped_column(String(120),nullable=True)
 experience:Mapped[str|None]=mapped_column(Text,nullable=True)
 instagram:Mapped[str|None]=mapped_column(String(120),nullable=True)
 team_name:Mapped[str|None]=mapped_column(String(120),nullable=True)
 status:Mapped[str]=mapped_column(String(30),default='Registered')
 sheet_synced:Mapped[bool]=mapped_column(Boolean,default=False)
 sheet_error:Mapped[str|None]=mapped_column(Text,nullable=True)
