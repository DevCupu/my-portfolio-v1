<script setup lang="ts">
defineProps<{
  slug: string
  title: string
  description: string
  tags: string[]
  period: string
  type: string
  icon: string
  gradient: string
}>()
</script>

<template>
  <article class="group relative overflow-hidden rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-[#141416] shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
    <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r" :class="gradient"></div>
    <div class="p-5 space-y-3">
      <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <span class="px-2 py-1 rounded-full bg-gray-100 dark:bg-white/10 font-medium">{{ period }}</span>
        <span class="px-2 py-1 rounded-full bg-gray-100 dark:bg-white/10">{{ type }}</span>
      </div>
      <div class="flex items-start gap-2">
        <div class="mt-1"><Icon :name="`feather:${icon}`" class="w-5 h-5 text-gray-500 dark:text-gray-400" /></div>
        <div class="space-y-2">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ title }}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{{ description }}</p>
          <div class="flex flex-wrap gap-2 text-xs text-gray-600 dark:text-gray-300">
            <span v-for="tag in tags" :key="tag" class="bg-gray-100 dark:bg-white/10 px-2 py-1 rounded">{{ tag }}</span>
          </div>
          <NuxtLink :to="`/projects/${slug}`" class="inline-flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white group-hover:text-gray-700">
            Lihat detail
            <Icon name="feather:arrow-up-right" class="w-4 h-4" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </article>
</template>
