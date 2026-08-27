<script setup lang="ts">
const props = defineProps<{
  projects: {
    slug: string
    title: string
    summary: string
    description: string
    tags: string[]
    image?: string
    github?: string
  }[]
}>()

const trackRef = ref<HTMLElement | null>(null)
const { scrollXProgress } = useScroll({ container: trackRef })
const progress = useSpring(scrollXProgress, { stiffness: 120, damping: 30, mass: 0.4 })

function scrollBy(dir: 1 | -1) {
  const el = trackRef.value
  if (!el) return
  const card = el.querySelector<HTMLElement>('.project-card')
  const step = card ? card.offsetWidth + 24 : el.clientWidth
  el.scrollBy({ left: dir * step, behavior: 'smooth' })
}
</script>

<template>
  <div class="carousel">
    <div ref="trackRef" class="carousel__track" tabindex="0">
      <TiltCard v-for="project in props.projects" :key="project.slug" class="carousel__card">
        <article
          v-reveal
          class="project-card fade-in bg-white dark:bg-[#141416] rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden"
        >
          <div class="card-media bg-parchment">
            <img
              v-if="project.image"
              :src="asset(project.image)"
              :alt="project.title"
              loading="lazy"
              class="w-full h-44 md:h-56 object-cover"
            />
            <div
              v-else
              class="w-full h-44 md:h-56 grid place-items-center gap-1.5 text-gray-400 dark:text-gray-500"
            >
              <Icon name="feather:image" class="w-6 h-6" />
              <span class="text-xs">Screenshot coming soon</span>
            </div>
          </div>
          <div class="p-6">
            <h4 class="text-lg font-semibold text-ink dark:text-white mb-1">{{ project.title }}</h4>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">{{ project.summary }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed line-clamp-3">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2 text-xs text-gray-500 mb-5">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="bg-parchment dark:bg-white/5 dark:text-gray-300 px-2.5 py-1 rounded-full"
                >{{ tag }}</span
              >
            </div>
            <div class="flex items-center gap-5 text-sm">
              <NuxtLink
                :to="`/projects/${project.slug}`"
                class="flex items-center gap-1.5 text-accent dark:text-[#2997ff] nav-item"
              >
                <Icon name="feather:arrow-up-right" class="w-4 h-4" /> View details
              </NuxtLink>
              <a
                v-if="project.github"
                :href="project.github"
                target="_blank"
                rel="noopener"
                class="flex items-center gap-1.5 text-gray-500 hover:text-ink dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <Icon name="feather:github" class="w-4 h-4" /> GitHub
              </a>
            </div>
          </div>
        </article>
      </TiltCard>
    </div>

    <div class="carousel__controls">
      <div class="carousel__progress" aria-hidden="true">
        <Motion :style="{ scaleX: progress }" class="carousel__progress-bar">
          <div />
        </Motion>
      </div>
      <div class="carousel__buttons">
        <button type="button" class="carousel__btn" aria-label="Previous projects" @click="scrollBy(-1)">
          <Icon name="feather:arrow-left" class="w-4 h-4" />
        </button>
        <button type="button" class="carousel__btn" aria-label="Next projects" @click="scrollBy(1)">
          <Icon name="feather:arrow-right" class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>
