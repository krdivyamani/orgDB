from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from typing import List

from .. import models, schemas
from ..database import get_db


router = APIRouter(
    prefix="/departments",
    tags=['Departments']
)

# Get all dept


@router.get("/", response_model=List[schemas.ReportResponse])
def get_dept(db: Session = Depends(get_db)):
    dept = db.query(models.Dept).all()
    return dept

# Get Dept and Emp report using Join


@router.get("/reports", response_model=List[schemas.DeptEmpReport])
def get_report(db: Session = Depends(get_db)):
    deptEmpReport = db.query(models.Dept).join(models.Employee,
                                               models.Dept.id == models.Employee.deptID, isouter=True)
    return deptEmpReport.all()


# Create a dept


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.DeptResponse)
def create_dept(dept: schemas.DeptCreate, db: Session = Depends(get_db)):
    new_dept = models.Dept(**dept.model_dump())
    db.add(new_dept)
    db.commit()
    db.refresh(new_dept)

    return new_dept

# Get a dept with a specific ID


@router.get("/{id}", response_model=schemas.DeptResponse)
def get_dept(id: int, db: Session = Depends(get_db)):
    dept = db.query(models.Dept).filter(models.Dept.id == id).first()
    if not dept:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Department with id: {id} was not found")

    return dept


# Delete a department with specific ID
@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_dept(id: int, db: Session = Depends(get_db)):
    dept_query = db.query(models.Dept).filter(models.Dept.id == id)

    dept = dept_query.first()

    if dept == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Department with id: {id} does not exist")

    dept_query.delete(synchronize_session=False)
    db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)

# Update a dept with specific ID


@router.put("/{id}", response_model=schemas.DeptResponse)
def update_dept(id: int, updated_dept: schemas.DeptCreate, db: Session = Depends(get_db)):
    dept_query = db.query(models.Dept).filter(models.Dept.id == id)

    dept = dept_query.first()

    if dept == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Department with id: {id} does not exist")

    dept_query.update(updated_dept.model_dump(), synchronize_session=False)

    db.commit()

    return dept_query.first()
