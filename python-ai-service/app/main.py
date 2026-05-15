from fastapi import FastAPI
from app.routes.pdf import router as pdf_router

app = FastAPI()

app.include_router(pdf_router)

@app.get("/")
def home():
    return {
        "message": "Python AI Service Running"
    }