from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db
from typing import List

router = APIRouter(
    prefix="/employees",
    tags=['Employees']
)

# Get all employees


@router.get(response_model=List[schemas.EmpResponse])
def get_emp(db: Session = Depends(get_db)):
    emp = db.query(models.Employee).all()
    return emp


# Get an employee with a specific ID


@router.get('/{id}', response_model=schemas.EmpResponse)
def get_emp(id: int, db: Session = Depends(get_db)):
    emp = db.query(models.Employee).filter(models.Employee.id == id).first()
    if not emp:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Employee with id: {id} does not exist")

    return emp


# Create an Employee


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.EmpResponse)
def create_emp(emp: schemas.EmpCreate, db: Session = Depends(get_db)):

    new_emp = models.User(**emp.model_dump())
    db.add(new_emp)
    db.commit()
    db.refresh(new_emp)

    return new_emp
