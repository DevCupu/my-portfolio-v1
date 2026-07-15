<script setup lang="ts">
defineProps<{
  title: string
  tagline: string
  price: string
  image?: string
  link: string
  tags: string[]
}>()
</script>

<template>
  <article class="bg-white dark:bg-[#141416] rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden transition duration-200 hover:-translate-y-1 hover:shadow-lg">
    <div class="bg-parchment dark:bg-white/5">
      <img v-if="image" :src="image" :alt="title" loading="lazy" class="w-full h-48 object-cover" />
      <div v-else class="w-full h-48 grid place-items-center gap-1.5 text-gray-400 dark:text-gray-500">
        <Icon name="feather:package" class="w-6 h-6" />
        <span class="text-xs">Preview coming soon</span>
      </div>
    </div>
    <div class="p-6">
      <h3 class="text-lg font-semibold text-ink dark:text-white mb-1">{{ title }}</h3>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">{{ tagline }}</p>
      <div class="flex flex-wrap gap-2 text-xs text-gray-500 mb-5">
        <span v-for="tag in tags" :key="tag" class="bg-parchment dark:bg-white/5 dark:text-gray-300 px-2.5 py-1 rounded-full">{{ tag }}</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-base font-semibold text-ink dark:text-white">{{ price }}</span>
        <a :href="link" target="_blank" rel="noopener" class="btn-pill">
          <Icon name="feather:external-link" class="w-4 h-4" /> Get it
        </a>
      </div>
    </div>
  </article>
</template>
