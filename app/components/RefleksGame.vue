<script setup lang="ts">
const st = ref<'diam' | 'tunggu' | 'ayo' | 'awal' | 'hasil'>('diam')
const ms = ref(0)
const terbaik = ref(0)
let t0 = 0, to: any
function klik() {
  if (st.value === 'tunggu') { clearTimeout(to); st.value = 'awal'; return }
  if (st.value === 'ayo') {
    ms.value = Math.round(performance.now() - t0)
    terbaik.value = terbaik.value ? Math.min(terbaik.value, ms.value) : ms.value
    st.value = 'hasil'; return
  }
  st.value = 'tunggu'
  to = setTimeout(() => { st.value = 'ayo'; t0 = performance.now() }, 1000 + Math.random() * 2500)
}
const predikat = computed(() => ms.value < 200 ? 'Secepat atlet sprint' : ms.value < 300 ? 'Refleks bagus' : 'Masih bisa dilatih')
onBeforeUnmount(() => clearTimeout(to))
</script>

<template>
  <div class="rounded-3xl border border-line bg-surface p-5 sm:p-7">
    <h3 class="text-2xl font-extrabold">Tes refleks</h3>
    <p class="text-mute text-sm">Olahraga melatih reaksi cepat. Tunggu layar hijau, lalu klik secepatnya.</p>
    <button type="button" @click="klik" class="mt-4 w-full h-56 rounded-2xl text-white text-xl font-bold px-4 transition-colors"
      :class="st === 'tunggu' ? 'bg-[#d64545]' : st === 'ayo' ? 'bg-[#1E9E6A]' : 'bg-[#2c3e5c]'">
      <template v-if="st === 'diam'">Klik untuk mulai</template>
      <template v-else-if="st === 'tunggu'">Tunggu hijau...</template>
      <template v-else-if="st === 'ayo'">KLIK SEKARANG</template>
      <template v-else-if="st === 'awal'">Terlalu cepat. Klik untuk coba lagi</template>
      <template v-else>{{ ms }} ms<span class="block text-sm font-normal">{{ predikat }}. Klik untuk ulang</span></template>
    </button>
    <p class="mt-3 text-sm text-mute">Terbaikmu: <b>{{ terbaik ? terbaik + ' ms' : '-' }}</b></p>
  </div>
</template>
