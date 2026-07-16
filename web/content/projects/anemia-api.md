---
title: Anemia Detection API
kicker: Backend & Cloud Project
subtitle: 2024 Cloud Computing / Backend REST API
tags: [Node.js, REST API, GCP / Bangkit, MySQL, Docker]
image:
  src: /images/projects/anemia-api/Branding 2.png
  alt: Anemia Detection API illustration
github: https://github.com/Anemi-ai
links:
  - label: "Organization GitHub: Anemi-ai"
    url: https://github.com/Anemi-ai
  - label: "Backend / ML REST API repository: ML-REST-API"
    url: https://github.com/Anemi-ai/ML-REST-API
  - label: "General backend REST API repository: General-RestFull-API"
    url: https://github.com/Anemi-ai/General-RestFull-API
home:
  order: 3
  title: Anem.ai Detection API
  summary: AI-based Anemia Detection App — Bangkit 2024 Capstone
  description: Express-based RESTful API yang memproses data pemeriksaan konjungtiva mata untuk mengklasifikasikan risiko anemia pasien — dirancang sebagai backend yang siap diintegrasikan ke aplikasi mobile atau web.
  tags: [Express.js, REST API, MySQL, GCP, Cloud Run, Docker]
  image: /images/projects/anemia-api/Screenshots Application anem.ai.png
listing:
  period: 2024 · Backend
  type: AI / API
  icon: activity
  gradient: from-blue-600 to-cyan-500
  description: REST API untuk layanan ML deteksi anemia berbasis citra konjungtiva mata, siap diintegrasi aplikasi mobile.
  tags: [Node.js, REST API, GCP]
---

## Project overview

Anemia Detection adalah aplikasi berbasis AI yang memanfaatkan analisis citra konjungtiva mata untuk mengestimasi risiko anemia. Di project ini saya berfokus di sisi backend dan cloud, dengan menyiapkan REST API yang stabil, terdokumentasi, dan siap diintegrasikan oleh tim Mobile dan Machine Learning.

- AI-based anemia detection menggunakan data hasil analisis citra mata.
- REST API sebagai jembatan antara aplikasi mobile dan model ML.
- Dirancang untuk mendukung awareness kesehatan dan deteksi dini.

**Role:** Cloud Computing Engineer / Backend Developer.

**Team:**
- Cloud Computing (Backend & Cloud infrastructure).
- Machine Learning (Image classification model).
- Android (Mobile app in Kotlin).

## Your role

Sebagai Cloud Computing Engineer, saya bertanggung jawab untuk memastikan backend dapat diakses dengan aman, konsisten, dan mudah digunakan oleh tim lain.

- Merancang dan mengimplementasikan RESTful API untuk inference ML.
- Mengintegrasikan aplikasi mobile dengan layanan ML melalui endpoint backend.
- Mengelola layanan backend menggunakan Node.js dan lingkungan cloud.
- Menangani deployment dan konfigurasi infrastruktur cloud (GCP/Bangkit).
- Berkoordinasi dengan tim Machine Learning dan Android terkait kebutuhan API.

## Tech stack

**Backend & Cloud**
- Node.js untuk RESTful API backend.
- Desain REST API untuk integrasi dengan model ML.
- Deployment di lingkungan cloud (GCP / Bangkit).
- Database relasional (MySQL) untuk penyimpanan data.
- Postman untuk dokumentasi dan pengujian endpoint.

**Other teams**
- Machine Learning: image classification model untuk deteksi anemia.
- Android: aplikasi mobile berbasis Kotlin sebagai client utama.

## System architecture

Secara garis besar, alurnya adalah: aplikasi mobile mengirim data hasil pemrosesan citra ke REST API, backend meneruskan data ke layanan ML untuk inference, lalu hasil prediksi dikembalikan ke aplikasi dan dapat disimpan untuk kebutuhan analisis lebih lanjut.

- Mobile App → Backend API → ML Service (inference).
- Backend mengelola validasi request, autentikasi (jika diperlukan), dan formatting respons.
- Hasil prediksi dikembalikan ke client dan dapat dicatat di database.

## Links

- Organization GitHub: [Anemi-ai](https://github.com/Anemi-ai)
- Backend / ML REST API repository: [ML-REST-API](https://github.com/Anemi-ai/ML-REST-API)
- General backend REST API repository: [General-RestFull-API](https://github.com/Anemi-ai/General-RestFull-API)
