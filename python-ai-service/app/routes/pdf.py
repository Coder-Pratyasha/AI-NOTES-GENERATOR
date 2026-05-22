from fastapi import APIRouter, UploadFile, File
from pydantic import BaseModel
import tempfile

from app.services.pdf_reader import extract_text_from_pdf
from app.services.chunker import chunk_text

from app.utils.embeddings import generate_embedding
from app.db.chroma import collection
from app.utils.generator import generate_answer

router = APIRouter()

class AskRequest(BaseModel):
    question: str
    mode: str


@router.post("/extract")
async def extract_pdf(
    file: UploadFile = File(...)
):

    with tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".pdf"
    ) as temp_file:

        content = await file.read()

        temp_file.write(content)

        temp_path = temp_file.name

    text = extract_text_from_pdf(temp_path)

    chunks = chunk_text(text)

    for index, chunk in enumerate(chunks[:3]):

        embedding = generate_embedding(chunk)

        collection.add(
            documents=[chunk],
            embeddings=[embedding],
            ids=[f"{file.filename}_chunk_{index}"]
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

@router.post("/ask")
def ask_notes(data: AskRequest):

    query = data.question
    mode = data.mode
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

    prompt_prefix = ""

    if mode == "Short Notes":
        prompt_prefix = """
        Generate concise study notes with headings,
        bullet points, and important concepts.
        """

    elif mode == "2 Marks":
        prompt_prefix = """
        Answer briefly in exam-oriented
        2-mark format.
        Keep answer concise.
        """

    elif mode == "5 Marks":
        prompt_prefix = """
        Generate a detailed exam-oriented
        5-mark answer with explanation,
        points, and structure.
        """

    elif mode == "Revision":
        prompt_prefix = """
        Generate quick revision notes with
        only key points and formulas.
        """

    else:
        prompt_prefix = """
        Answer the question clearly and helpfully.
        """

    final_query = f"""
    {prompt_prefix}

    Question:
    {query}
    """

    answer = generate_answer(
        context,
        final_query
    )

    return {
        "query": query,
        "answer": answer,
        "retrieved_chunks": documents,
        "distance": distances[0]
    }