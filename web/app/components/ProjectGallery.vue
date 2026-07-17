<script setup lang="ts">
const props = defineProps<{
  images: { src: string; alt: string }[]
}>()

const index = ref(0)

function prev() {
  index.value = (index.value - 1 + props.images.length) % props.images.length
}
function next() {
  index.value = (index.value + 1) % props.images.length
}
</script>

<template>
  <div class="rounded-2xl overflow-hidden bg-gray-100 dark:bg-white/10 shadow-sm relative">
    <div class="w-full h-64 md:h-80 relative">
      <button
        type="button"
        class="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow hover:bg-white"
        aria-label="Previous image"
        @click="prev"
      >
        <Icon name="feather:chevron-left" />
      </button>
      <Transition name="gallery-fade" mode="out-in">
        <img
          :key="images[index].src"
          :src="asset(images[index].src)"
          :alt="images[index].alt"
          class="w-full h-64 md:h-80 object-cover"
        />
      </Transition>
      <button
        type="button"
        class="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow hover:bg-white"
        aria-label="Next image"
        @click="next"
      >
        <Icon name="feather:chevron-right" />
      </button>
    </div>
    <p class="px-3 pt-2 text-xs text-gray-500 dark:text-gray-400">{{ images[index].alt }}</p>

    <div v-if="images.length > 1" class="flex gap-2 overflow-x-auto p-3">
      <button
        v-for="(img, i) in images"
        :key="img.src"
        type="button"
        class="shrink-0 w-16 h-12 rounded-lg overflow-hidden ring-2 transition-all"
        :class="i === index ? 'ring-accent dark:ring-[#2997ff]' : 'ring-transparent opacity-60 hover:opacity-100'"
        :aria-label="`Show image ${i + 1}: ${img.alt}`"
        @click="index = i"
      >
        <img :src="asset(img.src)" :alt="img.alt" class="w-full h-full object-cover" />
      </button>
    </div>
  </div>
</template>
