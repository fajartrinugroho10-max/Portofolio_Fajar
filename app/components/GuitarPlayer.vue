<script setup lang="ts">
// Gitar digital: suara dibuat langsung di browser (Karplus-Strong), tanpa file audio.
const keluarga: Record<string, string[]> = {
  C: ['C', 'Dm', 'Em', 'F', 'G', 'Am'], G: ['G', 'Am', 'Bm', 'C', 'D', 'Em'],
  D: ['D', 'Em', 'F#m', 'G', 'A', 'Bm'], A: ['A', 'Bm', 'C#m', 'D', 'E', 'F#m'],
  E: ['E', 'F#m', 'G#m', 'A', 'B', 'C#m']
}
// fret tiap senar dari E rendah ke e tinggi (-1 = tidak dipetik)
const bentuk: Record<string, number[]> = {
  C: [-1, 3, 2, 0, 1, 0], Dm: [-1, -1, 0, 2, 3, 1], Em: [0, 2, 2, 0, 0, 0], F: [1, 3, 3, 2, 1, 1],
  G: [3, 2, 0, 0, 0, 3], Am: [-1, 0, 2, 2, 1, 0], Bm: [-1, 2, 4, 4, 3, 2], D: [-1, -1, 0, 2, 3, 2],
  'F#m': [2, 4, 4, 2, 2, 2], A: [-1, 0, 2, 2, 2, 0], 'C#m': [-1, 4, 6, 6, 5, 4],
  E: [0, 2, 2, 1, 0, 0], 'G#m': [4, 6, 6, 4, 4, 4], B: [-1, 2, 4, 4, 4, 2]
}
const dasar = [82.41, 110, 146.83, 196, 246.94, 329.63]
const romawi = ['I', 'ii', 'iii', 'IV', 'V', 'vi']

const kunci = ref('C')
const daftar = computed(() => keluarga[kunci.value])
const mode = ref<'akustik' | 'elektrik'>('akustik')
const aktif = ref<string | null>(null)
const terakhir = ref('C')
const getar = ref(0)

let ctx: AudioContext | null = null
let bus: GainNode | null = null
const suara = new Set<{ g: GainNode; s: AudioBufferSourceNode }>()
const cache = new Map<string, AudioBuffer>()

function bangunBus() {
  const c = ctx!
  bus = c.createGain()
  const out = c.createGain()
  const lp = c.createBiquadFilter(); lp.type = 'lowpass'
  if (mode.value === 'elektrik') {
    const ws = c.createWaveShaper(); const k = new Float32Array(1024)
    for (let i = 0; i < 1024; i++) k[i] = Math.tanh((i / 512 - 1) * 6)
    ws.curve = k; ws.oversample = '4x'
    lp.frequency.value = 3200; out.gain.value = 0.45
    bus.connect(ws); ws.connect(lp)
  } else {
    const pk = c.createBiquadFilter(); pk.type = 'peaking'; pk.frequency.value = 220; pk.gain.value = 5
    lp.frequency.value = 6500; out.gain.value = 0.9
    bus.connect(pk); pk.connect(lp)
  }
  lp.connect(out); out.connect(c.destination)
}
function siap() {
  if (!ctx) ctx = new AudioContext()
  if (ctx.state === 'suspended') ctx.resume()
  if (!bus) bangunBus()
}
watch(mode, () => { if (ctx) bangunBus() })

function buffer(f: number) {
  const key = mode.value + f
  let b = cache.get(key)
  if (b) return b
  const sr = ctx!.sampleRate, N = Math.round(sr / f)
  const damp = mode.value === 'elektrik' ? 0.9989 : 0.9962
  const len = sr * 4
  b = ctx!.createBuffer(1, len, sr)
  const d = b.getChannelData(0), ring = new Float32Array(N)
  for (let i = 0; i < N; i++) ring[i] = Math.random() * 2 - 1
  for (let i = 0; i < len; i++) { const j = i % N; d[i] = ring[j]; ring[j] = damp * 0.5 * (ring[j] + ring[(j + 1) % N]) }
  cache.set(key, b)
  return b
}
function petik(c: string, turun: boolean, vel: number) {
  siap()
  const fr = bentuk[c], t = ctx!.currentTime
  const urut = turun ? [0, 1, 2, 3, 4, 5] : [5, 4, 3, 2, 1, 0]
  let k = 0
  for (const i of urut) {
    if (fr[i] < 0) continue
    const s = ctx!.createBufferSource(), g = ctx!.createGain()
    s.buffer = buffer(dasar[i] * Math.pow(2, fr[i] / 12))
    g.gain.setValueAtTime(vel * (1 - k * 0.04), t + k * 0.03)
    s.connect(g); g.connect(bus!)
    s.start(t + k * 0.03); s.stop(t + 4)
    const v = { g, s }; suara.add(v); s.onended = () => suara.delete(v)
    k++
  }
  getar.value++
}
function redam() {
  if (!ctx) return
  const t = ctx.currentTime
  suara.forEach(v => { v.g.gain.cancelScheduledValues(t); v.g.gain.setTargetAtTime(0, t, 0.1); try { v.s.stop(t + 0.7) } catch {} })
}

