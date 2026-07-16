---
title: AI Express (PDF RAG)
kicker: Selected AI RAG Project
subtitle: 2026 · Node.js & Local LLM (Ollama)
tags: [Node.js, Express, Ollama, Multer, Vector Store, JavaScript]
image:
  src: /images/projects/ai-express-ollama-rag-pdf/rag.png
  alt: AI Express PDF RAG UI
gallery:
  - src: /images/projects/ai-express-ollama-rag-pdf/rag.png
    alt: AI Express PDF RAG Chatbot UI
  - src: /images/projects/ai-express-ollama-rag-pdf/ai.png
    alt: AI Express General AI Chat UI
github: https://github.com/DevCupu/ai-express-ollama-rag-pdf
home:
  order: 2
  title: AI Express (PDF RAG)
  summary: Document ingestion and Retrieval-Augmented Generation using local LLMs
  description: "Aplikasi RAG (Retrieval-Augmented Generation) berbasis Node.js/Express dan Ollama untuk mengunggah PDF, memproses chunk, menghasilkan embedding, dan melakukan tanya jawab secara lokal."
  tags: [Node.js, Express, Ollama, Vector Search]
  image: /images/projects/ai-express-ollama-rag-pdf/rag.png
listing:
  period: 2026 · AI / API
  type: RAG System
  icon: cpu
  gradient: from-indigo-500 to-violet-600
  description: "Sistem RAG lokal tanpa framework eksternal: upload PDF, chunking, generate local embeddings, semantic search, dan context generation."
  tags: [Node.js, Express, Ollama]
---

## Project Overview

**AI Express (PDF RAG)** adalah proyek yang mengimplementasikan dua kemampuan utama:

1. **Document Ingestion**
   - Upload PDF.
   - Extract text dari dokumen PDF.
   - Split text menjadi beberapa chunk kecil.
   - Generate embeddings untuk setiap chunk.
   - Simpan vector embedding ke local storage.

2. **Query (RAG)**
   - Menerima pertanyaan dari user.
   - Mencari chunk yang paling relevan dari vector store menggunakan perhitungan kesamaan semantik.
   - Mengirimkan konteks dokumen + pertanyaan user ke LLM lokal (Ollama).
   - Mengembalikan jawaban hasil sintesis.

*Catatan: Proyek ini sengaja dibuat secara **manual** (tanpa menggunakan library tingkat tinggi seperti LangChain) agar konsep RAG dapat dipahami secara mendalam dari fondasinya.*

## 🚀 Cara Menjalankan

### Prasyarat
- Node.js terinstal pada perangkat Anda.
- Aplikasi Ollama berjalan dan dapat diakses melalui `OLLAMA_URL`.
- Model chat tersedia (contoh: `gpt-oss:20b-cloud`).
- Model embeddings tersedia (default: `nomic-embed-text`).

> Untuk memeriksa model yang terinstal di komputer Anda, jalankan perintah: `ollama list`

### Instalasi
```bash
npm install
```

### Konfigurasi Environment
Edit file `.env` di root direktori proyek Anda:
- `OLLAMA_URL` contoh: `http://localhost:11434`
- `OLLAMA_MODEL` model untuk generate jawaban
- `OLLAMA_EMBED_MODEL` model untuk embeddings

### Menjalankan Server
```bash
npm run dev
```
Akses UI di browser pada alamat:
`http://localhost:3000`

## 🛠️ Tech Stack

- **Node.js + Express**: Server backend API sekaligus menyajikan halaman frontend statis.
- **Ollama**: Mesin LLM lokal untuk menghasilkan respon jawaban dan vector embeddings.
- **multer**: Middleware untuk menangani upload file PDF (`multipart/form-data`).
- **pdf-parse**: Pustaka untuk mengekstrak teks dari file PDF yang memiliki text layer.
- **Vector store manual (JSONL)**: Penyimpanan database vector sederhana berbasis file berformat JSON Lines di `data/vectors.jsonl`.
- **Frontend**: Menggunakan HTML, Tailwind CSS (via CDN), dan Vanilla JavaScript.

