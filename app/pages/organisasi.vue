<script setup lang="ts">
usePageSeo(
  'Organisasi dan Instansi',
  `Organisasi, ekstrakurikuler, dan instansi tempat ${profile.nama} pernah belajar dan berkegiatan.`,
  '/organisasi'
)
const filter = ref('Semua')
const tampil = computed(() => filter.value === 'Semua' ? organisasi : organisasi.filter(o => o.jenis === filter.value))
const buka = ref<{ src: string; label: string } | null>(null)
</script>

<template>
  <div class="mx-auto max-w-5xl px-5 pt-14">
    <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight">Organisasi dan instansi</h1>
    <p class="mt-3 text-mute max-w-prose">Membuat aplikasi hampir selalu kerja tim. Di sinilah saya belajar bekerja sama, bertanggung jawab, dan tampil di depan orang.</p>

    <div class="mt-6 flex flex-wrap gap-2">
      <button v-for="f in ['Semua', 'Organisasi', 'Instansi']" :key="f" type="button" @click="filter = f" :aria-pressed="filter === f"
        class="px-3 py-1.5 rounded-full text-sm font-semibold border" :class="filter === f ? 'bg-ink text-bg border-ink' : 'border-line text-mute hover:border-ink'">{{ f }}</button>
    </div>

    <ol class="mt-10 border-l-2 border-line ml-2">
      <li v-for="o in tampil" :key="o.id" class="relative pl-8 pb-14 last:pb-0">
        <span class="absolute -left-[9px] top-1.5 size-4 rounded-full ring-4 ring-bg" :class="o.status === 'Aktif' ? 'bg-[#1E9E6A]' : 'bg-brand'" />
        <div class="grid md:grid-cols-5 gap-6">
          <PhotoSlot :src="o.foto?.[0] || `/foto/org-${o.id}-1.jpg`" :label="o.nama" class="md:col-span-2 aspect-[4/3] rounded-2xl" />
          <div class="md:col-span-3">
            <p class="text-sm font-semibold text-brand">{{ o.periode }} &middot; {{ o.status }} &middot; {{ o.jenis }}</p>
            <h2 class="mt-1 text-2xl font-extrabold tracking-tight">{{ o.nama }}</h2>
            <p class="font-semibold">{{ o.peran }}</p>
            <p class="mt-2 text-mute max-w-prose">{{ o.isi }}</p>
            <ul class="mt-3 space-y-1">
              <li v-for="k in o.kegiatan" :key="k" class="flex gap-3"><span class="mt-2.5 size-1.5 rounded-full bg-brand shrink-0" />{{ k }}</li>
            </ul>
            <div class="mt-4 grid grid-cols-3 gap-2">
              <button v-for="n in 3" :key="n" type="button" class="rounded-xl overflow-hidden hover:ring-2 ring-brand" :aria-label="`Perbesar foto ${n} ${o.nama}`"
                @click="buka = { src: o.foto?.[n - 1] || `/foto/org-${o.id}-${n}.jpg`, label: o.nama }">
                <PhotoSlot :src="o.foto?.[n - 1] || `/foto/org-${o.id}-${n}.jpg`" :label="`${o.nama} ${n}`" class="aspect-square pointer-events-none" />
              </button>
            </div>
          </div>
        </div>
      </li>
    </ol>

    <div v-if="buka" class="fixed inset-0 z-50 bg-black/85 grid place-items-center p-4" @click="buka = null" role="dialog" aria-modal="true" :aria-label="`Foto ${buka.label}`">
      <PhotoSlot :src="buka.src" :label="buka.label" class="w-full max-w-3xl aspect-[4/3] rounded-2xl" />
      <button type="button" class="absolute top-4 right-5 text-white font-semibold" @click="buka = null">Tutup</button>
    </div>
  </div>
</template>
