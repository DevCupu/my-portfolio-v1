<script setup lang="ts">
const { isDark, toggle: toggleTheme, init: initTheme } = useTheme()
const { t, lang, setLang, init: initLang } = useLang()

const { data: featured } = await useAsyncData('home-projects', () =>
  queryCollection('projects').where('home', 'IS NOT NULL').all()
)
const featuredProjects = computed(() =>
  [...(featured.value ?? [])].sort((a, b) => (a.home?.order ?? 0) - (b.home?.order ?? 0))
)

const { data: allProjects } = await useAsyncData('all-projects-count', () =>
  queryCollection('projects').all()
)
const totalProjects = computed(() => allProjects.value?.length ?? 0)

// ---- Mobile menu ----
const mobileOpen = ref(false)
function closeMobileMenu() {
  mobileOpen.value = false
}

// ---- Header scroll state: shadow, progress bar, active nav link ----
const scrolled = ref(false)
const scrollProgress = ref(0)
const activeSection = ref('#home')
const navItems = [
  { href: '#home', key: 'nav.home' as const },
  { href: '#about', key: 'nav.about' as const },
  { href: '#work', key: 'nav.work' as const },
  { href: '#blog', key: 'nav.blog' as const },
  { href: '#contact', key: 'nav.contact' as const }
]

function onScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  scrolled.value = scrollTop > 20
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0

  let current = '#home'
  for (const item of navItems) {
    const el = document.querySelector(item.href)
    if (el instanceof HTMLElement && scrollTop >= el.offsetTop - 120) current = item.href
  }
  activeSection.value = current
}

// ---- Typewriter ----
const typewriterText = ref('')
const titles = [
  'AI Application Engineer — LLM, RAG & Agents',
  'Backend Engineer — Laravel, Node.js & Go'
]
function startTypewriter() {
  let titleIndex = 0
  let charIndex = 0
  let isDeleting = false
  const typeSpeed = 60
  const deleteSpeed = 30
  const delayBetween = 1400

  function tick() {
    const current = titles[titleIndex]
    if (isDeleting) {
      charIndex--
      typewriterText.value = current.substring(0, charIndex)
      if (charIndex === 0) {
        isDeleting = false
        titleIndex = (titleIndex + 1) % titles.length
        setTimeout(tick, typeSpeed)
      } else {
        setTimeout(tick, deleteSpeed + Math.random() * 20)
      }
    } else {
      charIndex++
      typewriterText.value = current.substring(0, charIndex)
      if (charIndex === current.length) {
        isDeleting = true
        setTimeout(tick, delayBetween)
      } else {
        setTimeout(tick, typeSpeed + Math.random() * 30)
      }
    }
  }
  tick()
}

// ---- Rotating role chip ----
const roles: [string, string][] = [
  ['cpu', 'AI Application Engineer'],
  ['server', 'Backend Engineer'],
  ['zap', 'LLM & RAG Builder']
]
const roleIndex = ref(0)
const roleSwap = ref(false)
function startRoleRotation() {
  setInterval(() => {
    roleSwap.value = true
    setTimeout(() => {
      roleIndex.value = (roleIndex.value + 1) % roles.length
      roleSwap.value = false
    }, 240)
  }, 2400)
}

onMounted(() => {
  initTheme()
  initLang()
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  startTypewriter()
  startRoleRotation()
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))

