---
title: Raudhah Barcode Manager
kicker: Selected Project
subtitle: 2026 · React & Supabase with Gemini AI
tags: [React, TypeScript, Supabase, Gemini API, Tailwind CSS]
image:
  src: /images/projects/raudhah-manager/raudah.png
  alt: Raudhah Barcode Manager Dashboard
gallery:
  - src: /images/projects/raudhah-manager/raudah.png
    alt: Raudhah Barcode Manager Main Page
  - src: /images/projects/raudhah-manager/settigs.png
    alt: Raudhah Barcode Manager Settings Page
  - src: /images/projects/raudhah-manager/dashboard.png
    alt: Raudhah Barcode Manager Operational Dashboard
github: https://github.com/DevCupu/raudhah-manager
home:
  order: 1
  title: Raudhah Barcode Manager
  summary: Digital Nusuk Manifesting & QR Code distributor for pilgrims
  description: "Aplikasi dashboard operasional modern untuk mengelola antrean dan pengambilan QR Code Raudhah bagi jemaah umrah/haji dengan integrasi Gemini AI untuk ekstraksi visa secara otomatis."
  tags: [React 19, Supabase, Gemini API, TypeScript]
  image: /images/projects/raudhah-manager/raudah.png
listing:
  period: 2026 · React
  type: Fullstack & AI
  icon: layers
  gradient: from-emerald-500 to-teal-600
  description: "Dashboard manajemen antrean, pembagian tugas operator (war slot Nusuk), dan ekstraksi dokumen visa otomatis berbasis AI."
  tags: [React, Supabase, Gemini API]
---

## Project Overview

**Raudhah Barcode Manager** adalah dashboard operasional modern untuk mengelola antrean dan pengambilan QR Code Raudhah bagi jemaah umrah/haji. Aplikasi ini didesain khusus untuk membantu tim travel/agensi dalam mendistribusikan beban tugas kepada para operator pemburu slot (*war*), memantau status secara real-time, serta mempercepat input data jemaah secara otomatis menggunakan AI.

## 🚀 Fitur Utama

### 1. ⚡ Ekstraksi Visa AI (Google Gemini)
- Mendukung pemindaian berkas visa secara massal (*batch scanning*) baik berupa berkas PDF teks digital, PDF gambar/scan, maupun berkas gambar biasa (JPG/PNG).
- Menggunakan Google Gemini API untuk mengekstrak informasi penting secara otomatis (Nama, Nomor Paspor, Nomor Visa, Travel/Rombongan, Jenis Kelamin) guna meminimalisir kesalahan ketik (*typo*).
- Dilengkapi sistem penanganan batas kuota (*rate limiting auto-detect*) dan pemulihan cerdas saat pemrosesan batch.

### 2. 👥 Manajemen Operator & Pembagian Kerja
- Memungkinkan pembagian jemaah kepada operator tertentu untuk melakukan *war* slot Raudhah.
- Operator memiliki kredensial login sendiri untuk mengakses antrean jemaah yang didelegasikan kepada mereka.
- Kemudahan mengunduh daftar jemaah dalam format file untuk mempermudah eksekusi pendaftaran Nusuk.

### 3. 📊 Dashboard Real-time & Statistik
- Informasi visual yang menampilkan statistik jemaah: total jemaah, status QR Code (Ready, Sedang War, QR Berhasil, QR Terdistribusi, Belum Berhasil, Visa Tidak Tersedia), serta status prioritas.
- Log aktivitas sistem untuk merekam riwayat tindakan operator/admin secara terperinci.

### 4. ⏰ Sistem Prioritas Keberangkatan (Entry/Exit Madinah)
- Menghitung prioritas jemaah secara otomatis (`Tinggi`, `Sedang`, `Rendah`, `Belum Ada`) berdasarkan sisa hari mereka berada di Madinah sebelum jadwal keluar (*exit Madinah*).

### 5. 📋 Kolom Kustom Dinamis (Custom Fields)
- Fleksibilitas tinggi untuk menambahkan kolom tambahan sesuai kebutuhan agensi travel (misal: No Bus, Hotel, Nama Mutawwif, dll.) yang tersinkronisasi otomatis di seluruh data jemaah.

### 6. 📥 Impor & Ekspor Data
- Mendukung impor jemaah secara massal via file Excel (`.xlsx`).
- Fitur ekspor data jemaah dan operator ke Excel untuk laporan berkala atau pencadangan.

### 7. ⚙️ Skala UI & Tema Adaptif
- UI Scale yang dapat disesuaikan (0.8x hingga 1.2x) untuk kenyamanan bekerja di layar perangkat yang berbeda.
- Tema gelap (Dark Mode) dan terang (Light Mode) premium dengan basis warna Zinc.

## 🛠️ Arsitektur & Teknologi

- **Frontend**: React 19, TypeScript, Vite (bundler), Tailwind CSS (styling), Motion (animasi), Lucide Icons.
- **Database & Integrasi**: Supabase (Real-time DB client).
- **AI Engine**: Google Gemini API (model `gemini-2.0-flash` / `gemini-2.5` / `gemini-3.5-pro`).
- **Libraries**: `pdfjs-dist` (ekstraksi teks PDF client-side), `xlsx` (SheetJS untuk file Excel).

## 📦 Persyaratan Sistem

Sebelum memulai, pastikan perangkat Anda telah terinstal:
- Node.js (Versi 18 ke atas)
- npm atau yarn
- Akun Supabase (untuk sinkronisasi database)
- Google Gemini API Key (dapat diperoleh gratis/berbayar melalui Google AI Studio)

## 💾 Konfigurasi Database Supabase

Untuk menjalankan aplikasi secara terpusat dengan Supabase, buat tabel-tabel berikut melalui SQL Editor pada Dashboard Supabase Anda:

