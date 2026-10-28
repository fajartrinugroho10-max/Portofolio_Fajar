# 📸 Panduan Mudah Mengganti Foto di Website Portofolio

Website ini sudah diatur agar kamu bisa mengganti foto dengan **sangat mudah**. Ada **2 pilihan cara**:

---

## 🚀 Cara 1: Tinggal Taruh / Replace File Foto (Paling Cepat & Gampang)
Kamu tidak perlu mengubah baris kode apa pun!
Cukup simpan foto kamu ke dalam folder:
📁 `public/foto/`

> **⚡ Fitur Otomatis Baru:**
> Komponen foto sekarang **otomatis mendeteksi format `.jpg`, `.png`, `.jpeg`, maupun `.webp`**! 
> Jadi kalau kamu punya file format PNG (misal: `profil.png`), sistem akan otomatis menampilkannya tanpa harus mengubah ekstensi atau kodingan!

### 📌 Daftar Nama File untuk Tiap Halaman:

### 🏠 1. Halaman Beranda (`/`)
| Nama File | Posisi / Kegunaan | Rasio Saran |
|---|---|---|
| `profil.jpg` (atau `.png`) | Foto profil utama di bagian Hero paling atas | 4:5 (Vertikal) |
| `tentang.jpg` | Foto kegiatan di bagian Tentang Saya | 16:9 (Landscape) |
| `tahap-1.jpg` s/d `tahap-6.jpg` | Foto ilustrasi 6 tahapan RPL (SDLC) | Landscape |
| `jejak-1.jpg` s/d `jejak-5.jpg` | Foto perjalanan dari lahir, SD, SMP, hingga SMK | Landscape |
| `menu-akademik.jpg` | Gambar thumbnail kartu menu Akademik | 4:3 |
| `menu-organisasi.jpg` | Gambar thumbnail kartu menu Organisasi | 4:3 |
| `menu-hobi.jpg` | Gambar thumbnail kartu menu Hobi | 4:3 |

---

### 🎓 2. Halaman Akademik (`/akademik`)
| Nama File | Posisi / Kegunaan |
|---|---|
| `kegiatan-1.jpg` s/d `kegiatan-4.jpg` | Foto 4 kegiatan belajar & ekskul |
| `projek-analisis-kebutuhan.jpg` | Thumbnail projek Analisis |
| `projek-desain-ui.jpg` | Thumbnail projek Desain UI Figma |
| `projek-web-toko.jpg` | Thumbnail projek Web Toko |
| `projek-erd-database.jpg` | Thumbnail projek Database ERD |

---

### 🤝 3. Halaman Organisasi (`/organisasi`)
Setiap organisasi memiliki 3 foto (1 foto utama + 2 foto pendukung):
- **OSIS:** `org-osis-1.jpg`, `org-osis-2.jpg`, `org-osis-3.jpg`
- **Musik:** `org-musik-1.jpg`, `org-musik-2.jpg`, `org-musik-3.jpg`
- **Pramuka:** `org-pramuka-1.jpg`, `org-pramuka-2.jpg`, `org-pramuka-3.jpg`
- **PKL / Magang:** `org-pkl-1.jpg`, `org-pkl-2.jpg`, `org-pkl-3.jpg`

---

### 🎸 4. Halaman Hobi (`/hobi`)
Setiap hobi memiliki 3 foto:
- **Musik:** `hobi-musik-1.jpg`, `hobi-musik-2.jpg`, `hobi-musik-3.jpg`
- **Olahraga:** `hobi-olahraga-1.jpg`, `hobi-olahraga-2.jpg`, `hobi-olahraga-3.jpg`
- **Seni:** `hobi-seni-1.jpg`, `hobi-seni-2.jpg`, `hobi-seni-3.jpg`
- **Sejarah:** `hobi-sejarah-1.jpg`, `hobi-sejarah-2.jpg`, `hobi-sejarah-3.jpg`

---

## 🛠️ Cara 2: Atur Nama File / Link Bebas di File Konfigurasi
Jika kamu ingin memberi nama file foto sesuka hati (misalnya `fajar-ganteng.png`) atau ingin menggunakan link URL gambar dari internet:

1. **Untuk Beranda, Akademik, dan Hobi:**
   Buka file: [`app/utils/data.ts`](file:///app/utils/data.ts)
   Cari bagian:
   ```ts
   export const profile = {
     // ...
     foto: '/foto/foto-kamu-bebas.png',      // atau link 'https://...'
     fotoTentang: '/foto/sekolah.jpg',
   }
   ```
   Kamu juga bisa mengganti `foto` pada array `jejak`, `kegiatan`, `projek`, dan `hobi`.

2. **Untuk Halaman Organisasi:**
   Buka file: [`app/utils/organisasi.ts`](file:///app/utils/organisasi.ts)
   Ubah array `foto` pada setiap organisasi:
   ```ts
   foto: ['/foto/foto1.jpg', '/foto/foto2.jpg', '/foto/foto3.jpg']
   ```