## 📋 Endpoint API

### 1. Health/UI
- `GET /` -> Serve halaman frontend dari direktori `public`.
- Frontend chat di browser menggunakan endpoint `POST /query`.

### 2. Ingest PDF
- `POST /ingest`
- Content-Type: `multipart/form-data`
- Field berkas: `file`

Contoh penggunaan curl:
```bash
curl -F "file=@dokumen.pdf" http://localhost:3000/ingest
```

Response format:
- `docId`: ID dokumen yang di-ingest
- `totalChunks`: Jumlah chunk yang berhasil dibuat
- `storedVectors`: Jumlah data embedding yang disimpan

### 3. Query RAG
- `POST /query`
- Content-Type: `application/json`

*Catatan:*
- Jika `docId` **diisi**, query akan diproses menggunakan RAG (jawaban berbasis dokumen tersebut dengan melampirkan sumber).
- Jika `docId` **tidak diisi**, endpoint akan merespon seperti chat LLM biasa tanpa konteks dokumen.

Request Body:
```json
{
  "question": "Apa isi dokumen ini?",
  "topK": 5,
  "docId": "(optional)"
}
```

Contoh penggunaan curl:
```bash
curl -H "Content-Type: application/json" \
  -d '{"question":"ringkas poin pentingnya","topK":5}' \
  http://localhost:3000/query
```

Response format:
- `answer`: Jawaban tergenerasi dari LLM
- `contexts`: Daftar sumber chunk yang digunakan (`source`, `chunkIndex`, dan similarity `score`)

## 📂 Struktur Folder

- `server.js` : Entrypoint aplikasi.
- `src/app.js` : Setup konfigurasi Express, pendaftaran routing, dan global error handler.
- `src/routes/aiRoutes.js` : Definisi route API (`/ask`, `/ingest`, `/query`).
- `src/controllers/` : Handler logic request/response API.
- `src/services/` : Service logic yang reusable:
  - `pdfExtractor.js` : Ekstraksi teks dari berkas PDF.
  - `textChunker.js` : Memotong teks panjang menjadi chunk kecil.
  - `vectorStore.js` : Menyimpan dan mencari kemiripan embedding vektor pada file JSONL.
  - `ragPrompt.js` : Menyusun prompt template RAG.
- `data/vectors.jsonl` : File penyimpanan database vektor local (diabaikan oleh git).

## 📐 Arsitektur Sistem

Secara garis besar, aplikasi ini memiliki interaksi antara **Browser UI**, **Server Express**, **Ollama AI Engine**, dan **Vector Store (JSONL)**.

### Alur Ingest (Upload PDF → Knowledge Base)
1. Pengguna mengunggah PDF ke endpoint `/ingest`.
2. Server mengekstrak teks dari PDF menggunakan `pdf-parse`.
3. Teks dibagi menjadi potongan-potongan (*chunks*) menggunakan `textChunker`.
4. Setiap chunk dikirim ke Ollama untuk menghasilkan representasi vektor (embeddings).
5. Pasangan teks chunk dan embedding vektor disimpan ke dalam file `data/vectors.jsonl`.

### Alur Query (Chat Biasa vs RAG Dokumen)
- **Chat Biasa (tanpa `docId`):** Server langsung meneruskan query ke Ollama `/api/generate` untuk mendapatkan jawaban umum.
- **RAG Dokumen (dengan `docId`):**
  1. Melakukan embedding pada pertanyaan pengguna menggunakan Ollama.
  2. Melakukan pencarian semantic (*cosine similarity*) terhadap vector store untuk mendapatkan `topK` chunk terdekat.
  3. Menyusun prompt gabungan yang berisi potongan teks dokumen (konteks) dan pertanyaan pengguna.
  4. Mengirimkan prompt gabungan tersebut ke Ollama untuk disintesis menjadi jawaban berbasis dokumen beserta sumber kutipan.

