<script setup lang="ts">
// Ganti soal sesuai bahan sejarah favoritmu.
const soal = [
  { t: 'Sumpah Pemuda diikrarkan pada tahun?', o: ['1908', '1928', '1945', '1950'], b: 1, p: 'Kongres Pemuda II pada 28 Oktober 1928.' },
  { t: 'Siapa yang menjahit Bendera Pusaka Merah Putih?', o: ['Fatmawati', 'Kartini', 'Cut Nyak Dien', 'Dewi Sartika'], b: 0, p: 'Fatmawati menjahitnya di Jakarta, menjelang Proklamasi.' },
  { t: 'Konferensi Asia-Afrika 1955 diadakan di kota?', o: ['Jakarta', 'Yogyakarta', 'Bandung', 'Surabaya'], b: 2, p: 'Digelar di Gedung Merdeka, Bandung.' },
  { t: 'Kerajaan maritim besar di Sumatra pada abad ke-7 adalah?', o: ['Majapahit', 'Sriwijaya', 'Mataram', 'Samudra Pasai'], b: 1, p: 'Sriwijaya menguasai jalur perdagangan Selat Malaka.' }
]
const i = ref(0), skor = ref(0), pilih = ref<number | null>(null)
const selesai = computed(() => i.value >= soal.length)
function jawab(n: number) { if (pilih.value !== null) return; pilih.value = n; if (n === soal[i.value].b) skor.value++ }
function lanjut() { pilih.value = null; i.value++ }
function ulang() { i.value = 0; skor.value = 0; pilih.value = null }
</script>

<template>
  <div class="rounded-3xl border border-line bg-surface p-5 sm:p-7">
    <h3 class="text-2xl font-extrabold">Kuis sejarah Indonesia</h3>
    <div v-if="!selesai" class="mt-4">
      <p class="text-sm text-mute">Soal {{ i + 1 }} dari {{ soal.length }}</p>
      <p class="mt-1 text-lg font-bold">{{ soal[i].t }}</p>
      <div class="mt-4 grid sm:grid-cols-2 gap-3">
        <button v-for="(o, n) in soal[i].o" :key="o" type="button" @click="jawab(n)"
          class="text-left px-4 py-3 rounded-xl border font-semibold"
          :class="pilih === null ? 'border-line hover:border-brand' : n === soal[i].b ? 'border-[#1E9E6A] bg-[#1E9E6A]/15' : n === pilih ? 'border-[#d64545] bg-[#d64545]/15' : 'border-line opacity-60'">{{ o }}</button>
      </div>
      <div v-if="pilih !== null" class="mt-4" aria-live="polite">
        <p class="text-mute">{{ soal[i].p }}</p>
        <button type="button" @click="lanjut" class="mt-3 px-4 py-2 rounded-xl bg-brand text-brand-ink font-semibold">{{ i === soal.length - 1 ? 'Lihat skor' : 'Soal berikutnya' }}</button>
      </div>
    </div>
    <div v-else class="mt-4">
      <p class="text-4xl font-extrabold">{{ skor }} / {{ soal.length }}</p>
      <p class="text-mute">{{ skor === soal.length ? 'Sempurna.' : 'Coba lagi untuk skor lebih tinggi.' }}</p>
      <button type="button" @click="ulang" class="mt-3 px-4 py-2 rounded-xl border border-line font-semibold">Main lagi</button>
    </div>
  </div>
</template>
