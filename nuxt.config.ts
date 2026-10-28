import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },

  runtimeConfig: {
    public: { siteUrl: 'https://namakamu.vercel.app' } // ganti dengan domain asli
  },

  app: {
    head: {
      htmlAttrs: { lang: 'id' },
      titleTemplate: '%s | Portofolio RPL',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#2456E8' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;600;800&family=JetBrains+Mono:wght@400;600&display=swap'
        }
      ],
      script: [
        {
          // cegah kedipan saat mode gelap
          innerHTML:
            "try{var t=localStorage.theme;if(t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches)document.documentElement.classList.add('dark')}catch(e){}",
          tagPosition: 'head'
        }
      ]
    }
  },

  // SEO & kecepatan: semua halaman jadi HTML statis (pre-render)
  nitro: { prerender: { crawlLinks: true, routes: ['/'] } },
  routeRules: {
    '/**': { prerender: true },
    '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/projek/**': { headers: { 'cache-control': 'public, max-age=86400' } }
  }
})
