---
title: Luma Docs
kicker: Selected AI RAG Project
subtitle: 2026 · Node.js & Local LLM (Ollama)
tags: [Node.js, Express, Ollama, Multer, Vector Store, JavaScript]
image:
  src: /images/ai.png
  alt: AI Express RAG Engine
gallery:
  - src: /images/ai.png
    alt: AI Express RAG Engine cover
  - src: /images/projects/ai-express-ollama-rag-pdf/rag.png
    alt: Luma Docs PDF RAG Chatbot UI
  - src: /images/projects/ai-express-ollama-rag-pdf/ai.png
    alt: Luma Docs General AI Chat UI
github: https://github.com/DevCupu/ai-express-ollama-rag-pdf
home:
  order: 2
  title: Luma Docs
  summary: Document ingestion and Retrieval-Augmented Generation using local LLMs
  description: "Asisten RAG untuk mengunggah PDF, mencari konteks yang relevan, dan menjawab pertanyaan dengan AI lokal."
  tags: [Node.js, Express, Ollama, Vector Search]
  image: /images/ai.png
listing:
  period: 2026 · AI / API
  type: RAG System
  icon: cpu
  gradient: from-indigo-500 to-violet-600
  description: "Asisten AI lokal untuk mencari dan memahami isi dokumen PDF."
  tags: [Node.js, Express, Ollama]
---

Luma Docs is a local AI document assistant that turns uploaded PDFs into a searchable knowledge base. It combines semantic search with Retrieval-Augmented Generation (RAG) so users can ask questions and receive answers grounded in the selected document.

## Technologies Used

- **Node.js and Express:** Backend API handling uploads, document processing, and AI requests.
- **Ollama:** Local chat and embedding models for private document processing.
- **PDF parsing:** Extracting text from uploaded PDF files before indexing.
- **Vector store:** JSONL-based storage for document chunks and embeddings.
- **Vanilla JavaScript and Tailwind CSS:** Lightweight chat interface for document interaction.

## Outcome

The project delivers a working local RAG workflow: upload a PDF, index its content, search for relevant context, and generate an answer based on the source document. It also supports both general chat and document-focused chat.

## Challenges and Learnings

The main challenge was implementing the RAG pipeline without relying on a high-level framework. Building the chunking, embedding, similarity search, and context prompt manually strengthened my understanding of how document retrieval and grounded AI responses work end to end.

## Stack

Node.js · Express · Ollama · JavaScript · Tailwind CSS · pdf-parse · JSONL Vector Store

## Links

- GitHub Repository: [ai-express-ollama-rag-pdf](https://github.com/DevCupu/ai-express-ollama-rag-pdf)
