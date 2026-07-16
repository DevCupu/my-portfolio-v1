---
title: SIORMAWA – Student Organization Management System
kicker: Featured Laravel Platform
subtitle: 2024 · Laravel 12 · In active development (~80%)
tags: [Laravel 12, Tailwind CSS, Vite, MySQL, Role-based Access]
image:
  src: /images/projects/organization/siormawa.png
  alt: Dashboard SIORMAWA - Sistem Informasi Manajemen Organisasi Mahasiswa
gallery:
  - src: /images/projects/organization/siormawa.png
    alt: Dashboard SIORMAWA - Sistem Informasi Manajemen Organisasi Mahasiswa
  - src: /images/projects/organization/siormawa2.png
    alt: Tampilan fitur anggota SIORMAWA
github: https://github.com/DevCupu/laravel-ormawa-management-system
home:
  order: 8
  title: SIORMAWA
  summary: Student organization management system
  description: Platform manajemen organisasi kemahasiswaan dengan role terpisah untuk Admin Sistem, Admin Organisasi, dan Member. Setiap organisasi punya data anggota, event, dan dokumen sendiri — rapi, transparan, dan mudah diaudit.
  tags: [Laravel 12, Tailwind CSS, Vite, Multi-tenant]
  image: /images/projects/organization/siormawa.png
listing:
  period: 2024 · In progress
  type: Multi-tenant
  icon: users
  gradient: from-emerald-500 to-cyan-500
  description: Platform organisasi mahasiswa dengan manajemen anggota, kegiatan, dokumen, dan role-based access yang scalable untuk banyak organisasi.
  tags: [Laravel 12, Tailwind, MySQL]
---

## Project overview

SIORMAWA dirancang fleksibel untuk skala universitas maupun sekolah. Di universitas, satu Admin Sistem (staff IT) mengelola platform, sementara belasan Admin Organisasi mengurus himpunan/UKM masing-masing. Pada skala sekolah, peran serupa dipegang oleh guru TI dan pembina OSIS/ekstrakurikuler.

- Admin Sistem (Superadmin): manajemen pengguna, organisasi, monitoring, serta pengumuman global.
- Admin Organisasi: kelola data internal, anggota, kegiatan/event, dan arsip dokumen (proposal, LPJ, surat).
- Member: melihat info organisasi, mengunduh dokumen, dan mendaftar ke kegiatan dengan akses yang dibatasi.

Di level database, sistem memakai pendekatan multi-tenancy sederhana: setiap organisasi memiliki data anggota, event, dan dokumennya sendiri. Query di-scope berdasarkan ID organisasi yang terhubung dengan akun admin, sehingga privasi data antar organisasi tetap terjaga tanpa perlu memecah aplikasi.

Struktur tabel inti meliputi `users`, `organizations`, `members`, `events`, dan `documents`. Tabel users menyimpan akun login dan role, sementara tabel members menyimpan biodata anggota yang bisa berdiri sendiri meskipun belum memiliki akun login. Hal ini memudahkan pendataan massal tanpa memaksa semua anggota untuk langsung membuat akun.

**Role:** Perancangan arsitektur backend, desain skema database multi-organisasi, implementasi role & permission dasar, serta halaman dashboard utama.

**Tech:**
- Laravel 12, PHP 8.2, Blade.
- Tailwind CSS, Vite, komponen layout modular.
- MySQL dengan relasi terstruktur antar organisasi, member, events, dan documents.

**Development status:** Fitur utama sudah berjalan (auth, organisasi, anggota, events, dokumen), dengan beberapa modul lanjutan dan hardening security masih dalam pengembangan (~80%).
