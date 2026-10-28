# Portofolio RPL (Nuxt 4 + Tailwind CSS 4)

## Menjalankan
1. `npm install`
2. `npm run dev` lalu buka http://localhost:3000
3. `npm run generate` untuk membuat versi statis (cepat dan ramah SEO), hasilnya di `.output/public`

## Mengubah isi
- Semua teks ada di `app/utils/data.ts` (cari kata GANTI).
- Projek RPL & link website: kelola daftar judul dan tautan web di `app/utils/data.ts`.
- Ganti `siteUrl` di `nuxt.config.ts`, serta `public/robots.txt` dan `public/sitemap.xml` dengan domain aslimu.

## Deploy
Hubungkan repo GitHub ke Vercel atau Netlify (perintah build: `npm run generate`).

## Foto dan video
- Foto: `public/foto/`. Buka website, kotak berwarna menampilkan nama file yang dibutuhkan.
- Video: `public/video/intro.mp4` (opsional).
