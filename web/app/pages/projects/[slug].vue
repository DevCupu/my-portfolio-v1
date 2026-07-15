<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data: project } = await useAsyncData(`project-${slug}`, () =>
  queryCollection('projects').path(`/projects/${slug}`).first()
)

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

useHead({
  title: `${project.value.title} - Ib Portfolio`,
  bodyAttrs: { class: 'bg-white text-gray-900 dark:bg-[#0a0a0b] dark:text-white transition-colors duration-500 antialiased' }
})
</script>

<template>
  <div v-if="project">
    <ProjectHeader variant="detail" />

    <main class="py-12 md:py-16">
      <div class="max-w-6xl mx-auto px-6 lg:px-8 space-y-10">
        <section class="grid md:grid-cols-2 gap-10 items-start">
          <div class="space-y-4">
            <p class="text-xs font-medium tracking-wide text-gray-500 dark:text-gray-400 uppercase">
              {{ project.kicker }}
            </p>
            <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white">
              {{ project.title }}
            </h1>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ project.subtitle }}
            </p>
            <div class="flex flex-wrap gap-2 text-xs text-gray-600 dark:text-gray-300">
              <span v-for="tag in project.tags" :key="tag" class="bg-gray-100 dark:bg-white/10 px-2 py-1 rounded">{{ tag }}</span>
            </div>
          </div>

          <ProjectGallery v-if="project.gallery?.length" :images="project.gallery" />
          <div v-else-if="project.image" class="rounded-2xl overflow-hidden bg-gray-100 dark:bg-white/10 shadow-sm">
            <img :src="project.image.src" :alt="project.image.alt" class="w-full h-64 md:h-80 object-cover" />
          </div>
          <div v-else class="rounded-2xl bg-gray-100 dark:bg-white/10 shadow-sm h-64 md:h-80 grid place-items-center gap-2 text-gray-400 dark:text-gray-500">
            <Icon name="feather:image" class="w-8 h-8" />
            <span class="text-sm">Screenshot coming soon</span>
          </div>
        </section>

        <section class="project-body">
          <ContentRenderer :value="project" />
        </section>
      </div>
    </main>
  </div>
</template>
