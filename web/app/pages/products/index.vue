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
        <section v-reveal class="fade-in space-y-4">
          <p class="text-xs font-semibold tracking-[0.14em] text-gray-500 dark:text-gray-400 uppercase">Digital Products</p>
          <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white leading-tight">Produk Digital Saya</h1>
          <p class="text-gray-600 dark:text-gray-300 max-w-2xl">Template, source code, dan tools siap pakai yang saya buat dan jual untuk membantu Anda bekerja lebih cepat.</p>
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

        <section v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard
            v-for="n in 3"
            :key="n"
            title="Product"
            tagline="Kontennya sedang disiapkan — segera hadir di sini."
            price="—"
            link="#"
            :tags="['Coming soon']"
            coming-soon
          />
        </section>
      </div>
    </main>
  </div>
</template>
