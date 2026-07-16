<script setup lang="ts">
useHead({
  title: 'Ib - All Projects',
  bodyAttrs: { class: 'bg-white text-gray-900 dark:bg-[#0a0a0b] dark:text-white transition-colors duration-500 antialiased' }
})

const { data: projects } = await useAsyncData('all-projects', () => queryCollection('projects').all())

// Same order as the original hand-written listing page, with the two
// pages that used to be unreachable (complaint, gemini-chatbot-api)
// appended at the end so they're finally linked from somewhere.
const order = [
  'raudhah-manager', 'ai-express-ollama-rag-pdf',
  'maligo', 'eminent-lookbook', 'ocr-paspor-pro', 'e-warung', 'unm-administrasi-publik',
  'malimo-report', 'organization', 'tourism', 'pos', 'rental',
  'anemia-api', 'backend-inventory-express', 'gemini-ai-api',
  'complaint', 'gemini-chatbot-api'
]
const sortedProjects = computed(() =>
  [...(projects.value ?? [])].sort((a, b) => {
    const slugA = a.path?.split('/').pop() ?? ''
    const slugB = b.path?.split('/').pop() ?? ''
    return order.indexOf(slugA) - order.indexOf(slugB)
  })
)
</script>

<template>
  <div>
    <ProjectHeader variant="listing" />

    <main class="py-14 md:py-16">
      <div class="max-w-6xl mx-auto px-6 lg:px-8 space-y-10">
        <section v-reveal class="fade-in grid md:grid-cols-[1.2fr_0.8fr] gap-8 items-center bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-[#141416] dark:via-[#0f0f10] dark:to-[#141416] rounded-3xl border border-gray-100 dark:border-white/10 px-6 md:px-10 py-8 shadow-sm">
          <div class="space-y-4">
            <p class="text-xs font-semibold tracking-[0.14em] text-gray-500 dark:text-gray-400 uppercase">More projects</p>
            <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white leading-tight">Kumpulan project lain yang pernah saya garap</h1>
            <p class="text-gray-600 dark:text-gray-300 max-w-2xl">Pilihan proyek backend, fullstack, dan platform yang menunjukkan cara saya membangun produk yang siap dipakai: alur jelas, stack terukur, dan dokumentasi ringkas.</p>
            <div class="flex flex-wrap gap-2 text-xs text-gray-600 dark:text-gray-300">
              <span class="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/15 px-3 py-1 rounded-full shadow-sm">Backend & API</span>
              <span class="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/15 px-3 py-1 rounded-full shadow-sm">Laravel Platforms</span>
              <span class="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/15 px-3 py-1 rounded-full shadow-sm">Cloud & DevOps</span>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3 text-sm">
            <div class="p-4 rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-[#141416] shadow-sm">
              <p class="text-xs uppercase text-gray-500 dark:text-gray-400">Highlight</p>
              <p class="text-base font-semibold text-gray-900 dark:text-white">{{ sortedProjects.length }}+ project detail pages</p>
              <p class="text-gray-600 dark:text-gray-300 mt-1">Semua bisa diklik untuk melihat breakdown lengkap fitur, peran, dan stack.</p>
            </div>
            <div class="p-4 rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-[#141416] shadow-sm">
              <p class="text-xs uppercase text-gray-500 dark:text-gray-400">Teknologi</p>
              <p class="text-base font-semibold text-gray-900 dark:text-white">Laravel, Node.js, GCP</p>
              <p class="text-gray-600 dark:text-gray-300 mt-1">Termasuk projek dengan Filament, Livewire, Express, Docker, Cloud Run.</p>
            </div>
            <div class="p-4 rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-[#141416] shadow-sm col-span-2">
              <p class="text-xs uppercase text-gray-500 dark:text-gray-400">Cara baca</p>
              <p class="text-gray-700 dark:text-gray-200">Klik kartu → lihat detail lengkap. Tag memberi gambaran cepat ruang lingkup & stack.</p>
            </div>
          </div>
        </section>

        <section class="space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">Daftar project</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">Tersortir untuk mudah dipindai oleh recruiter / klien.</p>
          </div>

          <div class="grid md:grid-cols-2 gap-5 lg:gap-6">
            <ProjectListingCard
              v-for="project in sortedProjects"
              :key="project.path"
              :slug="project.path?.split('/').pop() ?? ''"
              :title="project.title"
              :description="project.listing.description"
              :tags="project.listing.tags"
              :period="project.listing.period"
              :type="project.listing.type"
              :icon="project.listing.icon"
              :gradient="project.listing.gradient"
            />
          </div>
        </section>
      </div>
    </main>
  </div>
</template>
