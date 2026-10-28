<script setup lang="ts">
usePageSeo(
  'Hobi: Gitar, Olahraga, Seni, Sejarah',
  `Hobi ${profile.nama}: bermain gitar, olahraga, seni, dan sejarah, lengkap dengan game interaktif.`,
  '/hobi'
)
const id = ref('musik')
const h = computed(() => hobi.find(x => x.id === id.value)!)
</script>

<template>
  <div class="mx-auto max-w-5xl px-5 pt-14">
    <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight">Hobi saya</h1>
    <p class="mt-3 text-mute max-w-prose">Pilih satu hobi, lalu coba langsung. Setiap hobi punya permainan sendiri.</p>

    <div class="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Pilih hobi">
      <button v-for="x in hobi" :key="x.id" type="button" role="tab" :aria-selected="id === x.id" @click="id = x.id"
        class="px-5 py-2.5 rounded-xl font-semibold border transition-colors"
        :class="id === x.id ? 'text-white border-transparent' : 'border-line text-mute hover:text-ink'"
        :style="id === x.id ? { background: x.warna } : {}">{{ x.nama }}</button>
    </div>

    <section class="mt-5 rounded-3xl bg-surface border border-line overflow-hidden" role="tabpanel" aria-live="polite">
      <div class="h-2" :style="{ background: h.warna }" />
      <div class="p-6 sm:p-8 grid md:grid-cols-2 gap-8">
        <div>
          <h2 class="text-3xl font-extrabold tracking-tight">{{ h.judul }}</h2>
          <p class="mt-3 text-mute">{{ h.isi }}</p>
          <ul class="mt-5 space-y-2">
            <li v-for="p in h.poin" :key="p" class="flex gap-3"><span class="mt-2.5 size-2 rounded-full shrink-0" :style="{ background: h.warna }" />{{ p }}</li>
          </ul>
        </div>
        <div class="grid grid-cols-3 gap-2 content-start">
          <PhotoSlot v-for="n in 3" :key="id + n" :src="h.foto?.[n - 1] || `/foto/hobi-${id}-${n}.jpg`" :label="`${h.nama} ${n}`" class="aspect-square rounded-xl" :class="n === 1 ? 'col-span-3 !aspect-video' : ''" />
        </div>
      </div>
    </section>

    <div class="mt-6">
      <ClientOnly>
        <GuitarPlayer v-if="id === 'musik'" />
        <RefleksGame v-else-if="id === 'olahraga'" />
        <SketchPad v-else-if="id === 'seni'" />
        <SejarahQuiz v-else />
      </ClientOnly>
    </div>
  </div>
</template>
