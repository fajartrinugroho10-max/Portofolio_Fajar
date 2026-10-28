// ==========================================================
// EDIT FILE INI SAJA untuk mengganti isi website & foto-foto.
// 
// CARA GANTI FOTO ADA 2 CARA MUDAH:
// 1. CARA PALING GAMPANG: Cukup masukkan foto kamu ke folder "public/foto/"
//    dengan nama file yang sama (bisa format .jpg, .png, atau .webp).
// 2. CARA CUSTOM: Ubah path foto di file ini langsung (misal: '/foto/nama-kamu.png'
//    atau link online 'https://...').
// ==========================================================

export const profile = {
  nama: 'Fajar Tri Nugroho',                       // GANTI
  sekolah: 'SMK Negeri 71 Jakarta',                // GANTI
  jurusan: 'Rekayasa Perangkat Lunak (RPL)',
  kelas: 'XI RPL 2',                               // GANTI
  kota: 'Jakarta Timur',
  email: 'fajartrinugroho10@gmail.com',             // GANTI
  github: 'https://github.com/fajartrinugroho10-max',           // GANTI
  
  // FOTO HALAMAN UTAMA (BERANDA)
  foto: '/foto/profil.jpg.jpeg',                        // Foto Profil Utama (di bagian hero)
  fotoTentang: '/foto/tentang.jpg.jpeg',                // Foto di bagian "Tentang Saya"

  tagline: 'Pelajar RPL yang belajar membangun aplikasi dari ide sampai bisa dipakai orang.',
  tentang:
    'Saya pelajar SMK jurusan Rekayasa Perangkat Lunak. Di sekolah saya belajar menganalisis kebutuhan, merancang tampilan, menulis kode, lalu menguji hasilnya. Website ini saya buat sebagai portofolio sekaligus bukti pemahaman saya tentang RPL.'
}

export const jejak = [
  { tahun: '2009', judul: 'Lahir', isi: 'Saya lahir pada tahun 2009', foto: '/foto/jejak-1.jpeg' },
  { tahun: '2016', judul: 'SD', isi: 'Mulai sekolah dan suka bertanya "ini cara kerjanya bagaimana?".', foto: '/foto/jejak-2.jpeg' },
  { tahun: '2022', judul: 'SMP', isi: 'Mengenal komputer lebih dalam dan mulai tertarik membuat program.', foto: '/foto/jejak-3.jpeg' },
  { tahun: '2024', judul: 'SMK jurusan RPL', isi: 'Belajar HTML, CSS, JavaScript, dan dasar pemrograman.', foto: '/foto/jejak-4.jpg' },
  { tahun: 'Sekarang', judul: 'Membangun portofolio', isi: 'Mengerjakan projek sekolah dan belajar Nuxt serta Tailwind.', foto: '/foto/jejak-5.jpg' }
]

export const biodata = [
  ['Nama', profile.nama],
  ['Sekolah', profile.sekolah],
  ['Jurusan', profile.jurusan],
  ['Kelas', profile.kelas],
  ['Domisili', profile.kota],
  ['Email', profile.email]
]

export const keahlian = ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS', 'Nuxt / Vue', 'Git & GitHub', 'MySQL', 'Dasar UI/UX']

// FOTO KEGIATAN (Halaman Akademik)
export const kegiatan = [
  { judul: 'Praktik pemrograman web', kategori: 'Pelajaran', isi: 'Membuat halaman web responsif dengan HTML, CSS, dan JavaScript.', foto: '/foto/kegiatan-1.jpeg' },
  { judul: 'Basis data', kategori: 'Pelajaran', isi: 'Merancang tabel dan relasi, lalu menulis query MySQL.', foto: '/foto/kegiatan-2.png' },
  { judul: 'Lomba / ekskul', kategori: 'Kegiatan', isi: 'GANTI dengan lomba, ekskul, atau organisasi yang kamu ikuti.', foto: '/foto/kegiatan-3.jpeg' },
  { judul: 'Sertifikat / pelatihan', kategori: 'Kegiatan', isi: 'GANTI dengan kursus atau sertifikat yang kamu punya.', foto: '/foto/kegiatan-4.jpeg' }
]

// Tahapan SDLC: bukti pemahaman konsep RPL (Halaman Beranda & Akademik)
export const tahapan = [
  { nama: 'Analisis', isi: 'Menggali masalah dan kebutuhan pengguna sebelum menulis kode. Hasilnya daftar fitur dan batasan aplikasi.', contoh: 'Wawancara calon pengguna, menulis user story.', foto: '/foto/tahap-1.jpg' },
  { nama: 'Desain', isi: 'Merancang alur, tampilan, dan struktur data supaya tim punya gambaran yang sama.', contoh: 'Wireframe di Figma, ERD, flowchart.', foto: '/foto/tahap-2.jpg' },
  { nama: 'Implementasi', isi: 'Menerjemahkan desain menjadi kode yang rapi dan bisa dibaca orang lain.', contoh: 'HTML/CSS/JS, Nuxt, versi kode lewat Git.', foto: '/foto/tahap-3.jpg' },
  { nama: 'Pengujian', isi: 'Memastikan aplikasi berjalan sesuai kebutuhan dan mencari bug sebelum dipakai.', contoh: 'Uji fungsi, uji di HP dan laptop, uji oleh teman.', foto: '/foto/tahap-4.jpg' },
  { nama: 'Rilis', isi: 'Memasang aplikasi agar bisa diakses pengguna.', contoh: 'Deploy ke Vercel atau Netlify.', foto: '/foto/tahap-5.jpg' },
  { nama: 'Pemeliharaan', isi: 'Memperbaiki masalah dan menambah fitur berdasarkan masukan.', contoh: 'Perbaiki bug, perbarui dependensi.', foto: '/foto/tahap-6.jpg' }
]

