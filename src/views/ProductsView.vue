<template>
  <main class="products-page">
    <section class="products-hero">
      <div class="container">
        <div class="section-label">{{ t('products.label') }}</div>
        <h1>{{ t('products.title') }}</h1>
        <p class="products-lead">{{ t('products.lead') }}</p>
      </div>
    </section>

    <section class="products-filter">
      <div class="container">
        <h2 class="toc-title">{{ t('products.filterBy') }}</h2>
        <div class="filter-chips" role="group" :aria-label="t('products.filterBy')">
          <button
            type="button"
            class="filter-chip"
            :class="{ active: activeCategory === null }"
            @click="activeCategory = null"
          >
            {{ t('products.category.all') }}
          </button>
          <button
            v-for="cat in categories"
            :key="cat"
            type="button"
            class="filter-chip"
            :class="{ active: activeCategory === cat }"
            @click="activeCategory = cat"
          >
            {{ categoryLabel(cat) }}
          </button>
        </div>
      </div>
    </section>

    <section class="products-toc">
      <div class="container">
        <h2 class="toc-title">{{ t('products.jumpNav') }}</h2>
        <nav class="toc-grid" aria-label="Product shortcuts">
          <a v-for="p in filteredProducts" :key="p.id" :href="`#${p.id}`" class="toc-chip">
            <span class="toc-model">{{ p.model }}</span>
            <span class="toc-name">{{ p.name }}</span>
          </a>
        </nav>
      </div>
    </section>

    <section
      v-for="entry in filteredProducts"
      :key="entry.id"
      :id="entry.id"
      class="product-block fade-in"
    >
      <div class="container">
        <header class="product-header">
          <span class="product-model">{{ entry.model }}</span>
          <h2>{{ entry.name }}</h2>
          <span class="product-cat" :data-cat="entry.category">{{ categoryLabel(entry.category) }}</span>
        </header>

        <div class="product-body">
          <div class="product-main">
            <h3>{{ t('products.overview') }}</h3>
            <p class="product-overview">
              <ModelLinkedText :text="entry.overview" />
            </p>
            <p v-if="entry.id === 'intelibilge'" class="product-deep-link">
              <RouterLink to="/intelibilge">{{ t('products.intelibilgeFullPage') }}</RouterLink>
            </p>

            <h3>{{ t('products.features') }}</h3>
            <ul class="feature-list">
              <li v-for="(f, i) in entry.features" :key="i">
                <ModelLinkedText :text="f" />
              </li>
            </ul>

            <template v-if="isSystem(entry)">
              <h3>{{ t('products.howItWorks') }}</h3>
              <ol class="how-list">
                <li v-for="(step, i) in entry.howItWorks" :key="i">
                  <ModelLinkedText :text="step" />
                </li>
              </ol>
            </template>

            <h3>{{ t('products.applications') }}</h3>
            <p class="applications">
              <ModelLinkedText :text="entry.applications" />
            </p>

            <h3>{{ t('products.ordering') }}</h3>
            <p class="ordering">
              <ModelLinkedText :text="entry.ordering" />
            </p>

            <template v-if="isSystem(entry) && entry.whatsIncluded?.length">
              <h3>{{ t('products.whatsIncluded') }}</h3>
              <ul class="feature-list">
                <li v-for="(w, i) in entry.whatsIncluded" :key="i">
                  <ModelLinkedText :text="w" />
                </li>
              </ul>
            </template>

            <template v-if="isSystem(entry) && entry.orderingRows?.length">
              <div class="order-table-wrap">
                <table class="spec-table">
                  <thead>
                    <tr>
                      <th>{{ t('products.table.productCode') }}</th>
                      <th>{{ t('products.table.description') }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="row in entry.orderingRows" :key="row.code">
                      <td><code>{{ row.code }}</code></td>
                      <td>
                        <ModelLinkedText :text="row.description" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </template>
          </div>

          <aside class="product-aside">
            <h3>{{ t('products.specifications') }}</h3>
            <div class="spec-table-wrap">
              <table class="spec-table">
                <thead>
                  <tr>
                    <th>{{ t('products.table.parameter') }}</th>
                    <th>{{ t('products.table.specification') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, i) in entry.specs" :key="i">
                    <td>
                      <ModelLinkedText :text="row.parameter" />
                    </td>
                    <td>
                      <ModelLinkedText :text="row.specification" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <section class="products-footnote">
      <div class="container">
        <p>{{ t('products.disclaimer') }}</p>
        <p class="contact-line">{{ t('products.contact') }}</p>
        <RouterLink to="/" class="back-link">{{ t('products.backHome') }}</RouterLink>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from '@/composables/useI18n'
import { useFadeIn } from '@/composables/useFadeIn'
import ModelLinkedText from '@/components/ModelLinkedText.vue'
import { productCatalog, isSystem, type CatalogEntry } from '@/data/productCatalog'

const { t } = useI18n()
useFadeIn('.products-page')

const activeCategory = ref<CatalogEntry['category'] | null>(null)

const categories = computed(() => {
  const seen = new Set<CatalogEntry['category']>()
  for (const p of productCatalog) seen.add(p.category)
  return [...seen]
})

const filteredProducts = computed(() => {
  if (!activeCategory.value) return productCatalog
  return productCatalog.filter((p) => p.category === activeCategory.value)
})

function categoryLabel(cat: CatalogEntry['category']): string {
  const key = `products.category.${cat}`
  const label = t(key)
  return label === key ? cat : label
}
</script>

<style scoped>
.product-deep-link {
  margin-top: 1rem;
}
.product-deep-link a {
  color: var(--cyan-bright);
  font-weight: 600;
  text-decoration: none;
}
.product-deep-link a:hover {
  text-decoration: underline;
}

.products-page {
  padding-top: 5rem;
  min-height: 60vh;
}

.products-hero {
  padding: 6rem 0 3rem;
  border-bottom: 1px solid var(--border-subtle);
}

.products-hero h1 {
  margin-bottom: 1rem;
}

.products-lead {
  max-width: 42rem;
  color: var(--text-secondary);
  font-size: 1.125rem;
}

.products-filter {
  padding: 2rem 0;
  border-bottom: 1px solid var(--border-subtle);
}

.filter-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-chip {
  padding: 0.45rem 1rem;
  border-radius: 999px;
  border: 1px solid var(--border-medium);
  background: var(--ocean-blue);
  color: var(--text-secondary);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s, background 0.2s;
}

.filter-chip:hover {
  border-color: var(--cyan-electric);
  color: var(--text-primary);
}

.filter-chip.active {
  border-color: var(--cyan-bright);
  color: var(--cyan-bright);
  background: var(--cyan-glow);
}

.products-toc {
  padding: 3rem 0;
  background: var(--glass-bg);
  border-bottom: 1px solid var(--border-subtle);
}

.toc-title {
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  margin-bottom: 1.25rem;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
}

.toc-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.toc-chip {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.15rem;
  padding: 0.65rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid var(--border-medium);
  background: var(--ocean-blue);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s, box-shadow 0.2s;
  max-width: 16rem;
}

.toc-chip:hover {
  border-color: var(--cyan-electric);
  box-shadow: var(--shadow-glow);
}

.toc-model {
  font-family: 'Outfit', sans-serif;
  font-weight: 700;
  color: var(--cyan-bright);
  font-size: 0.9rem;
}

.toc-name {
  font-size: 0.8rem;
  color: var(--text-secondary);
  line-height: 1.35;
}

.product-block {
  padding: 5rem 0;
  border-bottom: 1px solid var(--border-subtle);
  scroll-margin-top: 5.5rem;
}

.product-header {
  margin-bottom: 2.5rem;
}

.product-model {
  display: inline-block;
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 1.25rem;
  color: var(--cyan-bright);
  letter-spacing: 0.04em;
  margin-bottom: 0.35rem;
}

.product-header h2 {
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  margin-bottom: 0.75rem;
}

.product-cat {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  background: var(--cyan-glow);
  border: 1px solid var(--border-medium);
  color: var(--text-secondary);
}

.product-body {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
}

@media (min-width: 960px) {
  .product-body {
    grid-template-columns: 1fr minmax(280px, 380px);
    align-items: start;
  }
}

.product-main h3 {
  font-size: 1rem;
  margin: 1.75rem 0 0.75rem;
  color: var(--text-primary);
  font-family: 'Outfit', sans-serif;
}

.product-main h3:first-child {
  margin-top: 0;
}

.product-overview,
.applications,
.ordering {
  color: var(--text-secondary);
  line-height: 1.65;
}

.feature-list,
.how-list {
  margin: 0;
  padding-left: 1.25rem;
  color: var(--text-secondary);
  line-height: 1.7;
}

.feature-list li,
.how-list li {
  margin-bottom: 0.35rem;
}

.product-aside h3 {
  font-size: 1rem;
  margin-bottom: 1rem;
  font-family: 'Outfit', sans-serif;
}

.spec-table-wrap {
  overflow-x: auto;
  border-radius: 0.75rem;
  border: 1px solid var(--border-medium);
  background: var(--glass-bg);
}

.spec-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.spec-table th,
.spec-table td {
  padding: 0.65rem 1rem;
  text-align: left;
  border-bottom: 1px solid var(--border-subtle);
  vertical-align: top;
}

.spec-table th {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  color: var(--text-muted);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: var(--border-subtle);
}

.spec-table tr:last-child td {
  border-bottom: none;
}

.spec-table td:first-child {
  color: var(--text-secondary);
  white-space: nowrap;
}

.spec-table code {
  font-size: 0.85em;
  color: var(--cyan-bright);
}

.products-footnote {
  padding: 4rem 0 6rem;
}

.products-footnote p {
  color: var(--text-muted);
  font-size: 0.9rem;
  max-width: 48rem;
  margin-bottom: 1rem;
}

.contact-line {
  color: var(--text-secondary);
}

.back-link {
  display: inline-block;
  margin-top: 1.5rem;
  color: var(--cyan-bright);
  font-weight: 600;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}
</style>
