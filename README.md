# 🎓 Portal Data Siswa

![Status](https://img.shields.io/badge/Status-Aktif-success)
![Platform](https://img.shields.io/badge/Platform-Web-blue)

Aplikasi web sederhana dan responsif yang berfungsi sebagai **Sistem Informasi Akademik Mini (SIA Mini)**. Proyek ini didesain untuk menyediakan akses langsung, aman, dan *real-time* bagi siswa dan orang tua untuk mengecek profil dan rekapitulasi nilai akademik hanya dengan memasukkan NISN (Nomor Induk Siswa Nasional).

Proyek ini sepenuhnya mengadopsi arsitektur **Serverless** dengan memanfaatkan ekosistem Google Workspace:
* **Database Utama (Tabular):** **Google Sheets** (Spreadsheet) digunakan sebagai penyimpanan data tabular (nama, kelas, nilai).
* **Database Media (Media Storage):** **Google Drive** digunakan secara spesifik sebagai media penyimpanan foto profil siswa.
* **Backend/Logika:** **Google Apps Script (GAS)** bertindak sebagai *middleware*, memproses permintaan pencarian dari frontend dan mengintegrasikan data dari Sheets dan Drive.

Model ini menghasilkan solusi yang **efisien biaya (nol biaya hosting)**, memiliki skalabilitas tinggi, dan kecepatan pengembangan yang optimal.

---

## 🚀 Demo & Database

| 🔗 Aplikasi Demo (Live) | 🔗 Contoh Database Sheets |
|:-----------------------------------------------------------:|:-----------------------------------------------------------:|
| **[Coba Aplikasi Langsung di Sini](https://script.google.com/macros/s/AKfycbyqClPHiZ2F3bLM6SzOe5sROpSqmcbhp1EImXbTZZNLKoR1H0Qk4Ln65itASK7zo0kY/exec)** | **[Lihat Struktur Data](https://drive.google.com/drive/folders/1G_cWz0BFKvJZshFDrFFMq4hFZVMoP5xl?usp=sharing)** |

---

## 📸 Tampilan Aplikasi

| Tampilan Awal (Pencarian) | Tampilan Data Siswa |
|:-------------------------:|:-------------------------:|
| ![Tampilan Awal](/images/Screenshot1.png) | ![Tampilan Hasil](/images/Screenshot2.png) |
---

## ✨ Fitur Utama

* **Pencarian Cepat & Fleksibel:** Algoritma pencarian yang cerdas mampu memproses NISN yang diinput, baik dengan maupun tanpa angka nol di depan (contoh: `00123` akan menghasilkan hasil yang sama dengan `123`).
* **Integrasi Google Drive (Media Storage):** Pemanfaatan **Google Drive** sebagai *storage* media untuk menyimpan dan menampilkan foto profil siswa, di mana tautan *sharing* dikonversi otomatis oleh skrip.
* **Mode Gelap (Dark Mode):** Fitur ganti tema yang dapat diakses pengguna.
* **Keamanan Input Dasar:** Implementasi validasi sisi klien dan sisi server memastikan hanya data numerik yang diproses.

---

## 🛠️ Teknologi & Instalasi

* **Frontend:** HTML5, CSS3, JavaScript.
* **Backend & Deployment:** Google Apps Script (GAS).
* **Database Tabular:** Google Spreadsheet.
* **Database Media:** Google Drive.

### Cara Instalasi Singkat

1.  Buat salinan (*Copy*) dari **Contoh Database** yang tersedia di bagian Demo.
2.  Siapkan folder di **Google Drive** untuk menyimpan semua foto siswa, lalu pastikan link foto dicantumkan pada kolom yang sesuai di Google Sheets.
3.  Buka menu **Ekstensi > Apps Script** pada salinan Sheet Anda.
4.  Salin file `Code.gs` dan `Index.html` dari repository ini ke editor script.
5.  Klik **Deploy > New Deployment** dan atur akses Web App ke **"Anyone"** (Siapa saja).

---

**Dikembangkan oleh Muhammad Rifai**