let timer: any, arah = false
function tekan(c: string) {
  if (aktif.value === c) return
  redam(); aktif.value = c; terakhir.value = c
  petik(c, true, 0.3); arah = false
  clearInterval(timer)
  // selama ditahan, chord terus dipetik naik-turun
  timer = setInterval(() => { petik(c, arah, 0.22); arah = !arah }, 520)
  if (game.main) cek(c)
}
function lepas() { clearInterval(timer); aktif.value = null; redam() }

// ---- gambar diagram chord ----
const fr = computed(() => bentuk[terakhir.value])
const basis = computed(() => {
  const f = fr.value.filter(x => x > 0)
  return Math.max(...f) <= 5 ? 1 : Math.min(...f)
})

// ---- game ----
const game = reactive({ main: false, sisa: 30, skor: 0, urutan: [] as string[], langkah: 0, rekor: 0, beruntun: 0 })
const pola = [[0, 4, 5, 3], [0, 5, 3, 4], [0, 3, 4, 3], [0, 4, 3, 4]]
let gt: any
function babak() { game.urutan = pola[Math.floor(Math.random() * pola.length)].map(i => daftar.value[i]); game.langkah = 0 }
function mulai() {
  game.main = true; game.sisa = 30; game.skor = 0; game.beruntun = 0; babak()
  clearInterval(gt); gt = setInterval(() => { if (--game.sisa <= 0) selesai() }, 1000)
}
function selesai() {
  clearInterval(gt); game.main = false
  if (game.skor > game.rekor) { game.rekor = game.skor; try { localStorage.rekorChord = String(game.rekor) } catch {} }
}
function cek(c: string) {
  if (c === game.urutan[game.langkah]) {
    if (++game.langkah >= 4) { game.beruntun++; game.skor += 10 + game.beruntun * 2; game.sisa = Math.min(45, game.sisa + 2); babak() }
  } else { game.beruntun = 0; game.langkah = 0 }
}
watch(kunci, () => { if (game.main) selesai() })

// ---- keyboard 1-6 ----
function down(e: KeyboardEvent) { const i = '123456'.indexOf(e.key); if (i >= 0 && !e.repeat) tekan(daftar.value[i]) }
function up(e: KeyboardEvent) { const i = '123456'.indexOf(e.key); if (i >= 0 && aktif.value === daftar.value[i]) lepas() }
onMounted(() => {
  try { game.rekor = Number(localStorage.rekorChord) || 0 } catch {}
  addEventListener('keydown', down); addEventListener('keyup', up)
})
onBeforeUnmount(() => { removeEventListener('keydown', down); removeEventListener('keyup', up); clearInterval(timer); clearInterval(gt); redam() })
</script>

