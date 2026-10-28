<script setup lang="ts">
usePageSeo(
  `${profile.nama}, Pelajar ${profile.jurusan}`,
  `Portofolio ${profile.nama}, pelajar ${profile.jurusan} di ${profile.sekolah}. Profil, jejak, organisasi, projek, dan hobi.`,
  '/'
)
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org', '@type': 'Person',
      name: profile.nama, jobTitle: 'Pelajar SMK ' + profile.jurusan,
      alumniOf: profile.sekolah, email: profile.email, sameAs: [profile.github]
    })
  }]
})

// Video intro (opsional): taruh di public/video/intro.mp4
const videoUrl = '/video/intro.mp4'
const adaVideo = ref(false)
const modal = ref(false)
onMounted(async () => {
  try {
    const r = await fetch(videoUrl, { method: 'HEAD' })
    adaVideo.value = r.ok && (r.headers.get('content-type') || '').startsWith('video')
  } catch {}
})

// Cerita "membangun rumah" = tahapan RPL, berganti sesuai posisi scroll
const rumah = [
  { nama: 'Analisis', judul: 'Tanya dulu penghuninya', analogi: 'Sebelum ada tembok, tukang bertanya: butuh berapa kamar? Anggarannya berapa?', rpl: 'Mencari tahu apa yang sebenarnya dibutuhkan pengguna aplikasi.' },
  { nama: 'Desain', judul: 'Gambar denahnya', analogi: 'Denah memastikan semua orang membayangkan rumah yang sama.', rpl: 'Membuat sketsa tampilan (wireframe) dan rancangan data.' },
  { nama: 'Implementasi', judul: 'Mulai membangun', analogi: 'Tukang menyusun bata sesuai denah, bukan sesuka hati.', rpl: 'Programmer menulis kode sesuai desain.' },
  { nama: 'Pengujian', judul: 'Cek sebelum ditempati', analogi: 'Keran dicoba, pintu dibuka, atap dicek bocor atau tidak.', rpl: 'Aplikasi diuji supaya kesalahan (bug) ketahuan sebelum dipakai orang.' },
  { nama: 'Rilis', judul: 'Serahkan kuncinya', analogi: 'Rumah siap ditempati, lampu menyala.', rpl: 'Aplikasi dipasang online supaya semua orang bisa memakainya.' },
  { nama: 'Pemeliharaan', judul: 'Rumah tetap dirawat', analogi: 'Genteng bocor diperbaiki, kamar ditambah kalau keluarga bertambah.', rpl: 'Aplikasi terus diperbaiki dan dikembangkan dari masukan pengguna.' }
]
const s = ref(0)
onMounted(() => {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) s.value = Number((e.target as HTMLElement).dataset.langkah)
  }), { rootMargin: '-45% 0px -45% 0px' })
  document.querySelectorAll('[data-langkah]').forEach(el => io.observe(el))
  onBeforeUnmount(() => io.disconnect())
})

const statistik = [
  { to: projek.length, l: 'projek RPL' },
  { to: organisasi.length, l: 'organisasi dan instansi' },
  { to: tahapan.length, l: 'tahap RPL dipahami' },
  { to: keahlian.length, l: 'teknologi dipelajari' }
]
const menu = [
  { to: '/akademik', t: 'Akademik dan projek', d: 'Pelajaran, pemahaman RPL, dan karya projek web.', f: 'menu-akademik', foto: '/foto/menu-akademik.jpg.jpeg' },
  { to: '/organisasi', t: 'Organisasi', d: 'Tempat saya belajar bekerja dalam tim.', f: 'menu-organisasi', foto: '/foto/menu-organisasi.jpg.jpeg' },
  { to: '/hobi', t: 'Hobi', d: 'Main gitar digital, tes refleks, gambar, dan kuis.', f: 'menu-hobi', foto: '/foto/menu-hobi.jpg.jpeg' }
]
</script>

