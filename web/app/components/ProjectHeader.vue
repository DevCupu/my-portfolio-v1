<script setup lang="ts">
defineProps<{
  variant?: 'listing' | 'detail'
}>()
</script>

<template>
  <header class="border-b border-gray-100 dark:border-white/10 bg-white/90 dark:bg-[#0a0a0b]/85 backdrop-blur-sm sticky top-0 z-40">
    <div class="max-w-6xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
      <NuxtLink to="/" class="text-lg font-medium text-gray-900 dark:text-white hover:opacity-70 transition">Ib</NuxtLink>

      <NuxtLink
        v-if="variant !== 'detail'"
        to="/#work"
        class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 transition-colors"
      >
        <Icon name="feather:arrow-left" class="w-4 h-4" />
        Back to portfolio
      </NuxtLink>

      <nav v-else class="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
        <NuxtLink to="/#work" class="flex items-center gap-1 hover:text-gray-900 transition-colors">
          <Icon name="feather:arrow-left" class="w-4 h-4" />
          Back to work
        </NuxtLink>
        <NuxtLink to="/projects" class="flex items-center gap-1 hover:text-gray-900 transition-colors">
          <Icon name="feather:layers" class="w-4 h-4" />
          All projects
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
