// https://nuxt.com/docs/api/configuration/nuxt-config
// ponytail: baseURL is a literal, not read from NUXT_APP_BASE_URL — that env-var
// override breaks Nitro's prerender crawler (it stops after 5 routes). If the repo
// is ever renamed, update this string.
const baseURL = '/my-portfolio-v1/'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@vueuse/nuxt'
  ],

  css: ['~/assets/css/main.css'],

  app: {
    baseURL,
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Ibnu Tamiyya AlKharoni — Backend Developer',
      link: [{ rel: 'icon', type: 'image/png', href: `${baseURL}images/i.png` }],
      bodyAttrs: {
        class: 'bg-white text-ink antialiased dark:bg-[#0a0a0b] dark:text-white transition-colors duration-500'
      },
      script: [
        {
          // Anti-flash: set theme class before first paint (ported from script.js)
          innerHTML: `(function(){try{var t=localStorage.getItem('theme');if(!t)t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}})();`,
          tagPosition: 'head'
        }
      ]
    }
  },

  icon: {
    collections: ['feather']
  }
})