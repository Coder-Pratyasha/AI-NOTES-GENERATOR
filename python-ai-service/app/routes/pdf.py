from fastapi import APIRouter

from app.services.pdf_reader import extract_text_from_pdf
from app.services.chunker import chunk_text

from app.utils.embeddings import generate_embedding
from app.db.chroma import collection
from app.utils.generator import generate_answer

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
@router.get("/search")
def search_notes(query: str):

    query_embedding = generate_embedding(query)

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=3
    )

    return {
        "query": query,
        "results": results["documents"]
    }

@router.get("/ask")
def ask_notes(query: str):

    query_embedding = generate_embedding(query)

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=3,
        include=["documents", "distances"]
    )

    documents = results["documents"][0]
    distances = results["distances"][0]

    if distances[0] > 0.5:
        return {
            "query": query,
            "answer": "No relevant information found in the uploaded PDF."
        }

    context = "\n".join(documents)

    answer = generate_answer(context, query)

    return {
        "query": query,
        "answer": answer,
        "retrieved_chunks": documents,
        "distance": distances[0]
    }