```sql
-- 1. Tabel settings (Menyimpan konfigurasi umum aplikasi)
CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
);

-- 2. Tabel operators (Data akun operator pemburu slot)
CREATE TABLE IF NOT EXISTS operators (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT DEFAULT '-',
    password TEXT DEFAULT '123456',
    is_active BOOLEAN DEFAULT TRUE
);

-- 3. Tabel custom_fields (Kolom dinamis jemaah)
CREATE TABLE IF NOT EXISTS custom_fields (
    id TEXT PRIMARY KEY,
    label TEXT NOT NULL
);

-- 4. Tabel jamaahs (Data jemaah dan status Raudhah)
CREATE TABLE IF NOT EXISTS jamaahs (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    passport TEXT NOT NULL,
    visa TEXT NOT NULL,
    gender TEXT CHECK (gender IN ('Laki-laki', 'Perempuan', '')),
    phone TEXT DEFAULT '-',
    entry_madinah TEXT, -- Format YYYY-MM-DD
    exit_madinah TEXT,  -- Format YYYY-MM-DD
    operator_id TEXT REFERENCES operators(id) ON DELETE SET NULL,
    status TEXT DEFAULT 'Ready',
    notes TEXT DEFAULT '',
    qr_code_url TEXT, -- Base64 / URL screenshot QR Nusuk
    qr_uploaded_at TEXT, -- Tanggal unggah QR
    created_at TEXT NOT NULL,
    travel TEXT DEFAULT '',
    email TEXT DEFAULT '',
    password TEXT DEFAULT '',
    raudhah_slot TEXT, -- Format YYYY-MM-DDTHH:MM
    custom_values JSONB DEFAULT '{}'::jsonb
);

-- (Opsional) Mengaktifkan fitur Realtime pada tabel jamaahs & operators
ALTER PUBLICATION supabase_realtime ADD TABLE jamaahs;
ALTER PUBLICATION supabase_realtime ADD TABLE operators;
```

## ⚙️ Konfigurasi Environment

Buat berkas bernama `.env` di direktori utama (*root*) proyek, lalu salin baris berikut dan sesuaikan dengan kredensial proyek Supabase Anda:

```env
# Client-side Vite environment variables
VITE_SUPABASE_URL=https://nama-proyek-anda.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

*Catatan: Google Gemini API Key dikonfigurasi langsung di dalam aplikasi melalui menu **Settings (Pengaturan) -> Kredensial & API**, sehingga tidak perlu ditulis di berkas `.env` (disimpan aman di LocalStorage browser masing-masing pengguna).*

## 🚀 Cara Menjalankan Aplikasi

1. **Unduh Proyek & Buka Terminal**: Pastikan Anda berada di direktori proyek `raudhah-manager`.
2. **Instal Dependensi**:
   ```bash
   npm install
   ```
3. **Jalankan dalam Mode Pengembangan (Local Development)**:
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan pada alamat `http://localhost:3000`.
4. **Bangun Aplikasi untuk Produksi**:
   ```bash
   npm run build
   ```
   Hasil build akan berada pada folder `dist` dan siap dideploy ke platform hosting seperti Vercel, Netlify, atau Cloudflare Pages.

## 📖 Panduan Penggunaan Utama

### A. Pengaturan Pertama Kali (Setup Awal)
1. Buka aplikasi di browser.
2. Navigasikan ke tab **Pengaturan** (ikon gerigi).
3. Di sub-tab **Kredensial & API**:
   - Masukkan **Gemini API Key** Anda dari Google AI Studio.
   - Klik **Test Koneksi Gemini** untuk memverifikasi kecocokan kunci.
   - Jika Anda tidak menggunakan `.env`, Anda juga dapat memasukkan konfigurasi **Supabase URL** dan **Anon Key** secara langsung di sub-tab database.
4. Anda dapat mengatur nama default travel serta kata sandi default untuk jemaah di sub-tab **Umum**.

### B. Memulai Scan Visa AI secara Massal
1. Masuk ke tab **Jemaah**.
2. Klik tombol **Batch Scan Visa**.
3. Tarik dan lepas (*Drag & Drop*) file visa PDF atau gambar ke area yang disediakan.
4. Klik **Mulai Ekstraksi**.
5. Sistem akan membaca file satu per satu. Jika file berupa PDF teks digital, sistem akan mengekstrak teksnya dan mengirimkannya ke Gemini (hemat kuota). Jika file berupa scan/gambar, sistem akan mengirimkan gambar tersebut langsung untuk dianalisis secara visual.
6. Periksa pratinjau hasil ekstraksi, perbaiki jika ada kolom yang kurang pas, lalu klik **Simpan ke Database**.

### C. Alur Kerja War Raudhah (Operator)
1. Daftarkan operator di tab **Pengaturan -> Operator**. Berikan akses nomor telepon dan kata sandi untuk mereka.
2. Di tab **Jemaah**, pilih jemaah dan tunjuk operator yang bertanggung jawab melalui kolom **Operator** di tabel.
3. Operator dapat masuk (*login*) ke sistem menggunakan nomor telepon dan kata sandi mereka.
4. Di dasbor operator, mereka hanya akan melihat daftar jemaah yang didelegasikan ke mereka.
5. Setelah operator berhasil melakukan *war* slot di aplikasi Nusuk, mereka dapat langsung mengubah status jemaah menjadi **QR Berhasil** dan mengunggah tangkapan layar (*screenshot*) QR Code jemaah tersebut.
6. Admin utama dapat langsung melihat pembaruan status dan mengunduh berkas QR Code tersebut di dasbor pusat secara real-time.

## Links

- GitHub Repository: [raudhah-manager](https://github.com/DevCupu/raudhah-manager)
