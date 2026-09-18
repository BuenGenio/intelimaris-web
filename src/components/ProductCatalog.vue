<template>
  <main class="catalog-page" lang="en">
    <header class="catalog-heading editorial-shell">
      <p class="editorial-eyebrow">InteliMARIS connected systems</p>
      <component :is="productId ? 'p' : 'h1'" class="catalog-title">Hardware</component>
      <p>Sensors, controls and complete systems. Choose a product to explore its specification.</p>
    </header>
    <div class="catalog-layout editorial-shell">
      <button class="catalog-mobile-toggle" type="button" :aria-expanded="browserOpen" aria-controls="catalog-navigation" @click="browserOpen = !browserOpen"><span>{{ browserOpen ? 'Close product browser' : 'Browse hardware' }}</span><span>{{ productCatalog.length }} products <span aria-hidden="true">⌄</span></span></button>
      <aside id="catalog-navigation" class="catalog-sidebar" :class="{ 'is-open': browserOpen }" aria-label="Product browser">
        <div class="catalog-filters">
          <label class="catalog-search"><span class="sr-only">Search hardware</span><svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg><input v-model="search" type="search" placeholder="Find a product" aria-label="Search hardware" /></label>
          <label class="catalog-category"><span>Category</span><select v-model="category" aria-label="Hardware category"><option value="">All hardware</option><option v-for="item in CATEGORY_ORDER" :key="item" :value="item">{{ categoryLabel(item) }}</option></select></label>
          <p class="catalog-result-count" role="status">{{ filtered.length }} {{ filtered.length === 1 ? 'product' : 'products' }}</p>
        </div>
        <nav class="catalog-product-list" aria-label="Choose a product">
          <RouterLink v-for="product in filtered" :key="product.id" :to="productLocation(product.id)" :aria-current="entry?.id === product.id ? 'true' : 'false'" @click="onProductClick">
            <span class="catalog-model">{{ product.model }}</span><span class="catalog-product-name">{{ product.name }}</span><span class="catalog-product-arrow" aria-hidden="true">↗</span>
          </RouterLink>
          <div v-if="!filtered.length" class="catalog-empty-search"><p>No matching products.</p><button type="button" @click="clearFilters">Clear filters</button></div>
        </nav>
        <details class="catalog-system-guides"><summary>System guides <span aria-hidden="true">+</span></summary><nav aria-label="Connected system guides"><RouterLink to="/pwts">PWTS <span>Power, water, temperature & switching</span></RouterLink><RouterLink to="/intelibilge">InteliBilge <span>Water ingress & pump supervision</span></RouterLink><RouterLink to="/intelibms">InteliBMS <span>Battery & shunt monitoring</span></RouterLink></nav></details>
      </aside>
      <article v-if="entry" id="catalog-detail" class="catalog-detail" aria-labelledby="catalog-product-title">
        <div class="catalog-product-intro" :class="{ 'with-image': entry.image }">
          <div><p class="catalog-product-meta"><span>{{ entry.model }}</span><span>{{ categoryLabel(entry.category) }}</span></p><component :is="productId ? 'h1' : 'h2'" id="catalog-product-title" ref="productHeading" tabindex="-1">{{ entry.name }}</component><p class="catalog-overview"><ModelLinkedText :text="entry.overview" /></p></div>
          <figure v-if="entry.image" class="catalog-product-image"><img :src="`${base}${entry.image}`" :alt="`${entry.model} ${entry.name}`" width="480" height="360" /></figure>
        </div>
        <div class="catalog-spec-layout">
          <div class="catalog-product-notes">
            <section><component :is="productId ? 'h2' : 'h3'" class="catalog-section-title">{{ t('products.features') }}</component><ul><li v-for="feature in entry.features" :key="feature"><ModelLinkedText :text="feature" /></li></ul></section>
            <section><component :is="productId ? 'h2' : 'h3'" class="catalog-section-title">{{ t('products.applications') }}</component><p><ModelLinkedText :text="entry.applications" /></p></section>
            <section v-if="isSystem(entry)"><component :is="productId ? 'h2' : 'h3'" class="catalog-section-title">{{ t('products.howItWorks') }}</component><ol><li v-for="step in entry.howItWorks" :key="step"><ModelLinkedText :text="step" /></li></ol></section>
          </div>
          <section class="catalog-specifications"><component :is="productId ? 'h2' : 'h3'" class="catalog-section-title">{{ t('products.specifications') }}</component><table><caption class="sr-only">{{ entry.model }} specifications</caption><tbody><tr v-for="spec in entry.specs" :key="spec.parameter"><th scope="row"><ModelLinkedText :text="spec.parameter" /></th><td><ModelLinkedText :text="spec.specification" /></td></tr></tbody></table></section>
        </div>
        <section class="catalog-ordering"><component :is="productId ? 'h2' : 'h3'" class="catalog-section-title">{{ t('products.ordering') }}</component><p><ModelLinkedText :text="entry.ordering" /></p><template v-if="isSystem(entry)"><div v-if="entry.whatsIncluded?.length"><component :is="productId ? 'h3' : 'h4'" class="catalog-subsection-title">{{ t('products.whatsIncluded') }}</component><ul><li v-for="item in entry.whatsIncluded" :key="item"><ModelLinkedText :text="item" /></li></ul></div><table v-if="entry.orderingRows?.length"><caption class="sr-only">{{ entry.model }} ordering codes</caption><tbody><tr v-for="row in entry.orderingRows" :key="row.code"><th scope="row">{{ row.code }}</th><td>{{ row.description }}</td></tr></tbody></table></template></section>
        <footer class="catalog-note"><p>Confirm the supplied configuration, tested ratings and supported WaterWayz™ features for your installation.</p><RouterLink :to="contactLink(audience)">Discuss your installation <span aria-hidden="true">↗</span></RouterLink></footer>
      </article>
      <section v-else id="catalog-detail" class="catalog-not-found"><p class="editorial-eyebrow">Product not found</p><h2>Let’s find the right hardware.</h2><p>Choose a product from the browser or return to the catalog.</p><RouterLink to="/products" class="editorial-button">Browse all hardware →</RouterLink></section>
    </div>
  </main>