// ---- Tech stack marquee (each row duplicated for a seamless loop) ----
const stackRowA = [
  { icon: 'cpu', label: 'LLM APIs' },
  { icon: 'search', label: 'RAG' },
  { icon: 'zap', label: 'AI Agents' },
  { icon: 'link', label: 'LangChain' },
  { logo: '/images/tech/laravel.svg', label: 'Laravel 12' },
  { logo: '/images/tech/php.svg', label: 'PHP' },
  { logo: '/images/tech/livewire.svg', label: 'Livewire 3' },
  { logo: '/images/tech/nodejs.svg', label: 'Node.js' },
  { logo: '/images/tech/express.svg', label: 'Express.js' },
  { logo: '/images/tech/go.svg', label: 'Golang' },
  { logo: '/images/tech/gin.svg', label: 'Gin' },
  { logo: '/images/tech/python.svg', label: 'Python' },
  { icon: 'share-2', label: 'REST API' },
  { logo: '/images/tech/mysql.svg', label: 'MySQL' },
  { logo: '/images/tech/postgresql.svg', label: 'PostgreSQL' }
]
const stackRowB = [
  { logo: '/images/tech/docker.svg', label: 'Docker' },
  { logo: '/images/tech/aws.svg', label: 'AWS', wide: true },
  { logo: '/images/tech/googlecloud.svg', label: 'Google Cloud' },
  { logo: '/images/tech/googlecloud.svg', label: 'Cloud Run' },
  { logo: '/images/tech/firebase.svg', label: 'Firestore' },
  { logo: '/images/tech/mongodb.svg', label: 'MongoDB' },
  { logo: '/images/tech/fiber.svg', label: 'Fiber' },
  { logo: '/images/tech/vue.svg', label: 'Vue.js' },
  { logo: '/images/tech/tailwindcss.svg', label: 'Tailwind CSS' },
  { logo: '/images/tech/bootstrap.svg', label: 'Bootstrap' },
  { logo: '/images/tech/html5.svg', label: 'HTML5' },
  { logo: '/images/tech/css3.svg', label: 'CSS3' },
  { logo: '/images/tech/git.svg', label: 'Git' },
  { logo: '/images/tech/postman.svg', label: 'Postman' },
  { logo: '/images/tech/vite.svg', label: 'Vite' }
]
const totalTechs = stackRowA.length + stackRowB.length

// ---- Contact form ----
const form = reactive({ name: '', email: '', message: '' })
const sending = ref(false)
function submitForm() {
  if (!form.name || !form.email || !form.message) {
    alert('Please fill in all fields')
    return
  }
  sending.value = true
  setTimeout(() => {
    alert('Message sent successfully!')
    form.name = ''
    form.email = ''
    form.message = ''
    sending.value = false
  }, 1500)
}

useSeoMeta({
  title: 'Ibnu Tamiyya AlKharoni — AI Application Engineer',
  description: 'I build AI-powered applications — LLM integration, RAG, and AI agents — backed by solid backend engineering.'
})
</script>

