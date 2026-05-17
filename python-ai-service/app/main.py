from fastapi import FastAPI
from app.routes.pdf import router as pdf_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(pdf_router)

@app.get("/")
def home():
    return {
        "message": "Python AI Service Running"
    }