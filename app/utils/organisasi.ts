// Foto: bisa kamu ganti di folder public/foto/ (bisa .jpg, .png, .webp)
// ATAU ubah langsung path di array `foto` di bawah ini.
export const organisasi = [
  {
    id: 'osis',
    jenis: 'Organisasi',
    nama: 'OSIS SMK Negeri 71 Jakarta',
    peran: 'Anggota Seksi Kepribadian Bangsa',
    periode: '2025 - 2026',
    status: 'Purna',
    isi: 'Mengadakan Acara Mengenai Keangsaan',
    kegiatan: ['Menjadi Wakil Ketua Pelaksana Acara', 'Mengelola dokumentasi acara', 'Pemandu Acara'],
    foto: ['/foto/org-osis-1.jpg', '/foto/org-osis-2.jpg.jpeg', '/foto/org-osis-3.jpg.jpeg']
  },
  {
    id: 'musik',
    jenis: 'Organisasi',
    nama: 'Ekskul Musik',
    peran: 'Bassist',
    periode: '2024 - 2025',
    status: 'Purna',
    isi: ' Tampil di acara Hari-hari Nasional dan sekolah seperto, ari Kemerdekaan dan acara perpisahan Angkatan.',
    kegiatan: ['Latihan band tiap pekan', 'Tampil di acara sekolah', 'Belajar aransemen lagu'],
    foto: ['/foto/org-musik-1.jpeg', '/foto/org-musik-2.jpeg', '/foto/org-musik-3.jpeg']
  },
  {
    id: 'Esa',
    jenis: 'Organisasi',
    nama: 'Yayasan Al-Kahfi',
    peran: 'Anggota',
    periode: '2025 - Sekarang',
    status: 'Aktif',
    isi: 'Saya bergabun dengan yayasan untuk membangun dan membantu masyarakat.',
    kegiatan: ['Bakti Sosial, Mengajar Anak-anak Yayasan'],
    foto: ['/foto/org-pramuka-1.jpg.jpeg', '/foto/org-pramuka-2.jpg.jpeg', '/foto/org-pramuka-3.jpg.jpeg']
  },
  {
    id: 'pkl',
    jenis: 'Instansi',
    nama: 'Praktik Kerja Lapangan',
    peran: '',
    periode: '-',
    status: '-',
    isi: '-.',
    kegiatan: ['Membantu membuat fitur web', 'Belajar alur kerja tim', 'Menulis laporan PKL'],
    foto: ['/foto/org-pkl-1.jpg', '/foto/org-pkl-2.jpg', '/foto/org-pkl-3.jpg']
  }
]