<template>
  <div>
    <!-- HERO -->
    <section class="relative isolate overflow-hidden">
      <div class="absolute inset-0 -z-10" aria-hidden="true">
        <div class="blob absolute -top-24 -left-24 size-96 rounded-full bg-brand/40 blur-3xl" />
        <div class="blob absolute top-1/3 right-0 size-96 rounded-full bg-[#ff7a45]/30 blur-3xl" style="animation-delay:-4s" />
        <div class="blob absolute bottom-0 left-1/3 size-80 rounded-full bg-[#22d3a0]/25 blur-3xl" style="animation-delay:-8s" />
        <video v-if="adaVideo" class="absolute inset-0 size-full object-cover opacity-30" :src="videoUrl" autoplay muted loop playsinline />
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg" />
      </div>

      <div class="mx-auto max-w-5xl px-5 min-h-[85vh] grid lg:grid-cols-5 gap-10 items-center py-16">
        <div class="lg:col-span-3">
          <p class="font-semibold text-brand">Pelajar {{ profile.jurusan }}</p>
          <h1 class="mt-3 text-5xl sm:text-7xl font-extrabold tracking-tight leading-[1.02]">Saya {{ profile.nama }}. Saya belajar membuat aplikasi.</h1>
          <p class="mt-6 text-lg text-mute max-w-prose">{{ profile.tagline }}</p>
          <div class="mt-8 flex flex-wrap gap-3">
            <a href="#rpl" class="px-5 py-3 rounded-xl bg-brand text-brand-ink font-semibold">Apa itu RPL?</a>
            <button v-if="adaVideo" type="button" @click="modal = true" class="px-5 py-3 rounded-xl border border-line font-semibold hover:border-brand">Tonton video intro</button>
            <NuxtLink to="/akademik" class="px-5 py-3 rounded-xl border border-line font-semibold hover:border-brand">Lihat projek</NuxtLink>
          </div>
        </div>
        <div class="lg:col-span-2 relative mx-auto w-full max-w-xs">
          <PhotoSlot :src="profile.foto || '/foto/profil.jpg'" :label="`Foto profil ${profile.nama}`" class="aspect-[4/5] rounded-3xl rotate-2 shadow-2xl ring-1 ring-line" />
          <span class="floaty absolute -left-6 top-10 px-3 py-1.5 rounded-xl bg-surface border border-line text-sm font-bold shadow-lg">Nuxt 4</span>
          <span class="floaty absolute -right-4 top-1/2 px-3 py-1.5 rounded-xl bg-surface border border-line text-sm font-bold shadow-lg" style="animation-delay:-1.5s">Tailwind</span>
          <span class="floaty absolute left-4 -bottom-4 px-3 py-1.5 rounded-xl bg-surface border border-line text-sm font-bold shadow-lg" style="animation-delay:-3s">JavaScript</span>
        </div>
      </div>
    </section>

    <div class="overflow-hidden border-y border-line py-4" aria-hidden="true">
      <div class="marquee flex w-max gap-12 text-2xl font-extrabold text-mute">
        <span v-for="(k, i) in [...keahlian, ...keahlian]" :key="i">{{ k }}</span>
      </div>
    </div>

    <div class="mx-auto max-w-5xl px-5">
      <!-- TENTANG -->
      <section class="mt-24 grid md:grid-cols-5 gap-10">
        <div class="md:col-span-3">
          <h2 class="text-3xl font-extrabold tracking-tight">Tentang saya</h2>
          <p class="mt-4 text-mute max-w-prose">{{ profile.tentang }}</p>
          <PhotoSlot :src="profile.fotoTentang || '/foto/tentang.jpg'" label="Foto kegiatan sekolah" class="mt-6 aspect-video rounded-2xl" />
        </div>
        <dl class="md:col-span-2 self-start rounded-2xl bg-surface border border-line divide-y divide-line">
          <div v-for="[k, v] in biodata" :key="k" class="flex justify-between gap-4 px-5 py-3 text-sm">
            <dt class="text-mute">{{ k }}</dt><dd class="font-semibold text-right">{{ v }}</dd>
          </div>
        </dl>
      </section>

      <!-- CERITA RPL -->
      <section id="rpl" class="mt-28 scroll-mt-20">
        <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight max-w-2xl">RPL itu apa? Bayangkan sedang membangun rumah.</h2>
        <p class="mt-3 text-mute max-w-prose">RPL berarti Rekayasa Perangkat Lunak: cara membuat aplikasi secara teratur. Geser ke bawah dan lihat rumahnya jadi tahap demi tahap.</p>

        <div class="mt-10 grid md:grid-cols-2 gap-8">
          <div class="sticky top-16 md:top-24 self-start z-10">
            <div class="rounded-3xl bg-surface border border-line p-4 shadow-lg">
              <svg viewBox="0 0 420 280" class="w-full max-h-52 md:max-h-none" role="img" aria-label="Rumah yang dibangun bertahap mengikuti tahap RPL">
                <line x1="20" y1="240" x2="400" y2="240" stroke="var(--line)" stroke-width="3" />
                <g class="transition-opacity duration-500" :style="{ opacity: s === 0 ? 1 : 0 }">
                  <ellipse cx="210" cy="120" rx="80" ry="45" fill="var(--brand)" opacity=".15" />
                  <text x="210" y="142" text-anchor="middle" font-size="62" font-weight="800" fill="var(--brand)">?</text>
                  <text x="210" y="205" text-anchor="middle" font-size="15" fill="var(--mute)">butuh apa saja?</text>
                </g>
                <g fill="none" stroke="var(--brand)" stroke-width="2" stroke-dasharray="6 5" class="transition-opacity duration-500" :style="{ opacity: s === 1 ? 1 : s >= 2 ? .25 : 0 }">
                  <rect x="100" y="130" width="220" height="110" /><polygon points="85,130 210,55 335,130" />
                  <line x1="210" y1="130" x2="210" y2="240" /><rect x="235" y="165" width="50" height="40" /><rect x="140" y="170" width="40" height="70" />
                </g>
                <g style="transition:opacity .7s, transform .7s" :style="{ opacity: s >= 2 ? 1 : 0, transform: s >= 2 ? 'none' : 'translateY(-24px)' }">
                  <rect x="100" y="130" width="220" height="110" fill="var(--surface)" stroke="var(--ink)" stroke-width="3" />
                  <polygon points="85,130 210,55 335,130" fill="var(--brand)" />
                  <rect x="140" y="170" width="40" height="70" fill="var(--ink)" />
                  <rect x="235" y="165" width="50" height="40" :fill="s >= 4 ? '#ffd45e' : '#bcd7ff'" stroke="var(--ink)" stroke-width="3" style="transition:fill .6s" />
                </g>
                <g class="transition-opacity duration-500" :style="{ opacity: s >= 3 ? 1 : 0 }">
                  <circle cx="160" cy="160" r="13" fill="#22a06b" /><circle cx="260" cy="185" r="13" fill="#22a06b" /><circle cx="210" cy="105" r="13" fill="#22a06b" />
                  <g fill="#fff" font-size="15" text-anchor="middle" font-weight="700"><text x="160" y="166">✓</text><text x="260" y="191">✓</text><text x="210" y="111">✓</text></g>
                </g>
                <g class="transition-opacity duration-500" :style="{ opacity: s >= 4 ? 1 : 0 }">
                  <rect x="352" y="150" width="4" height="90" fill="var(--ink)" /><polygon points="356,150 394,163 356,176" fill="#ff7a45" />
                </g>
                <g class="transition-opacity duration-500" :style="{ opacity: s >= 5 ? 1 : 0 }">
                  <circle class="putar" cx="55" cy="195" r="22" fill="none" stroke="var(--mute)" stroke-width="9" stroke-dasharray="9 7" /><circle cx="55" cy="195" r="8" fill="var(--mute)" />
                </g>
              </svg>
              <p class="mt-2 font-bold">Tahap {{ s + 1 }} dari 6: {{ rumah[s].nama }}</p>
              <div class="mt-2 h-1.5 rounded-full bg-line"><div class="h-full rounded-full bg-brand transition-all duration-500" :style="{ width: ((s + 1) / 6 * 100) + '%' }" /></div>
            </div>
          </div>

          <div>
            <article v-for="(r, i) in rumah" :key="r.nama" :data-langkah="i" class="min-h-[55vh] flex flex-col justify-center gap-3">
              <h3 class="text-3xl font-extrabold tracking-tight">{{ r.judul }}</h3>
              <p class="text-lg max-w-prose">{{ r.analogi }}</p>
              <p class="rounded-xl bg-brand/10 text-brand px-4 py-3 font-semibold max-w-prose">Di RPL: {{ r.rpl }}</p>
              <PhotoSlot :src="tahapan[i]?.foto || `/foto/tahap-${i + 1}.jpg`" :label="`Foto projek: tahap ${r.nama}`" class="aspect-[16/7] rounded-2xl" />
            </article>
          </div>
        </div>
      </section>

      <!-- STATISTIK -->
      <dl class="mt-24 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div v-for="x in statistik" :key="x.l" class="rounded-2xl bg-surface border border-line p-5">
          <dt class="text-sm text-mute order-2">{{ x.l }}</dt>
          <dd class="text-4xl font-extrabold text-brand"><CountUp :to="x.to" /></dd>
        </div>
      </dl>

      <!-- JEJAK -->
      <section class="mt-24">
        <h2 class="text-3xl font-extrabold tracking-tight">Jejak saya</h2>
        <p class="mt-2 text-mute">Perjalanan dari awal sampai sekarang, urut seperti riwayat commit.</p>
        <ol class="mt-8 border-l-2 border-line ml-2">
          <li v-for="(j, i) in jejak" :key="j.tahun" class="relative pl-8 pb-10 last:pb-0 grid sm:grid-cols-[1fr_15rem] gap-4">
            <span class="absolute -left-[9px] top-1.5 size-4 rounded-full bg-brand ring-4 ring-bg" />
            <div>
              <p class="text-sm font-semibold text-brand">{{ j.tahun }}</p>
              <h3 class="font-bold text-lg">{{ j.judul }}</h3>
              <p class="text-mute max-w-prose">{{ j.isi }}</p>
            </div>
            <PhotoSlot :src="j.foto || `/foto/jejak-${i + 1}.jpg`" :label="j.judul" class="aspect-video rounded-xl" />
          </li>
        </ol>
      </section>

      <!-- MENU -->
      <section class="mt-24 grid sm:grid-cols-3 gap-4">
        <NuxtLink v-for="m in menu" :key="m.to" :to="m.to" class="group rounded-2xl bg-surface border border-line overflow-hidden hover:border-brand">
          <PhotoSlot :src="m.foto || `/foto/${m.f}.jpg`" :label="m.t" class="aspect-[4/3]" />
          <div class="p-4"><h3 class="font-bold text-lg">{{ m.t }}</h3><p class="text-sm text-mute">{{ m.d }}</p></div>
        </NuxtLink>
      </section>
    </div>

    <div v-if="modal" class="fixed inset-0 z-50 bg-black/85 grid place-items-center p-4" @click.self="modal = false" @keydown.esc="modal = false" role="dialog" aria-modal="true" aria-label="Video intro">
      <div class="w-full max-w-3xl">
        <button type="button" @click="modal = false" class="mb-2 text-white font-semibold">Tutup</button>
        <video :src="videoUrl" controls autoplay playsinline class="w-full rounded-2xl" />
      </div>
    </div>
  </div>
</template>
