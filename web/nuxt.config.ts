// https://nuxt.com/docs/api/configuration/nuxt-config
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
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Ibnu Tamiyya AlKharoni — Backend Developer',
      link: [{ rel: 'icon', type: 'image/png', href: '/images/i.png' }],
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