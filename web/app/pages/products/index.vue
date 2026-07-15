<script setup lang="ts">
useHead({
  title: 'Ib - Digital Products',
  bodyAttrs: { class: 'bg-white text-gray-900 dark:bg-[#0a0a0b] dark:text-white transition-colors duration-500 antialiased' }
})

const { data: products } = await useAsyncData('all-products', () => queryCollection('products').all())
</script>

<template>
  <div>
    <ProjectHeader variant="listing" />

    <main class="py-14 md:py-16">
      <div class="max-w-6xl mx-auto px-6 lg:px-8 space-y-10">
        <section class="space-y-4">
          <p class="text-xs font-semibold tracking-[0.14em] text-gray-500 dark:text-gray-400 uppercase">Digital Products</p>
          <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white leading-tight">Produk digital yang saya jual</h1>
          <p class="text-gray-600 dark:text-gray-300 max-w-2xl">Template, source code, dan tools yang bisa langsung dipakai — hasil dari project dan eksperimen pribadi.</p>
        </section>

        <section v-if="products?.length" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard
            v-for="product in products"
            :key="product.path"
            :title="product.title"
            :tagline="product.tagline"
            :price="product.price"
            :image="product.image?.src"
            :link="product.link"
            :tags="product.tags"
          />
        </section>

        <section v-else class="rounded-3xl border border-dashed border-gray-200 dark:border-white/10 py-20 text-center text-gray-400 dark:text-gray-500">
          <Icon name="feather:package" class="w-8 h-8 mx-auto mb-3" />
          <p>Belum ada produk yang dipublikasikan — coming soon.</p>
        </section>
      </div>
    </main>
  </div>
</template>
