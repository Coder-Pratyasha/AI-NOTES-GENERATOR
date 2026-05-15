from fastapi import APIRouter
from app.services.pdf_reader import extract_text_from_pdf
from app.services.chunker import chunk_text

router = APIRouter()

@router.get("/extract")

def extract_pdf():

    text = extract_text_from_pdf("../uploads/sample.pdf")

    chunks = chunk_text(text)

    return {
        "total_chunks": len(chunks),
        "first_chunk": chunks[0]
    }