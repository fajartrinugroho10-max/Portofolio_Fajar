<script setup lang="ts">
// Menampilkan foto dari /public atau URL luar.
// Jika file tidak ditemukan atau ekstensinya berbeda (.png / .jpeg / .webp / .jpg / .jpg.jpeg dll),
// komponen ini secara otomatis mencoba alternatif variasi nama file sebelum menampilkan placeholder.
const props = defineProps<{ src: string; label?: string }>()

const currentIndex = ref(0)
const candidates = ref<string[]>([])
const gagal = ref(false)
const img = ref<HTMLImageElement>()

function setupCandidates(srcUrl: string) {
  gagal.value = false
  currentIndex.value = 0
  if (!srcUrl) {
    candidates.value = []
    gagal.value = true
    return
  }

  const isHttp = srcUrl.startsWith('http://') || srcUrl.startsWith('https://')
  if (isHttp) {
    candidates.value = [srcUrl]
    return
  }

  const list: string[] = []
  const add = (url: string) => {
    if (!url) return
    if (!list.includes(url)) list.push(url)
    const encoded = encodeURI(url)
    if (encoded && !list.includes(encoded)) list.push(encoded)
  }

  // 1. Coba path persis aslinya
  add(srcUrl)

  // 2. Bersihkan nama dasar file (hapus ekstensi ganda atau spasi di ekstensi, misal .jpg.jpeg, .jpg .png, .jpeg, .png, dll)
  const cleanBase = srcUrl
    .replace(/\.(jpg|jpeg|png|webp|\s)+$/gi, '')
    .replace(/\.(jpg|jpeg|png|webp)$/gi, '')

  // 3. Coba variasi ekstensi umum
  const commonSuffixes = [
    '.jpg.jpeg',
    '.jpeg',
    '.jpg',
    '.png',
    '.jpg.png',
    '.jpg .png',
    '.webp',
    '.JPG',
    '.PNG',
    '.JPEG'
  ]

  for (const suf of commonSuffixes) {
    add(cleanBase + suf)
  }

  candidates.value = list
}

watch(() => props.src, (newVal) => {
  setupCandidates(newVal)
}, { immediate: true })

const currentSrc = computed(() => candidates.value[currentIndex.value] || props.src)

function handleImgError() {
  if (currentIndex.value < candidates.value.length - 1) {
    currentIndex.value++
  } else {
    gagal.value = true
  }
}

onMounted(() => {
  if (img.value && img.value.complete && img.value.naturalWidth === 0) {
    handleImgError()
  }
})

const hue = computed(() => {
  let h = 0
  for (const c of props.label || props.src || '') {
    h = (h * 31 + c.charCodeAt(0)) % 360
  }
  return h
})
</script>

<template>
  <div class="relative overflow-hidden bg-line">
    <img
      v-if="!gagal"
      ref="img"
      :src="currentSrc"
      :alt="label || ''"
      loading="lazy"
      @error="handleImgError"
      class="absolute inset-0 size-full object-cover"
    >
    <div
      v-else
      class="absolute inset-0 grid place-items-center p-3 text-center text-white select-none"
      :style="{ background: `linear-gradient(135deg, hsl(${hue} 70% 45%), hsl(${(hue + 50) % 360} 70% 28%))` }"
    >
      <div class="flex flex-col items-center gap-1">
        <svg class="size-6 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span class="text-xs font-bold leading-tight">{{ label || 'Foto Slot' }}</span>
        <span class="font-mono text-[10px] opacity-80 break-all max-w-[90%]">{{ src }}</span>
        <span class="text-[9px] opacity-70 mt-0.5">(taruh file di public/foto/ .jpg / .png / .webp)</span>
      </div>
    </div>
  </div>
</template>
