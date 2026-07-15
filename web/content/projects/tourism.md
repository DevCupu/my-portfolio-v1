---
title: Dante Pine Enrekang – Tourism & Booking Platform
kicker: Featured Laravel Platform
subtitle: 2024 · Laravel 12 · Production-ready
tags: [Laravel 12, Blade & Tailwind, MySQL/MariaDB, Booking System, Admin Panel]
image:
  src: /images/projects/tourism/2892faf0-c2e9-4f25-bd86-b8676b6f9d6f.png
  alt: Dante Pine Enrekang tourism and booking platform
github: https://github.com/DevCupu/laravel-project-pariwisata-system
home:
  order: 4
  title: Dante Pine Enrekang Tourism Platform
  summary: Tourism platform with public landing page and admin portal
  description: This Laravel 12 platform manages tourism content, activities, camping packages, café menu, and a centralized, facility-based booking system. Admins manage everything from the dashboard, while visitors book online.
  tags: [Laravel 12, MySQL, Blade & Tailwind, Booking System]
  image: /images/projects/tourism/2892faf0-c2e9-4f25-bd86-b8676b6f9d6f.png
listing:
  period: 2024 · Production
  type: Booking
  icon: map
  gradient: from-orange-500 to-yellow-500
  description: Portal pariwisata dengan landing page informatif, admin panel konten, dan sistem booking terpusat berbasis fasilitas.
  tags: [Laravel 12, Blade, Booking System]
---

## Project overview

Proyek ini memodernisasi platform pariwisata Dante Pine menjadi satu sistem terintegrasi: pengunjung mendapatkan landing page yang informatif, sedangkan tim internal memiliki dashboard admin untuk mengelola semua konten dan booking dari satu tempat.

- Landing page publik: Home, Aktivitas, Paket Camping, Menu kafe, dan Booking.
- Portal admin untuk mengelola aktivitas, menu, spot foto, fasilitas umum, About, dan paket camping.
- Satu sumber data booking (tabel facilities) yang digunakan berbagai jenis wahana/paket agar penghitungan kuota tetap konsisten.
- Form booking dengan pengecekan kapasitas per hari dan kode booking unik untuk pelacakan status.

Secara arsitektur, saya memisahkan model konten publik (seperti spot foto dan fasilitas umum) dari objek yang benar-benar dapat dibooking. Ini membuat sistem lebih fleksibel saat Dante Pine menambah wahana atau jenis paket baru tanpa mengganggu logika booking utama.

**Role:** Backend Laravel, desain skema database, alur booking berbasis fasilitas, dan sebagian besar halaman admin & publik.

**Tech:**
- Laravel 12, PHP 8.2, Blade.
- Tailwind CSS, sedikit Alpine-style interaksi.
- MySQL/MariaDB dengan relasi polymorphic untuk fasilitas & booking.
