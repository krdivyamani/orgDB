from fastapi import FastAPI

from . import models
from .database import engine
from .routers import department, employees

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


app.include_router(department.router)
app.include_router(employees.router)


@app.get("/")
def root():
    return {"message": "Hello, welcome!"}