<template>
  <div>
    <div id="scroll-progress" :style="{ width: `${scrollProgress}%` }" />

    <header
      id="header"
      class="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50 transition-all duration-500 dark:bg-[#0a0a0b]/80 dark:border-white/10"
      :class="{ 'shadow-sm': scrolled }"
    >
      <div class="max-w-6xl mx-auto px-6 lg:px-8">
        <div class="flex justify-between items-center py-2 sm:py-5">
          <a href="#home" class="flex items-center gap-2 text-base sm:text-lg font-semibold tracking-tight text-ink dark:text-white transition-all duration-300 hover:opacity-70">
            <span>Ib</span>
            <span class="text-accent dark:text-[#2997ff]">.</span>
          </a>

          <nav class="hidden md:flex space-x-10">
            <a
              v-for="item in navItems"
              :key="item.href"
              :href="item.href"
              class="text-sm text-gray-600 hover:text-ink dark:text-gray-400 dark:hover:text-white transition-colors nav-item"
              :class="{ 'active-link': activeSection === item.href }"
            >{{ t(item.key) }}</a>
            <NuxtLink to="/products" class="text-sm text-gray-600 hover:text-ink dark:text-gray-400 dark:hover:text-white transition-colors nav-item">Products</NuxtLink>
          </nav>

          <div class="flex items-center gap-3">
            <div class="hidden md:flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              <button type="button" class="lang-switch px-2 py-1 rounded-md hover:text-ink dark:hover:text-white transition-colors" @click="setLang('id')">ID</button>
              <span class="w-px h-3 bg-gray-300 dark:bg-white/20"></span>
              <button type="button" class="lang-switch px-2 py-1 rounded-md hover:text-ink dark:hover:text-white transition-colors" @click="setLang('en')">EN</button>
            </div>

            <button
              type="button"
              aria-label="Toggle dark mode"
              title="Toggle dark mode"
              class="theme-toggle relative w-8 h-8 sm:w-10 sm:h-10 grid place-items-center rounded-full border border-gray-200 text-gray-700 hover:text-ink hover:border-gray-300 dark:border-white/15 dark:text-gray-200 dark:hover:text-white transition-colors"
              @click="toggleTheme"
            >
              <svg class="icon-moon w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              <svg class="icon-sun w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4.5"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></svg>
            </button>

            <button id="mobile-menu-btn" class="md:hidden text-ink dark:text-white transition-all duration-300" @click="mobileOpen = !mobileOpen">
              <div class="hamburger flex flex-col gap-1" :class="{ active: mobileOpen }">
                <span></span><span></span><span></span>
              </div>
            </button>
          </div>
        </div>

        <div class="mobile-menu md:hidden border-t border-gray-100 dark:border-white/10 bg-white dark:bg-[#0a0a0b]" :class="{ open: mobileOpen }">
          <nav class="py-2">
            <div class="flex flex-col space-y-2.5">
              <a
                v-for="item in navItems"
                :key="item.href"
                :href="item.href"
                class="text-sm text-gray-600 hover:text-ink dark:text-gray-300 dark:hover:text-white transition-colors mobile-nav-item"
                @click="closeMobileMenu"
              >{{ t(item.key) }}</a>
              <NuxtLink to="/products" class="text-sm text-gray-600 hover:text-ink dark:text-gray-300 dark:hover:text-white transition-colors mobile-nav-item" @click="closeMobileMenu">Products</NuxtLink>
              <div class="flex items-center gap-3 pt-1">
                <span class="text-xs text-gray-500 dark:text-gray-400">Language</span>
                <button type="button" class="lang-switch text-xs px-2 py-1 rounded-md border border-gray-200 dark:border-white/15" @click="setLang('id')">ID</button>
                <button type="button" class="lang-switch text-xs px-2 py-1 rounded-md border border-gray-200 dark:border-white/15" @click="setLang('en')">EN</button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>

    <!-- Hero -->
    <section id="home" class="relative min-h-screen flex items-center bg-white dark:bg-[#0a0a0b] overflow-hidden pt-24 pb-16">
      <div class="hero-glow" aria-hidden="true"></div>

      <div class="relative w-full max-w-6xl mx-auto px-6 lg:px-8">
        <div class="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div class="text-center md:text-left order-2 md:order-1">
            <span class="hero-meta inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-parchment dark:bg-white/5 dark:ring-1 dark:ring-white/10 text-xs font-medium text-gray-600 dark:text-gray-300">
              Available for AI application &amp; backend projects
            </span>

            <h1 class="hero-text display text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.06] text-ink dark:text-white mb-3">
              Ibnu Tamiyya
            </h1>

            <p class="hero-subtitle text-xl md:text-2xl font-medium text-accent dark:text-[#2997ff] mb-4 min-h-[1.5em]">
              <span>{{ typewriterText }}</span>
            </p>

            <p class="hero-subtitle text-base md:text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto md:mx-0 leading-relaxed">
              {{ t('hero.subtitle') }}
            </p>

            <div class="hero-cta flex flex-wrap gap-3 justify-center md:justify-start mb-8">
              <a href="#work" class="btn-pill" v-magnetic>
                <Icon name="feather:layers" class="w-4 h-4" /> View my work
              </a>
              <a :href="asset('/Ibnu-Tamiyya-AlKharoni-CV.pdf')" target="_blank" rel="noopener" class="btn-ghost" v-magnetic>
                <Icon name="feather:download" class="w-4 h-4" /> Download CV
              </a>
            </div>

            <div class="hero-cta flex items-center gap-4 justify-center md:justify-start">
              <a href="https://github.com/DevCupu" target="_blank" rel="noopener" aria-label="GitHub" class="hero-social w-10 h-10 grid place-items-center rounded-full border border-gray-200 text-gray-600 hover:text-ink hover:border-gray-300 dark:border-white/15 dark:text-gray-300 dark:hover:text-white transition-colors">
                <Icon name="feather:github" class="w-[18px] h-[18px]" />
              </a>
              <a href="https://www.linkedin.com/in/ibnu-tamiyya-al-kharoni-96b6a52a0/" target="_blank" rel="noopener" aria-label="LinkedIn" class="hero-social w-10 h-10 grid place-items-center rounded-full border border-gray-200 text-gray-600 hover:text-ink hover:border-gray-300 dark:border-white/15 dark:text-gray-300 dark:hover:text-white transition-colors">
                <Icon name="feather:linkedin" class="w-[18px] h-[18px]" />
              </a>
              <a href="mailto:ibnutamiyyaalkharoni@gmail.com" aria-label="Email" class="hero-social w-10 h-10 grid place-items-center rounded-full border border-gray-200 text-gray-600 hover:text-ink hover:border-gray-300 dark:border-white/15 dark:text-gray-300 dark:hover:text-white transition-colors">
                <Icon name="feather:mail" class="w-[18px] h-[18px]" />
              </a>
              <span class="hidden sm:flex items-center gap-1.5 text-sm text-gray-400 dark:text-gray-500 ml-1">
                <Icon name="feather:map-pin" class="w-4 h-4" /> Makassar, ID
              </span>
            </div>
          </div>

          <div class="hero-photo order-1 md:order-2 flex justify-center md:justify-end">
            <div class="hero-portrait">
              <img :src="asset('/images/ib.jpeg')" alt="Portrait of Ibnu Tamiyya AlKharoni" class="hero-portrait__img" />
              <div class="hero-portrait__chip" :class="{ 'role-swap': roleSwap }">
                <Icon :name="`feather:${roles[roleIndex][0]}`" class="w-4 h-4" />
                <span>{{ roles[roleIndex][1] }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a href="#stack" class="scroll-cue" aria-label="Scroll down">
        <span>Scroll</span>
        <Icon name="feather:chevron-down" class="w-4 h-4" />
      </a>
    </section>

    <!-- Statistics -->
    <section class="py-14 bg-white dark:bg-[#0a0a0b] border-b border-gray-100 dark:border-white/10">
      <div v-reveal class="fade-in max-w-3xl mx-auto px-6 lg:px-8 grid grid-cols-2 gap-8">
        <StatCounter :target="totalProjects" suffix="+" label="Projects shipped" />
        <StatCounter :target="totalTechs" suffix="+" label="Technologies used" />
      </div>
    </section>

    <!-- Tech Stack -->
    <section id="stack" class="stack-section relative py-20 md:py-28 bg-parchment dark:bg-[#0b0b0c] border-y border-gray-100 dark:border-white/10 overflow-hidden">
      <div class="stack-glow" aria-hidden="true"></div>

      <div v-reveal class="relative max-w-3xl mx-auto px-6 lg:px-8 text-center mb-12 fade-in">
        <p class="flex items-center justify-center gap-2 text-sm uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-4">
          <Icon name="feather:cpu" class="w-4 h-4" /> My tech stack
        </p>
        <h2 class="display text-3xl md:text-5xl text-ink dark:text-white mb-4">Tools I build with</h2>
        <p class="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
          A toolkit for building AI-powered applications — LLM integration, RAG, and agents — backed by solid backend, database, and cloud deployment skills.
        </p>
      </div>

      <div class="relative marquee marquee--ltr mb-4">
        <div class="marquee__track">
          <span v-for="(tech, i) in [...stackRowA, ...stackRowA]" :key="`a${i}`" class="tech-chip">
            <img v-if="tech.logo" class="tech-logo" :src="asset(tech.logo)" alt="" />
            <Icon v-else :name="`feather:${tech.icon}`" class="tech-logo-glyph" />
            {{ tech.label }}
          </span>
        </div>
      </div>
      <div class="relative marquee marquee--rtl mb-14">
        <div class="marquee__track">
          <span v-for="(tech, i) in [...stackRowB, ...stackRowB]" :key="`b${i}`" class="tech-chip">
            <img class="tech-logo" :class="{ 'tech-logo--wide': tech.wide }" :src="asset(tech.logo)" alt="" />
            {{ tech.label }}
          </span>
        </div>
      </div>

      <div class="relative max-w-6xl mx-auto px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div v-reveal class="stack-card fade-in stagger-1">
          <div class="stack-card__head">
            <span class="stack-card__icon" style="--c:#8B5CF6"><Icon name="feather:cpu" /></span>
            <h3>AI &amp; LLM</h3>
          </div>
          <div class="stack-card__list">
            <span class="stack-pill"><Icon name="feather:cpu" />LLM Integration</span>
            <span class="stack-pill"><Icon name="feather:search" />RAG</span>
            <span class="stack-pill"><Icon name="feather:zap" />AI Agents</span>
            <span class="stack-pill"><Icon name="feather:link" />LangChain</span>
            <span class="stack-pill"><Icon name="feather:edit-3" />Prompt Engineering</span>
            <span class="stack-pill"><Icon name="feather:database" />Vector Database</span>
          </div>
        </div>

        <div v-reveal class="stack-card fade-in stagger-2">
          <div class="stack-card__head">
            <span class="stack-card__icon" style="--c:#FF2D20"><Icon name="feather:server" /></span>
            <h3>Backend</h3>
          </div>
          <div class="stack-card__list">
            <span class="stack-pill"><img :src="asset('/images/tech/laravel.svg')" alt="">Laravel</span>
            <span class="stack-pill"><img :src="asset('/images/tech/nodejs.svg')" alt="">Node.js</span>
            <span class="stack-pill"><img :src="asset('/images/tech/express.svg')" alt="">Express</span>
            <span class="stack-pill"><img :src="asset('/images/tech/go.svg')" alt="">Go</span>
            <span class="stack-pill"><img :src="asset('/images/tech/gin.svg')" alt="">Gin</span>
            <span class="stack-pill"><img :src="asset('/images/tech/fiber.svg')" alt="">Fiber</span>
            <span class="stack-pill"><img :src="asset('/images/tech/python.svg')" alt="">Python</span>
            <span class="stack-pill"><img :src="asset('/images/tech/php.svg')" alt="">PHP</span>
          </div>
        </div>

        <div v-reveal class="stack-card fade-in stagger-3">
          <div class="stack-card__head">
            <span class="stack-card__icon" style="--c:#06B6D4"><Icon name="feather:layout" /></span>
            <h3>Frontend</h3>
          </div>
          <div class="stack-card__list">
            <span class="stack-pill"><img :src="asset('/images/tech/vue.svg')" alt="">Vue.js</span>
            <span class="stack-pill"><img :src="asset('/images/tech/livewire.svg')" alt="">Livewire</span>
            <span class="stack-pill"><img :src="asset('/images/tech/tailwindcss.svg')" alt="">Tailwind</span>
            <span class="stack-pill"><img :src="asset('/images/tech/bootstrap.svg')" alt="">Bootstrap</span>
            <span class="stack-pill"><img :src="asset('/images/tech/html5.svg')" alt="">HTML</span>
            <span class="stack-pill"><img :src="asset('/images/tech/css3.svg')" alt="">CSS</span>
            <span class="stack-pill"><img :src="asset('/images/tech/vite.svg')" alt="">Vite</span>
          </div>
        </div>

        <div v-reveal class="stack-card fade-in stagger-4">
          <div class="stack-card__head">
            <span class="stack-card__icon" style="--c:#4479A1"><Icon name="feather:database" /></span>
            <h3>Database</h3>
          </div>
          <div class="stack-card__list">
            <span class="stack-pill"><img :src="asset('/images/tech/mysql.svg')" alt="">MySQL</span>
            <span class="stack-pill"><img :src="asset('/images/tech/postgresql.svg')" alt="">PostgreSQL</span>
            <span class="stack-pill"><img :src="asset('/images/tech/mongodb.svg')" alt="">MongoDB</span>
            <span class="stack-pill"><img :src="asset('/images/tech/firebase.svg')" alt="">Firestore</span>
          </div>
        </div>

        <div v-reveal class="stack-card fade-in stagger-5">
          <div class="stack-card__head">
            <span class="stack-card__icon" style="--c:#2496ED"><Icon name="feather:cloud" /></span>
            <h3>Cloud &amp; DevOps</h3>
          </div>
          <div class="stack-card__list">
            <span class="stack-pill"><img :src="asset('/images/tech/docker.svg')" alt="">Docker</span>
            <span class="stack-pill"><img :src="asset('/images/tech/aws.svg')" alt="">AWS</span>
            <span class="stack-pill"><img :src="asset('/images/tech/googlecloud.svg')" alt="">GCP</span>
            <span class="stack-pill"><img :src="asset('/images/tech/git.svg')" alt="">Git</span>
            <span class="stack-pill"><img :src="asset('/images/tech/postman.svg')" alt="">Postman</span>
          </div>
        </div>
      </div>
    </section>

    <!-- About -->
    <section id="about" class="about-tile relative py-24 md:py-32 overflow-hidden">
      <div class="relative max-w-5xl mx-auto px-6 lg:px-8">
        <div class="grid md:grid-cols-5 gap-12 md:gap-16 items-center">
          <div v-reveal class="fade-in-left md:col-span-2 flex justify-center md:justify-start">
            <div class="w-56 h-72 md:w-full md:h-96 rounded-2xl overflow-hidden ring-1 ring-gray-200 dark:ring-white/10 shadow-lg">
              <img :src="asset('/images/ib.jpeg')" alt="Portrait of Ibnu Tamiyya AlKharoni" loading="lazy" class="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
          </div>

          <div v-reveal class="fade-in-right md:col-span-3">
            <p class="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-3">
              <Icon name="feather:user" class="w-4 h-4" /> About me
            </p>
            <h2 class="display text-3xl md:text-4xl text-ink dark:text-white mb-6">{{ t('section.about') }}</h2>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-10 text-lg">
              {{ t('about.description') }}
            </p>

            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div v-reveal class="fade-in stagger-1">
                <h4 class="flex items-center gap-2 text-sm font-semibold text-ink dark:text-white mb-3">
                  <Icon name="feather:cpu" class="w-4 h-4 text-accent" /> AI &amp; LLM
                </h4>
                <div class="flex flex-wrap gap-2 text-xs">
                  <span class="skill-tag bg-white border border-gray-200 text-gray-700 dark:bg-white/5 dark:border-white/10 dark:text-gray-300 px-2.5 py-1 rounded-full">LLM Integration</span>
                  <span class="skill-tag bg-white border border-gray-200 text-gray-700 dark:bg-white/5 dark:border-white/10 dark:text-gray-300 px-2.5 py-1 rounded-full">RAG</span>
                  <span class="skill-tag bg-white border border-gray-200 text-gray-700 dark:bg-white/5 dark:border-white/10 dark:text-gray-300 px-2.5 py-1 rounded-full">AI Agents</span>
                  <span class="skill-tag bg-white border border-gray-200 text-gray-700 dark:bg-white/5 dark:border-white/10 dark:text-gray-300 px-2.5 py-1 rounded-full">Prompt Engineering</span>
                </div>
              </div>
              <div v-reveal class="fade-in stagger-2">
                <h4 class="flex items-center gap-2 text-sm font-semibold text-ink dark:text-white mb-3">
                  <Icon name="feather:monitor" class="w-4 h-4 text-accent" /> Frontend
                </h4>
                <div class="flex flex-wrap gap-2 text-xs">
                  <span class="skill-tag bg-white border border-gray-200 text-gray-700 dark:bg-white/5 dark:border-white/10 dark:text-gray-300 px-2.5 py-1 rounded-full">Tailwind CSS</span>
                  <span class="skill-tag bg-white border border-gray-200 text-gray-700 dark:bg-white/5 dark:border-white/10 dark:text-gray-300 px-2.5 py-1 rounded-full">Livewire 3</span>
                  <span class="skill-tag bg-white border border-gray-200 text-gray-700 dark:bg-white/5 dark:border-white/10 dark:text-gray-300 px-2.5 py-1 rounded-full">Bootstrap 5</span>
                </div>
              </div>
              <div v-reveal class="fade-in stagger-3">
                <h4 class="flex items-center gap-2 text-sm font-semibold text-ink dark:text-white mb-3">
                  <Icon name="feather:server" class="w-4 h-4 text-accent" /> Backend
                </h4>
                <div class="flex flex-wrap gap-2 text-xs">
                  <span class="skill-tag bg-white border border-gray-200 text-gray-700 dark:bg-white/5 dark:border-white/10 dark:text-gray-300 px-2.5 py-1 rounded-full">Laravel 12</span>
                  <span class="skill-tag bg-white border border-gray-200 text-gray-700 dark:bg-white/5 dark:border-white/10 dark:text-gray-300 px-2.5 py-1 rounded-full">Node.js</span>
                  <span class="skill-tag bg-white border border-gray-200 text-gray-700 dark:bg-white/5 dark:border-white/10 dark:text-gray-300 px-2.5 py-1 rounded-full">Go</span>
                  <span class="skill-tag bg-white border border-gray-200 text-gray-700 dark:bg-white/5 dark:border-white/10 dark:text-gray-300 px-2.5 py-1 rounded-full">MySQL</span>
                  <span class="skill-tag bg-white border border-gray-200 text-gray-700 dark:bg-white/5 dark:border-white/10 dark:text-gray-300 px-2.5 py-1 rounded-full">PostgreSQL</span>
                </div>
              </div>
              <div v-reveal class="fade-in stagger-4">
                <h4 class="flex items-center gap-2 text-sm font-semibold text-ink dark:text-white mb-3">
                  <Icon name="feather:tool" class="w-4 h-4 text-accent" /> Tools
                </h4>
                <div class="flex flex-wrap gap-2 text-xs">
                  <span class="skill-tag bg-white border border-gray-200 text-gray-700 dark:bg-white/5 dark:border-white/10 dark:text-gray-300 px-2.5 py-1 rounded-full">Git</span>
                  <span class="skill-tag bg-white border border-gray-200 text-gray-700 dark:bg-white/5 dark:border-white/10 dark:text-gray-300 px-2.5 py-1 rounded-full">Docker</span>
                  <span class="skill-tag bg-white border border-gray-200 text-gray-700 dark:bg-white/5 dark:border-white/10 dark:text-gray-300 px-2.5 py-1 rounded-full">AWS</span>
                  <span class="skill-tag bg-white border border-gray-200 text-gray-700 dark:bg-white/5 dark:border-white/10 dark:text-gray-300 px-2.5 py-1 rounded-full">GCP</span>
                  <span class="skill-tag bg-white border border-gray-200 text-gray-700 dark:bg-white/5 dark:border-white/10 dark:text-gray-300 px-2.5 py-1 rounded-full">Postman</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Work -->
    <section id="work" class="py-24 md:py-32 bg-white dark:bg-[#0a0a0b]">
      <div class="max-w-5xl mx-auto px-6 lg:px-8">
        <div v-reveal class="fade-in mb-14">
          <p class="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-3">
            <Icon name="feather:folder" class="w-4 h-4" /> Selected work
          </p>
          <h2 class="display text-3xl md:text-5xl text-ink dark:text-white">{{ t('section.work') }}</h2>
        </div>

        <ProjectCarousel
          :projects="featuredProjects.map((project) => ({
            slug: project.path?.split('/').pop() ?? '',
            title: project.home!.title,
            summary: project.home!.summary,
            description: project.home!.description,
            tags: project.home!.tags,
            image: project.home!.image,
            github: project.github
          }))"
        />

        <div v-reveal class="mt-14 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center fade-in">
          <p class="text-sm text-gray-500 dark:text-gray-400">Masih banyak project lain — lihat daftar lengkapnya.</p>
          <NuxtLink to="/projects" class="btn-ghost">
            <Icon name="feather:grid" class="w-4 h-4" /> More projects
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Blog -->
    <section id="blog" class="py-24 md:py-32 bg-parchment dark:bg-[#0f0f10]">
      <div class="max-w-4xl mx-auto px-6 lg:px-8">
        <div v-reveal class="fade-in mb-14">
          <p class="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-3">
            <Icon name="feather:cloud" class="w-4 h-4" /> Notes
          </p>
          <h2 class="display text-3xl md:text-5xl text-ink dark:text-white">Cloud &amp; Deployment Notes</h2>
        </div>
        <div class="space-y-4">
          <article v-reveal class="project-card fade-in stagger-1 bg-white dark:bg-[#141416] rounded-2xl border border-gray-100 dark:border-white/10 p-7">
            <div class="grid md:grid-cols-4 gap-4 md:gap-8">
              <time class="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                <Icon name="feather:calendar" class="w-4 h-4" /> Jan 15, 2026
              </time>
              <div class="md:col-span-3">
                <h3 class="flex items-center gap-1.5 text-lg font-semibold text-ink dark:text-white mb-2">
                  Mendeploy REST API ke Google Cloud Run
                  <Icon name="feather:arrow-right" class="blog-arrow w-4 h-4" />
                </h3>
                <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Catatan singkat membungkus backend Express.js ke dalam container, mengkonfigurasi environment, lalu
                  mendeploy ke Cloud Run agar bisa diakses tim lain dengan URL yang stabil dan aman.
                </p>
              </div>
            </div>
          </article>
          <article v-reveal class="project-card fade-in stagger-2 bg-white dark:bg-[#141416] rounded-2xl border border-gray-100 dark:border-white/10 p-7">
            <div class="grid md:grid-cols-4 gap-4 md:gap-8">
              <time class="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                <Icon name="feather:calendar" class="w-4 h-4" /> Jan 10, 2026
              </time>
              <div class="md:col-span-3">
                <h3 class="flex items-center gap-1.5 text-lg font-semibold text-ink dark:text-white mb-2">
                  Menyusun Arsitektur Backend yang Cloud-ready
                  <Icon name="feather:arrow-right" class="blog-arrow w-4 h-4" />
                </h3>
                <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Bagaimana saya memisahkan layer bisnis, konfigurasi, dan koneksi database sehingga backend lebih mudah
                  dipindahkan antar environment — local, staging, hingga production di cloud.
                </p>
              </div>
            </div>
          </article>
          <article v-reveal class="project-card fade-in stagger-3 bg-white dark:bg-[#141416] rounded-2xl border border-gray-100 dark:border-white/10 p-7">
            <div class="grid md:grid-cols-4 gap-4 md:gap-8">
              <time class="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                <Icon name="feather:calendar" class="w-4 h-4" /> Jan 5, 2026
              </time>
              <div class="md:col-span-3">
                <h3 class="flex items-center gap-1.5 text-lg font-semibold text-ink dark:text-white mb-2">
                  Pengalaman Menggunakan Cloud Services di Project Bangkit
                  <Icon name="feather:arrow-right" class="blog-arrow w-4 h-4" />
                </h3>
                <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Ringkasan memakai layanan GCP (Cloud Run, Firestore, Cloud Storage) untuk mendukung aplikasi Anem.ai —
                  dari konfigurasi awal hingga monitoring sederhana agar layanan tetap sehat.
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section id="contact" class="py-24 md:py-32 bg-white dark:bg-[#0a0a0b]">
      <div class="max-w-4xl mx-auto px-6 lg:px-8">
        <div class="grid md:grid-cols-2 gap-16">
          <div v-reveal class="fade-in-left">
            <p class="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-3">
              <Icon name="feather:message-circle" class="w-4 h-4" /> Contact
            </p>
            <h2 class="display text-3xl md:text-5xl text-ink dark:text-white mb-6">Get in touch</h2>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-10 text-lg">
              I'm always interested in hearing about new projects and opportunities.
            </p>
            <div class="space-y-6">
              <div v-reveal class="fade-in stagger-1">
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1.5">
                  <Icon name="feather:mail" class="w-4 h-4" /> Email
                </p>
                <a href="mailto:ibnutamiyyaalkharoni@gmail.com" class="flex items-center gap-2 text-ink dark:text-white hover:text-accent dark:hover:text-[#2997ff] transition-colors">
                  ibnutamiyyaalkharoni@gmail.com
                </a>
              </div>
              <div v-reveal class="fade-in stagger-2">
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1.5">
                  <Icon name="feather:map-pin" class="w-4 h-4" /> Location
                </p>
                <p class="text-ink dark:text-white">Makassar, Indonesia</p>
              </div>
            </div>
          </div>
          <div v-reveal class="fade-in-right">
            <form class="space-y-6" @submit.prevent="submitForm">
              <input v-model="form.name" type="text" placeholder="Name" class="w-full px-0 py-3 border-0 bg-transparent placeholder-gray-400 dark:text-white dark:placeholder-gray-500 form-input" />
              <input v-model="form.email" type="email" placeholder="Email" class="w-full px-0 py-3 border-0 bg-transparent placeholder-gray-400 dark:text-white dark:placeholder-gray-500 form-input" />
              <textarea v-model="form.message" rows="4" placeholder="Message" class="w-full px-0 py-3 border-0 bg-transparent placeholder-gray-400 dark:text-white dark:placeholder-gray-500 resize-none form-input"></textarea>
              <button type="submit" class="btn-pill" :disabled="sending" v-magnetic>
                <Icon name="feather:send" class="w-4 h-4" /> {{ sending ? 'Sending...' : 'Send message' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <footer class="py-14 bg-parchment dark:bg-[#0f0f10] border-t border-gray-200 dark:border-white/10">
      <div class="max-w-5xl mx-auto px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <p class="text-sm text-gray-500 dark:text-gray-400">© 2026 Ibnu Tamiyya AlKharoni</p>
          <div class="flex space-x-8">
            <a href="https://github.com/DevCupu" target="_blank" rel="noopener" class="flex items-center gap-2 text-sm text-gray-500 hover:text-ink dark:text-gray-400 dark:hover:text-white transition-colors social-link">
              <Icon name="feather:github" class="w-4 h-4" /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/ibnu-tamiyya-al-kharoni-96b6a52a0/" target="_blank" rel="noopener" class="flex items-center gap-2 text-sm text-gray-500 hover:text-ink dark:text-gray-400 dark:hover:text-white transition-colors social-link">
              <Icon name="feather:linkedin" class="w-4 h-4" /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
