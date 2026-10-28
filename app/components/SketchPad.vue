<script setup lang="ts">
const cv = ref<HTMLCanvasElement>()
const warna = ['#0E1A2B', '#E8542B', '#2456E8', '#1E9E6A', '#B03AB8', '#F2B705']
const dipilih = ref(warna[0])
const tebal = ref(6)
const tantangan = ref('')
const ide = ['Gambar logo untuk aplikasi impianmu', 'Gambar rumah dengan denahnya', 'Gambar alat musik favoritmu', 'Gambar robot yang membantu pelajar']
let c: CanvasRenderingContext2D, gambar = false
function reset() { c.fillStyle = '#fff'; c.fillRect(0, 0, cv.value!.width, cv.value!.height) }
onMounted(() => { const e = cv.value!; e.width = e.clientWidth; e.height = 300; c = e.getContext('2d')!; c.lineCap = 'round'; c.lineJoin = 'round'; reset() })
function pos(e: PointerEvent) { const r = cv.value!.getBoundingClientRect(); return [(e.clientX - r.left) * cv.value!.width / r.width, (e.clientY - r.top) * cv.value!.height / r.height] }
function mulai(e: PointerEvent) { gambar = true; cv.value!.setPointerCapture(e.pointerId); const [x, y] = pos(e); c.beginPath(); c.moveTo(x, y); c.lineTo(x + .1, y + .1); c.strokeStyle = dipilih.value; c.lineWidth = tebal.value; c.stroke() }
function gerak(e: PointerEvent) { if (!gambar) return; const [x, y] = pos(e); c.lineTo(x, y); c.strokeStyle = dipilih.value; c.lineWidth = tebal.value; c.stroke() }
function simpan() { const a = document.createElement('a'); a.download = 'gambar-saya.png'; a.href = cv.value!.toDataURL(); a.click() }
</script>

<template>
  <div class="rounded-3xl border border-line bg-surface p-5 sm:p-7">
    <h3 class="text-2xl font-extrabold">Papan gambar</h3>
    <p class="text-mute text-sm">Coba gambar langsung. Ini cara saya membuat sketsa awal tampilan aplikasi.</p>
    <div class="mt-4 flex flex-wrap items-center gap-3">
      <button v-for="w in warna" :key="w" type="button" @click="dipilih = w" :aria-label="`Warna ${w}`"
        class="size-8 rounded-full ring-offset-2 ring-offset-surface" :class="dipilih === w ? 'ring-2 ring-ink' : ''" :style="{ background: w }" />
      <input type="range" min="2" max="24" v-model.number="tebal" aria-label="Tebal kuas" class="w-28 accent-[var(--brand)]">
      <button type="button" @click="reset" class="px-3 py-1.5 rounded-lg border border-line text-sm font-semibold">Hapus</button>
      <button type="button" @click="simpan" class="px-3 py-1.5 rounded-lg border border-line text-sm font-semibold">Simpan PNG</button>
      <button type="button" @click="tantangan = ide[Math.floor(Math.random() * ide.length)]" class="px-3 py-1.5 rounded-lg bg-brand text-brand-ink text-sm font-semibold">Beri tantangan</button>
    </div>
    <p v-if="tantangan" class="mt-3 font-semibold" aria-live="polite">Tantangan: {{ tantangan }}</p>
    <canvas ref="cv" class="mt-4 w-full h-[300px] rounded-2xl border border-line touch-none cursor-crosshair"
      @pointerdown="mulai" @pointermove="gerak" @pointerup="gambar = false" @pointercancel="gambar = false" />
  </div>
</template>