<template>
  <div class="rounded-3xl bg-editor text-white p-5 sm:p-7">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h3 class="text-2xl font-extrabold">Gitar digital</h3>
        <p class="text-sm text-white/60 max-w-md">Tekan dan tahan chord, suaranya terus berbunyi selama kamu menahan. Di laptop bisa juga pakai tombol 1 sampai 6.</p>
      </div>
      <div class="flex rounded-xl bg-white/10 p-1" role="group" aria-label="Jenis gitar">
        <button v-for="m in ['akustik', 'elektrik']" :key="m" type="button" @click="mode = m as any"
          class="px-4 py-1.5 rounded-lg text-sm font-semibold capitalize" :class="mode === m ? 'bg-white text-black' : 'text-white/70'">{{ m }}</button>
      </div>
    </div>

    <div class="mt-5 flex flex-wrap items-center gap-2">
      <span class="text-sm text-white/60">Keluarga chord:</span>
      <button v-for="k in Object.keys(keluarga)" :key="k" type="button" @click="kunci = k"
        class="size-9 rounded-lg font-bold text-sm border" :class="kunci === k ? 'bg-[#E8542B] border-[#E8542B]' : 'border-white/20 text-white/70'">{{ k }}</button>
    </div>
    <p class="mt-1 text-xs text-white/50">Satu keluarga adalah kumpulan chord yang enak dibunyikan bersama dalam satu lagu.</p>

    <div class="mt-5 grid md:grid-cols-[220px_1fr] gap-6 items-center">
      <svg viewBox="0 0 170 200" class="w-full max-w-[220px] mx-auto text-white" role="img" :aria-label="`Diagram chord ${terakhir}`">
        <text x="85" y="10" text-anchor="middle" font-size="13" font-weight="700" fill="#ff9d7a">{{ terakhir }}</text>
        <rect x="20" y="30" width="122" :height="basis === 1 ? 5 : 1.5" fill="currentColor" />
        <line v-for="f in 5" :key="f" x1="20" x2="142" :y1="30 + f * 30" :y2="30 + f * 30" stroke="currentColor" opacity=".3" />
        <rect v-for="i in 6" :key="i + '-' + (fr[i - 1] >= 0 ? getar : 0)" :x="19 + (i - 1) * 24" y="30" width="2" height="150"
          fill="currentColor" :opacity="fr[i - 1] < 0 ? .15 : .8" :class="fr[i - 1] >= 0 && getar ? 'vibx' : ''" />
        <template v-for="i in 6" :key="'m' + i">
          <text v-if="fr[i - 1] < 0" :x="20 + (i - 1) * 24" y="22" text-anchor="middle" font-size="11" fill="currentColor" opacity=".6">x</text>
          <circle v-else-if="fr[i - 1] === 0" :cx="20 + (i - 1) * 24" cy="17" r="4" fill="none" stroke="currentColor" />
          <circle v-else :cx="20 + (i - 1) * 24" :cy="30 + (fr[i - 1] - basis + 0.5) * 30" r="9" fill="#E8542B" />
        </template>
        <text v-if="basis > 1" x="150" y="50" font-size="10" fill="currentColor" opacity=".7">fr{{ basis }}</text>
      </svg>

      <div class="grid grid-cols-3 gap-3">
        <button v-for="(c, i) in daftar" :key="c" type="button"
          @pointerdown.prevent="tekan(c)" @pointerup="lepas" @pointerleave="lepas" @pointercancel="lepas" @contextmenu.prevent
          class="touch-none select-none rounded-2xl py-6 text-center font-extrabold text-2xl border transition-transform"
          :class="aktif === c ? 'bg-[#E8542B] border-[#E8542B] scale-95' : 'bg-white/5 border-white/15 hover:bg-white/10'">
          {{ c }}<span class="block text-xs font-normal text-white/60">{{ romawi[i] }} &middot; tombol {{ i + 1 }}</span>
        </button>
      </div>
    </div>

    <div class="mt-7 rounded-2xl bg-white/5 p-4">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p class="font-bold">Game: ikuti progresi chord</p>
          <p class="text-sm text-white/60">Tekan chord sesuai urutan sebelum waktu habis. Satu urutan benar, waktu bertambah.</p>
        </div>
        <button type="button" @click="mulai" class="px-4 py-2 rounded-xl bg-white text-black font-semibold">{{ game.main ? 'Ulang' : 'Mulai' }}</button>
      </div>
      <div class="mt-3 flex flex-wrap gap-5 text-sm">
        <span>Waktu <b class="text-lg">{{ game.sisa }}</b></span>
        <span>Skor <b class="text-lg">{{ game.skor }}</b></span>
        <span>Beruntun <b class="text-lg">{{ game.beruntun }}</b></span>
        <span>Rekor <b class="text-lg">{{ game.rekor }}</b></span>
      </div>
      <div v-if="game.main" class="mt-3 flex gap-2" aria-live="polite">
        <span v-for="(c, i) in game.urutan" :key="i" class="px-4 py-2 rounded-xl font-bold border"
          :class="i < game.langkah ? 'bg-green-500/30 border-green-400' : i === game.langkah ? 'bg-[#E8542B] border-[#E8542B]' : 'border-white/20'">{{ c }}</span>
      </div>
      <p v-else-if="game.skor" class="mt-3 text-sm">Waktu habis. Skormu {{ game.skor }}.</p>
    </div>
  </div>
</template>