</template>
<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { CATEGORY_ORDER, productCatalog, findProduct, isSystem, type ProductCategory } from '@/data/productCatalog'
import ModelLinkedText from '@/components/ModelLinkedText.vue'
import { useI18n } from '@/composables/useI18n'
import { useAudience } from '@/composables/useAudience'
import { contactLink } from '@/data/audiences'
const props = defineProps<{ productId?: string }>()
const route = useRoute()
const { t } = useI18n()
const { audience } = useAudience()
const base = import.meta.env.BASE_URL
const search = ref('')
const category = ref('')
const browserOpen = ref(false)
const productHeading = ref<HTMLElement | null>(null)
const entry = computed(() => {
  if (props.productId !== undefined) return findProduct(props.productId)
  if (route.hash) { try { return findProduct(decodeURIComponent(route.hash.slice(1))) } catch { return undefined } }
  return productCatalog[0]
})
function categoryLabel(value: ProductCategory) { return t(`products.category.${value}`) }
const filtered = computed(() => productCatalog.filter(product =>
  (!category.value || product.category === category.value) &&
  `${product.model} ${product.name} ${categoryLabel(product.category)}`.toLowerCase().includes(search.value.trim().toLowerCase()),
))
function productLocation(id: string) { return { path: `/products/${id}`, query: route.query } }
function clearFilters() { search.value = ''; category.value = '' }
function onProductClick(event: MouseEvent) { if (!event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) browserOpen.value = false }
watch(() => entry.value?.id, async () => { await nextTick(); if (window.matchMedia('(max-width: 800px)').matches) productHeading.value?.focus({ preventScroll: true }) })
</script>
<style src="../assets/catalog.css"></style>
