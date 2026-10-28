<script setup lang="ts">
usePageSeo(
  'Akademik dan Projek RPL',
  `Kegiatan akademik, pemahaman tahapan rekayasa perangkat lunak, dan projek RPL milik ${profile.nama}.`,
  '/akademik'
)

const aktif = ref(0)
const kategoriList = ['Semua', ...new Set(projek.map(p => p.kategori))]
const filter = ref('Semua')
const tampil = computed(() => filter.value === 'Semua' ? projek : projek.filter(p => p.kategori === filter.value))
</script>

<template>
  <div class="mx-auto max-w-5xl px-5 pt-14">
    <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight">Akademik dan projek</h1>
    <p class="mt-3 text-mute max-w-prose">Apa yang saya pelajari di jurusan RPL, bagaimana saya memahaminya, dan hasil karya projek yang dapat dikunjungi langsung.</p>

    <!-- Kegiatan -->
    <section class="mt-14" aria-labelledby="h-kegiatan">
      <h2 id="h-kegiatan" class="text-2xl font-extrabold">Kegiatan akademik</h2>
      <div class="mt-5 grid sm:grid-cols-2 gap-4">
        <article v-for="(k, i) in kegiatan" :key="k.judul" class="rounded-2xl bg-surface border border-line overflow-hidden">
          <PhotoSlot :src="k.foto || `/foto/kegiatan-${i + 1}.jpg`" :label="k.judul" class="aspect-video" />
          <div class="p-5">
          <p class="text-sm text-brand font-semibold">{{ k.kategori }}</p>
          <h3 class="mt-1 font-bold text-lg">{{ k.judul }}</h3>
          <p class="mt-1 text-mute">{{ k.isi }}</p>
          </div>
        </article>
      </div>
      <ul class="mt-5 flex flex-wrap gap-2" aria-label="Keahlian">
        <li v-for="s in keahlian" :key="s" class="px-3 py-1 rounded-full border border-line text-sm font-semibold">{{ s }}</li>
      </ul>
    </section>

    <!-- Pemahaman RPL -->
    <section class="mt-20" aria-labelledby="h-sdlc">
      <h2 id="h-sdlc" class="text-2xl font-extrabold">Cara saya memahami RPL</h2>
      <p class="mt-2 text-mute max-w-prose">Membuat perangkat lunak berjalan lewat enam tahap. Pilih tahap untuk melihat penjelasan dan contoh yang saya kerjakan.</p>

      <div class="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Tahapan pengembangan perangkat lunak">
        <button
          v-for="(t, i) in tahapan" :key="t.nama" type="button" role="tab"
          :aria-selected="aktif === i"
          @click="aktif = i"
          class="px-4 py-2 rounded-xl text-sm font-semibold border transition-colors"
          :class="aktif === i ? 'bg-brand text-brand-ink border-brand' : 'border-line text-mute hover:text-ink hover:border-brand'"
        >{{ i + 1 }}. {{ t.nama }}</button>
      </div>
      <div class="mt-4 rounded-2xl bg-surface border border-line p-6" role="tabpanel" aria-live="polite">
        <h3 class="text-xl font-bold">{{ tahapan[aktif].nama }}</h3>
        <p class="mt-2 max-w-prose">{{ tahapan[aktif].isi }}</p>
        <p class="mt-3 text-sm text-mute">Contoh: {{ tahapan[aktif].contoh }}</p>
      </div>
    </section>

    <!-- Projek -->
    <section class="mt-20" aria-labelledby="h-projek">
      <h2 id="h-projek" class="text-2xl font-extrabold">Projek RPL</h2>
      <div class="mt-4 flex flex-wrap gap-2">
        <button
          v-for="c in kategoriList" :key="c" type="button" @click="filter = c"
          :aria-pressed="filter === c"
          class="px-3 py-1.5 rounded-full text-sm font-semibold border"
          :class="filter === c ? 'bg-ink text-bg border-ink' : 'border-line text-mute hover:border-ink'"
        >{{ c }}</button>
      </div>
      <ul class="mt-5 grid gap-3">
        <li v-for="p in tampil" :key="p.judul" class="group flex items-center gap-4 rounded-2xl bg-surface border border-line p-4 transition-all hover:border-brand/50">
          <PhotoSlot :src="p.foto || (p.file ? `/foto/projek-${p.file.split('.')[0]}.jpg` : '')" :label="p.jenis || 'Web'" class="shrink-0 size-14 rounded-xl" />
          <span class="shrink-0 size-12 grid place-items-center rounded-xl bg-brand/10 text-brand font-mono text-xs font-semibold">{{ p.jenis || 'Web' }}</span>
          <div class="min-w-0 flex-1">
            <h3 class="font-bold truncate">
              <a :href="p.link || (p.file ? `/projek/${p.file}` : '#')" target="_blank" rel="noopener noreferrer" class="hover:underline hover:text-brand transition-colors">
                {{ p.judul }}
              </a>
            </h3>
            <p class="text-sm text-mute truncate">
              <span class="font-medium text-ink">{{ p.kategori }}</span>
              <span v-if="p.deskripsi" class="hidden sm:inline"> · {{ p.deskripsi }}</span>
            </p>
          </div>
          <a
            :href="p.link || (p.file ? `/projek/${p.file}` : '#')"
            target="_blank"
            rel="noopener noreferrer"
            class="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand/10 border border-brand/20 text-brand text-sm font-semibold hover:bg-brand hover:text-brand-ink transition-colors"
          >
            <span>Buka Web</span>
            <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </li>
      </ul>
      <p class="mt-3 text-sm text-mute">Tautan dan detail projek dapat disesuaikan di file <code class="font-mono">app/utils/data.ts</code>.</p>
    </section>
  </div>
</template>
