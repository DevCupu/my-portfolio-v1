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
      'I build AI-powered applications — integrating LLMs, RAG pipelines, and AI agents — on top of reliable backend systems.',
    'about.description':
      'AI Application Engineer who builds apps powered by LLMs — integrating ChatGPT, Gemini, and Claude, building RAG so AI can read documents, and creating AI agents that carry out tasks. Grounded in solid backend engineering: Laravel and Express.js APIs, database design (including vector databases), Docker, and deployment to AWS and GCP.',
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
      'Saya membangun aplikasi berbasis AI — integrasi LLM, RAG, dan AI agent — di atas sistem backend yang andal.',
    'about.description':
      'AI Application Engineer yang membangun aplikasi bertenaga LLM — mengintegrasikan ChatGPT, Gemini, dan Claude, membangun RAG agar AI bisa membaca dokumen, serta membuat AI agent yang menjalankan tugas. Didukung fondasi backend yang kuat: API Laravel dan Express.js, desain database (termasuk vector database), Docker, dan deployment ke AWS serta GCP.',
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
