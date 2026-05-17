from fastapi import APIRouter

from app.services.pdf_reader import extract_text_from_pdf
from app.services.chunker import chunk_text

from app.utils.embeddings import generate_embedding
from app.db.chroma import collection

router = APIRouter()


@router.get("/extract")
def extract_pdf():

    text = extract_text_from_pdf("../uploads/sample.pdf")

    chunks = chunk_text(text)

    for index, chunk in enumerate(chunks[:3]):

        embedding = generate_embedding(chunk)

        collection.add(
            documents=[chunk],
            embeddings=[embedding],
            ids=[f"chunk_{index}"]
        )

    return {
        "total_chunks": len(chunks),
        "first_chunk": chunks[0],
        "message": "Chunks stored in ChromaDB"
    }
@router.get("/all-data")
def get_all_data():

    data = collection.get()

    return {
        "total_ids": len(data["ids"]),
        "ids": data["ids"],
        "documents": data["documents"][:2]
    }
@router.get("/see-vectors")
def see_vectors():

    data = collection.get(
        include=["documents", "embeddings"]
    )

    embedding = data["embeddings"][0]

    return {
        "first_document": data["documents"][0],
        "first_embedding_sample": list(embedding[:10])
    }