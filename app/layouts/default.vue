<script setup lang="ts">
const links = [
  { to: '/', label: 'Beranda' },
  { to: '/akademik', label: 'Akademik' },
  { to: '/organisasi', label: 'Organisasi' },
  { to: '/hobi', label: 'Hobi' }
]
const dark = ref(false)
onMounted(() => { dark.value = document.documentElement.classList.contains('dark') })
function toggle() {
  dark.value = !dark.value
  document.documentElement.classList.toggle('dark', dark.value)
  try { localStorage.theme = dark.value ? 'dark' : 'light' } catch {}
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <a href="#isi" class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 bg-brand text-brand-ink px-4 py-2 rounded-lg">Lewati ke isi</a>

    <header class="sticky top-0 z-40 backdrop-blur bg-bg/80 border-b border-line">
      <nav class="mx-auto max-w-5xl px-5 h-16 flex items-center justify-between" aria-label="Menu utama">
        <NuxtLink to="/" class="font-extrabold text-lg tracking-tight">{{ profile.nama.split(' ')[0] }}<span class="text-brand">.dev</span></NuxtLink>
        <div class="flex items-center gap-1">
          <NuxtLink
            v-for="l in links" :key="l.to" :to="l.to"
            class="px-2.5 sm:px-3 py-1.5 rounded-lg text-sm font-semibold text-mute hover:text-ink transition-colors"
            active-class="!text-brand-ink !bg-brand"
          >{{ l.label }}</NuxtLink>
          <button
            @click="toggle" type="button"
            class="ml-2 size-9 grid place-items-center rounded-lg border border-line hover:border-brand"
            :aria-label="dark ? 'Pakai mode terang' : 'Pakai mode gelap'"
          >{{ dark ? '☀' : '☾' }}</button>
        </div>
      </nav>
    </header>

    <main id="isi" class="flex-1"><slot /></main>

    <footer class="border-t border-line mt-20">
      <div class="mx-auto max-w-5xl px-5 py-10">
        <div class="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p class="font-extrabold text-lg">Mari terhubung</p>
            <p class="text-sm text-mute">Klik salah satu untuk membuka akun saya.</p>
          </div>
          <ul class="flex flex-wrap gap-3" aria-label="Media sosial">
            <li v-for="m in sosmed" :key="m.nama">
              <a :href="m.url" target="_blank" rel="noopener noreferrer"
                :aria-label="`${m.nama} (buka di tab baru)`" :title="m.nama" :style="{ '--c': m.warna }"
                class="group flex items-center gap-2 h-11 pl-3 pr-3 rounded-full border border-line bg-surface font-bold text-sm transition-all duration-200 hover:-translate-y-1 hover:border-transparent hover:bg-[var(--c)] hover:text-white hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                <span class="grid place-items-center size-6 rounded-full bg-[var(--c)] text-white text-[11px] group-hover:bg-white/25">{{ m.singkat }}</span>
                <span class="hidden sm:inline">{{ m.nama }}</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="mt-8 pt-6 border-t border-line text-sm text-mute flex flex-wrap gap-3 justify-between">
          <p>&copy; {{ new Date().getFullYear() }} {{ profile.nama }}, {{ profile.sekolah }}</p>
          <p>Dibuat dengan Nuxt 4 dan Tailwind CSS</p>
        </div>
      </div>
    </footer>
  </div>
</template>