## ⚙️ Catatan Penting & Parameter Tuning

### Tuning Parameter RAG
Kualitas pencarian dan respon dapat ditala melalui file `.env`:
- `TOP_K` (default 5): Jumlah kandidat chunk yang diambil.
- `MIN_SCORE` (default 0.18): Batas skor kemiripan terendah untuk memfilter konteks yang kurang relevan.
- `CHUNK_SIZE` (default 1200) / `CHUNK_OVERLAP` (default 200): Mempengaruhi presisi dan kapasitas konteks.
- `MAX_CONTEXT_CHARS` (default 9000): Batas maksimum panjang karakter seluruh konteks yang dimasukkan ke prompt.
- `MAX_CHUNK_CHARS_IN_PROMPT` (default 1500): Batas maksimum karakter per chunk di dalam prompt.
- `MAX_CONTEXT_CHUNKS` (default 10): Batas maksimum jumlah chunk yang dapat disematkan ke dalam prompt.

*Catatan Batasan*:
- PDF hasil scan gambar (tidak memiliki text layer) akan menghasilkan teks kosong pada `pdf-parse`. Penanganan berkas jenis ini memerlukan integrasi tambahan dengan modul OCR (seperti Tesseract).
- Penyimpanan database vector menggunakan file JSONL sangat baik untuk keperluan demo/MVP. Namun, untuk skala data yang lebih besar, sangat disarankan menggunakan vector database khusus (misalnya Qdrant, Chroma, atau pgvector).

## 💡 Pembelajaran & Pengembangan Selanjutnya

### Apa yang Dipelajari dari Project ini:
- **Pair Programming Bareng AI Agent**: Belajar berkolaborasi dalam menulis kode, debugging, dan menyusun arsitektur UX dengan tetap melakukan verifikasi hasil runtime secara mandiri.
- **ES Modules di Node.js**: Memahami konfigurasi `"type": "module"`, sintaks import/export modern, dan interoperabilitas dengan CommonJS.
- **Desain API Express**: Menerapkan struktur folder Controller-Service yang bersih dan penanganan error global.
- **Upload File**: Mengimplementasikan `multer` dengan memori penyimpanan sementara serta penanganan validasi berkas.
- **Pemrosesan Teks & Embeddings**: Memahami perbedaan PDF text-based vs scan, proses segmentasi teks (*chunking*), dan visualisasi teks dalam bentuk representasi numerik multidimensi (vektor).
- **Vector Search & RAG**: Memahami konsep Cosine Similarity untuk perangkingan teks, penyusunan prompt konteks, dan perancangan UI/UX transisi mode chat biasa vs chat dokumen.

### Rencana Pengembangan Selanjutnya:
1. **Kualitas Jawaban RAG**:
   - Integrasi OCR (Tesseract) untuk mendukung dokumen PDF berupa scan gambar.
   - Perekaman metadata tambahan seperti nomor halaman (`pageNumber`) agar penunjukan sumber lebih detail.
   - Menampilkan sitasi detail di sisi Frontend UI agar pengguna dapat membaca potongan teks asli.
   - Menerapkan mekanisme reranking pasca retrieval untuk meningkatkan relevansi konteks.
2. **Skalabilitas Data**:
   - Migrasi penyimpanan dari file JSONL ke vector database mandiri (Qdrant untuk skalabilitas, pgvector jika disatukan ke DB utama, atau Chroma untuk kemudahan lokal).
   - Menambahkan mekanisme enkripsi hash file untuk mencegah duplikasi data dokumen.
   - Endpoint pengelolaan dokumen (list & delete dokumen).
3. **Keamanan & Stabilitas**:
   - Penerapan Rate Limiting dan otentikasi dasar (Basic Auth) untuk mencegah penyalahgunaan API.
   - Validasi input yang lebih ketat pada payload query dan file upload.
   - Observability: Implementasi logging request ID dan pelacakan metrik waktu (time-to-first-byte, embed-time, query-time).
