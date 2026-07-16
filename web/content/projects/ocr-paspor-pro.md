---
title: OCR Paspor Pro
kicker: Featured Document OCR Tool
subtitle: v4.0 · Passport MRZ OCR untuk Manifest Umrah
tags: [Vue 3, Express, Tesseract.js, Gemini AI, OpenRouter, ICAO 9303]
image:
  src: /images/projects/ocr-paspor-pro/ocr.png
  alt: Scanner OCR Paspor Pro — upload dan review manifest paspor
gallery:
  - src: /images/projects/ocr-paspor-pro/ocr.png
    alt: Scanner — upload paspor, pilih engine OCR, dan review manifest dengan peringatan validasi
  - src: /images/projects/ocr-paspor-pro/db.png
    alt: Database Manifest Umrah — daftar paspor tersimpan dengan ekspor CSV/JSON
  - src: /images/projects/ocr-paspor-pro/setting.png
    alt: Dashboard Pengaturan Enterprise — API keys dan fallback routing engine
home:
  order: 11
  title: OCR Paspor Pro
  summary: Passport MRZ scanner with multi-engine OCR for Umrah travel manifests
  description: "Sistem manifest paspor jamaah Umrah dengan mesin auto-repair checksum ICAO 9303 — mendeteksi MRZ otomatis, memvalidasi masa berlaku paspor, dan menyimpan hasilnya ke database."
  tags: [Vue 3, Express, Tesseract.js, Gemini AI]
  image: /images/projects/ocr-paspor-pro/ocr.png
listing:
  period: 2026 · Express + Vue 3
  type: Document OCR
  icon: camera
  gradient: from-violet-500 to-fuchsia-600
  description: "Sistem manifest paspor Umrah dengan mesin auto-repair checksum ICAO 9303, validasi masa berlaku, dan 3 pilihan engine OCR."
  tags: [Vue 3, Express, Tesseract.js]
---

## Project overview

OCR Paspor Pro adalah tool untuk mempercepat pembuatan manifest paspor jamaah Umrah — dari upload dokumen paspor sampai data tersimpan di database, lengkap dengan validasi dan auto-repair checksum sesuai standar ICAO 9303 (format MRZ paspor internasional).

- Upload dokumen paspor lewat drag & drop, mendukung JPEG, PNG, atau WebP (maks. 10MB).
- Preprocessing editor yang mengisolasi baris MRZ secara otomatis sebelum di-OCR.
- Mesin auto-repair checksum ICAO 9303 untuk memperbaiki karakter MRZ yang salah baca.
- **Validasi otomatis masa berlaku paspor** — sistem langsung memberi peringatan kalau paspor sudah kadaluarsa (mis. "Paspor telah KADALUARSA! Jemaah tidak bisa diberangkatkan."), sebelum data sempat tersimpan salah.
- Form review manifest (nomor paspor, kewarganegaraan, nama lengkap, jenis kelamin, tanggal lahir, tanggal terbit, masa berlaku, kantor penerbit) untuk validasi manual sebelum disimpan.
- Raw MRZ (Machine Readable Zone) hasil deteksi ditampilkan apa adanya untuk pengecekan silang.

## Database Manifest Umrah

Setiap paspor yang berhasil dipindai tersimpan ke database lokal dan bisa dipantau dari satu halaman:

- Ringkasan jumlah total manifest serta breakdown jemaah laki-laki/perempuan.
- Tabel pencarian berdasarkan nama atau nomor paspor, dengan kolom masa berlaku yang otomatis ditandai merah kalau sudah/mendekati kadaluarsa.
- Ekspor data ke CSV atau JSON kapan saja.

## Multi-engine OCR

Pengguna bisa memilih engine OCR sesuai kebutuhan biaya dan akurasi:

- **Tesseract** — jalan offline di browser, gratis sepenuhnya, jadi default aplikasi.
- **Gemini AI** — engine cloud untuk akurasi lebih tinggi, butuh API key sendiri.
- **OpenRouter** — dipakai sebagai fallback cloud otomatis kalau Gemini gagal atau kena rate-limit, supaya proses scan tetap jalan tanpa terhenti.

Semua API key (Google Gemini, OpenRouter) dikelola dari Dashboard Pengaturan Enterprise, termasuk pengaturan model & parameter LLM serta kamus perbaikan karakter OCR.

## Tech stack

- Vue 3 (frontend)
- Express (backend & server-side processing)
- Tesseract.js untuk OCR offline di sisi client
- Integrasi Gemini AI dan OpenRouter sebagai engine cloud dengan fallback routing

**Brand:** Qalbu Travel Tech
