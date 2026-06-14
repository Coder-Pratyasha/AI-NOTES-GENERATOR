# AI Notes Generator

An AI-powered study assistant that transforms PDF notes into intelligent, searchable, and exam-focused learning material using Retrieval-Augmented Generation (RAG).

## 🚀 Live Demo

🌐 https://ai-notes-generator-n3lr.vercel.app/

---

## Features

- 📄 Upload PDF notes and study materials
- 🤖 Ask AI questions directly from uploaded documents
- 🔍 Retrieval-Augmented Generation (RAG) for document-specific answers
- 💬 ChatGPT-style conversational interface
- 📝 **Short Notes Mode** for generating concise topic-wise notes
- 📌 **2-Mark Answer Mode** for concise exam-oriented answers
- 📚 **5-Mark Answer Mode** for detailed and structured explanations
- 🎯 **Revision Mode** for quick topic summaries and last-minute preparation
- 🤖 **Ask AI Mode** for interactive question-answering based on uploaded notes
- 🗂️ Persistent chat history with MongoDB
- 🔐 Secure authentication using Clerk
- ⚡ FastAPI backend for AI processing
- ✂️ Automatic PDF text extraction and chunking
- 📚 Context-aware answers generated from uploaded documents
- 🎨 Modern glassmorphism UI built with Tailwind CSS
- 📱 Fully responsive design

---

## Tech Stack

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- ShadCN UI
- Clerk Authentication

### Backend

- FastAPI
- Python

### AI & RAG

- LangChain
- Google Gemini API
- RecursiveCharacterTextSplitter
- ChromaDB Vector Store

### Database

- MongoDB

---

## Project Architecture

```text
Frontend (Next.js)
│
├── Clerk Authentication
├── PDF Upload Interface
├── Chat Interface
└── Chat History
        │
        ▼
Backend (FastAPI)
│
├── PDF Text Extraction
├── Text Chunking
├── Embedding Generation
├── ChromaDB Storage
└── Gemini RAG Pipeline
        │
        ▼
MongoDB
│
├── Chats
└── Messages
```

---

## Workflow

1. User signs in using Clerk Authentication.
2. User uploads a PDF document.
3. The backend extracts text from the PDF.
4. Text is split into semantic chunks.
5. Chunks are embedded and stored in ChromaDB.
6. User asks questions related to the uploaded document.
7. Relevant chunks are retrieved using vector similarity search.
8. Gemini generates a context-aware response.
9. Conversations are stored in MongoDB for future access.

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/Coder-Pratyasha/AI-NOTES-GENERATOR.git

cd ai-notes-generator
```

### Frontend Setup

Install dependencies:

```bash
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
MONGODB_URI=
NEXT_PUBLIC_API_URL=
```

Run the frontend:

```bash
npm run dev
```

---

### Backend Setup

Navigate to the backend folder:

```bash
cd python-ai-service
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the environment:

**Windows**

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file:

```env
GEMINI_API_KEY=
```

Start the FastAPI server:

```bash
uvicorn app.main:app --reload
```

## Author

**Pratyasha Palit**
