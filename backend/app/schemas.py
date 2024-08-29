from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import List


class BasicStructure(BaseModel):
    name: str


class DeptCreate(BasicStructure):
    pass


class DeptResponse(BasicStructure):
    id: int
    name: str
    created_at: datetime

    class Config:
        orm_mode = True


class EmpCreate(BaseModel):
    id: int
    name: str
    age: int
    email: EmailStr
    deptID: int
    created_at: datetime


class EmpResponse(BaseModel):
    id: int
    name: str
    age: int
    email: EmailStr
    deptID: int
    created_at: datetime

    class Config:
        orm_mode = True

class DeptEmpReport(BaseModel):
    id: int
    name: str
    created_at: datetime
    employees: List[EmpResponse] = []
    class Config:
        orm_mode=True