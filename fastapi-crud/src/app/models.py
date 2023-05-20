from app.database import Base
from sqlalchemy import TIMESTAMP, Column, String, Boolean,Integer,Identity
from sqlalchemy.sql import func
from fastapi_utils.guid_type import GUID, GUID_DEFAULT_SQLITE


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, autoincrement=True)
    firstName = Column(String, nullable=False)
    lastName = Column(String, nullable=False)
    address = Column(String, nullable=True)
    phone= Column(String, nullable=True)
    email= Column(String, nullable=True)

    activated = Column(Boolean, nullable=False, default=True)
    createdAt = Column(
        TIMESTAMP(timezone=True), nullable=False, server_default=func.now()
    )
    updatedAt = Column(TIMESTAMP(timezone=True), default=None, onupdate=func.now())
