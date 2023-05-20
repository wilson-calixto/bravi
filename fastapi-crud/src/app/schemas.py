from datetime import datetime
from typing import List
from pydantic import BaseModel


        # "email": "1",
        # "phone": "1"


class UserBaseSchema(BaseModel):
    firstName: str
    lastName: str
    address: str | None = None
    phone: str | None = None
    email: str | None = None
    activated: bool = False
    createdAt: datetime | None = None
    updatedAt: datetime | None = None

    class Config:
        orm_mode = True
        allow_population_by_field_name = True
        arbitrary_types_allowed = True


class ListUserResponse(BaseModel):
    status: str
    results: int
    users: List[UserBaseSchema]
