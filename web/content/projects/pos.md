---
title: POS System
kicker: Featured Fullstack Laravel Project
subtitle: 2024 · Backend & Fullstack Laravel
tags: [Laravel, MySQL, Livewire, Tailwind CSS]
image:
  src: /images/projects/pos/pos.png
  alt: POS System screenshot
gallery:
  - src: /images/projects/pos/pos.png
    alt: Landing page POS Kafe
  - src: /images/projects/pos/dashboard-kasir.png
    alt: Dashboard kasir — ringkasan penjualan, meja aktif, dan order aktif
  - src: /images/projects/pos/orders.png
    alt: Order Aktif — daftar transaksi yang belum dibayar
  - src: /images/projects/pos/meja.png
    alt: Manajemen Meja — status ketersediaan meja cafe secara visual
  - src: /images/projects/pos/transaction-pos.png
    alt: Layar transaksi kasir — pilih menu dan proses pembayaran
  - src: /images/projects/pos/history.png
    alt: Riwayat Transaksi — rekap pendapatan dan transaksi yang sudah dibayar
github: https://github.com/DevCupu/laravel-pos-system
home:
  order: 4
  title: POS System
  summary: Point of Sale web app for cafés
  description: "Laravel Web-based Point of Sale untuk manajemen kafe dengan fitur lengkap: manajemen menu, pesanan, meja, pembayaran, dan kontrol akses pengguna."
  tags: [Laravel 12, MySQL, Livewire 3, Tailwind CSS]
  image: /images/projects/pos/pos.png
listing:
  period: 2024 · Laravel
  type: POS
  icon: shopping-bag
  gradient: from-rose-500 to-fuchsia-500
  description: "Point of Sale untuk kafe: kasir, dapur, admin, ringkasan penjualan, manajemen menu, meja, dan metode pembayaran."
  tags: [Laravel, Livewire, MySQL]
---

## Project overview

POS Kafe dirancang sebagai satu aplikasi terpusat untuk kasir, dapur, dan admin. Fokusnya adalah membuat alur transaksi di kafe kecil hingga menengah terasa cepat, minim salah hitung, dan mudah dipantau.

- Kasir memproses pesanan dine-in maupun take-away dengan alur yang jelas.
- Pemilik kafe melihat ringkasan penjualan harian tanpa perlu export manual.
- Dapur menerima pesanan terstruktur lengkap dengan catatan khusus pelanggan.
- Admin mengatur menu, meja, dan metode pembayaran dari satu dashboard.

**Role:** Fullstack Laravel (backend + basic frontend).

**Tech:** Laravel, Blade / Livewire · MySQL, Eloquent ORM.

## Fitur utama

### Modul Kasir
- Dashboard kasir untuk melihat status meja dan ringkasan transaksi hari ini.
- Layar POS yang ringan: pilih tipe order, meja, dan menu dalam beberapa langkah.
- Total, pajak, dan service charge dihitung otomatis tanpa hitung manual.
- Order bisa disimpan sebagai draft atau langsung diselesaikan pembayarannya.
- Dukungan split bill agar pelanggan yang bayar terpisah tetap tercatat rapi.

### Modul Dapur (KDS)
- Tampilan dapur yang mengelompokkan pesanan per meja atau invoice.
- Status setiap item jelas: menunggu, dimasak, siap, atau sudah diantar.
- Koki mengubah status langsung dari layar tanpa perlu tiket kertas.
- Daftar pesanan diperbarui otomatis sehingga dapur melihat data terbaru.
- Catatan seperti tingkat pedas atau permintaan khusus tercatat di setiap item.

### Modul Admin
- Dashboard ringkas untuk memantau performa penjualan per periode.
- Pengelolaan menu, kategori, meja, dan metode pembayaran dalam satu halaman.
- Pengaturan akun dan hak akses untuk kasir, dapur, dan admin.
- Riwayat transaksi yang bisa difilter untuk kebutuhan rekapan dan laporan.

### Karakteristik teknis
- State POS tetap aman saat halaman di-refresh sehingga konteks order tidak hilang.
- Logika bisnis dipisah ke service layer agar struktur kode tetap bersih.
- Pengalaman penggunaan mendekati SPA berkat Livewire, tanpa framework frontend tambahan.
