const translations = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.work': 'Work',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'section.about': 'About',
    'section.work': 'Featured Projects',
    'hero.subtitle':
      'I build reliable software systems and integrate AI where it adds practical value.',
    'about.description':
      'Software Engineer focused on backend systems, APIs, and practical product development. I also integrate AI capabilities such as document processing, LLM-powered workflows, and automation when they solve a clear business or operational need. My foundation includes Laravel and Express.js APIs, database design, Docker, and deployment to AWS and GCP.',
    'work.dante.title': 'Dante Pine Enrekang Tourism Platform',
    'work.dante.subtitle': 'Tourism platform with public landing page and admin portal.',
    'work.dante.description':
      'This Laravel 12 platform manages tourism content, activities, camping packages, café menu, and a centralized, facility-based booking system. Admins manage everything from the dashboard, while visitors book online.'
  },
  id: {
    'nav.home': 'Beranda',
    'nav.about': 'Tentang',
    'nav.work': 'Karya',
    'nav.blog': 'Blog',
    'nav.contact': 'Kontak',
    'section.about': 'Tentang',
    'section.work': 'Proyek Unggulan',
    'hero.subtitle':
      'Saya membangun sistem software yang andal dan mengintegrasikan AI ketika memang memberi nilai praktis.',
    'about.description':
      'Software Engineer yang fokus membangun sistem backend, API, dan produk yang siap dipakai. Saya juga mengintegrasikan kemampuan AI seperti pemrosesan dokumen, alur kerja berbasis LLM, dan otomasi ketika memang menyelesaikan kebutuhan bisnis atau operasional yang jelas. Fondasi saya mencakup API Laravel dan Express.js, desain database, Docker, serta deployment ke AWS dan GCP.',
    'work.dante.title': 'Platform Pariwisata Dante Pine Enrekang',
    'work.dante.subtitle': 'Platform pariwisata dengan landing page publik dan portal admin.',
    'work.dante.description':
      'Sistem Laravel 12 ini mengelola konten wisata, aktivitas, paket camping, menu kafe, serta sistem booking terpusat berbasis fasilitas. Admin mengatur semua data dari dashboard, sementara pengunjung memesan secara online.'
  }
} as const

export type LangKey = keyof (typeof translations)['en']

export function useLang() {
  const lang = useState<'en' | 'id'>('lang', () => 'en')

  function t(key: LangKey) {
    return translations[lang.value][key]
  }

  function setLang(next: 'en' | 'id') {
    lang.value = next
    if (import.meta.client) {
      try {
        localStorage.setItem('preferred_lang', next)
      } catch {}
    }
  }

  function init() {
    if (!import.meta.client) return
    try {
      const stored = localStorage.getItem('preferred_lang')
      if (stored === 'en' || stored === 'id') lang.value = stored
    } catch {}
  }

  return { lang, t, setLang, init }
}
