<script setup lang="ts">
defineProps<{
  slug: string
  title: string
  summary: string
  description: string
  tags: string[]
  image?: string
  github?: string
  stagger?: 1 | 2
}>()
</script>

<template>
  <article
    v-reveal
    class="project-card fade-in bg-white dark:bg-[#141416] rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden"
    :class="stagger === 2 ? 'stagger-2' : 'stagger-1'"
  >
    <div class="card-media bg-parchment">
      <img v-if="image" :src="asset(image)" :alt="title" loading="lazy" class="w-full h-48 md:h-56 object-cover" />
      <div v-else class="w-full h-48 md:h-56 grid place-items-center gap-1.5 text-gray-400 dark:text-gray-500">
        <Icon name="feather:image" class="w-6 h-6" />
        <span class="text-xs">Screenshot coming soon</span>
      </div>
    </div>
    <div class="p-6">
      <h4 class="text-lg font-semibold text-ink dark:text-white mb-1">{{ title }}</h4>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">{{ summary }}</p>
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{{ description }}</p>
      <div class="flex flex-wrap gap-2 text-xs text-gray-500 mb-5">
        <span v-for="tag in tags" :key="tag" class="bg-parchment dark:bg-white/5 dark:text-gray-300 px-2.5 py-1 rounded-full">{{ tag }}</span>
      </div>
      <div class="flex items-center gap-5 text-sm">
        <NuxtLink :to="`/projects/${slug}`" class="flex items-center gap-1.5 text-accent dark:text-[#2997ff] nav-item">
          <Icon name="feather:arrow-up-right" class="w-4 h-4" /> View details
        </NuxtLink>
        <a
          v-if="github"
          :href="github"
          target="_blank"
          rel="noopener"
          class="flex items-center gap-1.5 text-gray-500 hover:text-ink dark:text-gray-400 dark:hover:text-white transition-colors"
        >
          <Icon name="feather:github" class="w-4 h-4" /> GitHub
        </a>
      </div>
    </div>
  </article>
</template>
