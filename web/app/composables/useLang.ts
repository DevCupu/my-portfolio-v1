const translations = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.work': 'Work',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'section.about': 'About',
    'section.work': 'Featured Projects',
    'hero.subtitle': 'I design and ship backend systems that are simple, scalable, and reliable.',
    'about.description':
      'Junior Backend Developer focused on building Laravel-based systems and JavaScript (Express.js) RESTful APIs. Experienced in database design, authentication, Docker, and deploying services to AWS and GCP. Currently learning Golang for scalable, high-performance backend architectures.',
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
    'hero.subtitle': 'Saya merancang dan membangun sistem backend yang sederhana, skalabel, dan andal.',
    'about.description':
      'Junior Backend Developer yang fokus membangun sistem berbasis Laravel dan RESTful API dengan JavaScript (Express.js). Berpengalaman dalam desain database, autentikasi, Docker, dan deployment layanan ke AWS dan GCP. Saat ini sedang mempelajari Golang untuk arsitektur backend yang skalabel dan high-performance.',
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
