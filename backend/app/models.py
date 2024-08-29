from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationships
from sqlalchemy.sql.expression import text
from sqlalchemy.sql.sqltypes import TIMESTAMP

from .database import Base


class Dept(Base):
    __tablename__ = "department"

    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True),
                        nullable=False, server_default=text('now()'))


class Employee(Base):
    __tablename__ = "employees"
    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String, nullable=False)
    age = Column(Integer, nullable=False)
    email = Column(String, nullable=False, unique=True)
    deptID = Column(Integer, ForeignKey("department.id",
                    ondelete="CASCADE"), nullable=False)
    created_at = Column(TIMESTAMP(timezone=True),
                        nullable=False, server_default=text('now()'))

    deptRel = relationships("Dept")
