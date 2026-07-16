<script setup lang="ts">
const props = defineProps<{ target: number; suffix?: string; label: string }>()

const el = ref<HTMLElement | null>(null)
const count = ref(0)

const { stop } = useIntersectionObserver(el, ([entry]) => {
  if (!entry?.isIntersecting) return
  stop()
  const duration = 1200
  const start = performance.now()
  function tick(now: number) {
    const progress = Math.min((now - start) / duration, 1)
    count.value = Math.round(props.target * (1 - (1 - progress) ** 3))
    if (progress < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}, { threshold: 0.4 })
</script>

<template>
  <div ref="el" class="text-center">
    <p class="text-3xl md:text-4xl font-semibold text-ink dark:text-white">{{ count }}{{ suffix }}</p>
    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ label }}</p>
  </div>
</template>