// PROJEK RPL (Halaman Akademik)
// Isi judul, kategori, deskripsi, link website (misal: GitHub, Figma, Vercel, dll), jenis tag, dan thumbnail foto
export const projek = [
  {
    judul: 'Web Universitas',
    kategori: 'Web',
    deskripsi: 'Aplikasi web toko dan katalog produk interaktif.',
    link: 'https://fajartrinugroho10-max.github.io/Web_universitas/', // GANTI dengan link website atau repo projek kamu
    jenis: 'Web',
    foto: '/foto/projek-web-toko.jpg.jpeg'
  },

  {
    judul: 'Desain UI Aplikasi Mobile',
    kategori: 'Desain',
    deskripsi: 'Prototipe desain antarmuka aplikasi interaktif di Figma.',
    link: 'https://www.figma.com/files/team/1686660109957459320/folder/663526816?fuid=1686660108557601280', // GANTI dengan link Figma projek kamu
    jenis: 'Figma',
    foto: '/foto/projek-desain-ui.jpeg'
  },
  {
    judul: 'Laporan Analisis Kebutuhan Sistem',
    kategori: 'Dokumen',
    deskripsi: 'Dokumentasi spesifikasi kebutuhan perangkat lunak.',
    link: 'https://docs.google.com/document/d/1dN-hs70G1BkSizxnVcalNloqHJiNEvuYjwLgrPY8wJ4/edit?pli=1&tab=t.0', // GANTI dengan link dokumen/web projek kamu
    jenis: 'Docs',
    foto: '/foto/projek-analisis-kebutuhan.jpg.png'
  },
  {
    judul: 'Rancangan Basis Data (ERD)',
    kategori: 'Database',
    deskripsi: 'Skema tabel dan relasi database MySQL.',
    link: 'https://app.diagrams.net/#G16eD-5TvnHe74HebmVJ0a1IeVCNKIJDfU#%7B%22pageId%22%3A%22uO9xy4i2-9LUUHbCPChZ%22%7D', // GANTI dengan link ERD / database kamu
    jenis: 'ERD',
    foto: '/foto/projek-erd-database.jpg .png'
  }
]

// FOTO HOBI (Halaman Hobi: masing-masing 3 foto)
export const hobi = [
  {
    id: 'musik', nama: 'Musik', warna: '#E8542B',
    judul: 'Gitar dan bass',
    isi: 'Saya bermain gitar dan bass. Bass mengajarkan saya bahwa bagian yang jarang disorot sering menentukan seluruh lagu, sama seperti struktur kode.',
    poin: ['Bass 4 senar', 'Gitar akustik dan elektrik', 'Sedang melatih: walking bass'],
    foto: ['/foto/hobi-musik-1.jpg.jpeg', '/foto/hobi-musik-2.jpg.jpeg', '/foto/hobi-musik-3.jpg.jpeg']
  },
  {
    id: 'olahraga', nama: 'Olahraga', warna: '#1E9E6A',
    judul: 'Bergerak supaya fokus',
    isi: 'Olahraga menjaga badan dan kepala tetap segar setelah berjam-jam di depan layar. (GANTI dengan olahraga favoritmu)',
    poin: ['Olahraga favorit: Lari', 'Rutin: Workout', 'Target: Kesehatan jasmani dan Rohani'],
    foto: ['/foto/hobi-olahraga-1.jpg.jpeg', '/foto/hobi-olahraga-2.jpg.jpeg', '/foto/hobi-olahraga-3.jpg.jpeg']
  },
  {
    id: 'seni', nama: 'Seni', warna: '#B03AB8',
    judul: 'Melihat dan membuat',
    isi: 'Seni melatih mata saya soal warna, ruang, dan keseimbangan. Semua itu terpakai saat mendesain tampilan aplikasi. (GANTI sesuai kegiatan senimu)',
    poin: ['Menggambar / desain: Baju', 'Seniman favorit: Van Gough', 'Karya terbaru: Karya Sastra Tulis'],
    foto: ['/foto/hobi-seni-1.jpeg', '/foto/hobi-seni-2.jpeg', '/foto/hobi-seni-3.jpeg']
  },
  {
    id: 'sejarah', nama: 'Sejarah', warna: '#B8860B',
    judul: 'Belajar dari yang sudah terjadi',
    isi: 'Saya suka sejarah karena setiap peristiwa punya sebab dan akibat, mirip log error yang harus ditelusuri. (GANTI dengan periode atau tokoh favoritmu)',
    poin: ['Periode favorit: 500 M', 'Tokoh favorit: Muhammad SAW, Napoleon Bonaparte', 'Buku / film:Film Troy '],
    foto: ['/foto/hobi-sejarah-1.jpg.jpeg', '/foto/hobi-sejarah-2.jpeg', '/foto/hobi-sejarah-3.jpg.jpeg']
  }
]
