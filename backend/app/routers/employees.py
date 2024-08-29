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


@router.get("/", response_model=List[schemas.EmpResponse])
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

    new_emp = models.Employee(**emp.model_dump())
    db.add(new_emp)
    db.commit()
    db.refresh(new_emp)

    return new_emp

# Delete an Employee with specific ID

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_emp(id: int, db: Session = Depends(get_db)):
    emp_query = db.query(models.Employee).filter(models.emp.id == id)

    emp = emp_query.first()

    if emp == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Employee with id: {id} does not exist")

    emp_query.delete(synchronize_session=False)
    db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)

# Update an employee with specific ID


@router.put("/{id}", response_model=schemas.EmpResponse)
def update_emp(id: int, updated_emp: schemas.EmpCreate, db: Session = Depends(get_db)):
    emp_query = db.query(models.Employee).filter(models.Employee.id == id)

    emp = emp_query.first()

    if emp == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Employee with id: {id} does not exist")

    emp_query.update(updated_emp.model_dump(), synchronize_session=False)

    db.commit()

    return emp_query.first()
