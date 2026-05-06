<template>
  <main class="product-detail-page">
    <template v-if="entry">
      <section class="pd-hero">
        <div class="container">
          <nav class="pd-breadcrumb" aria-label="Breadcrumb">
            <RouterLink to="/products">{{ t('nav.products') }}</RouterLink>
            <span aria-hidden="true">›</span>
            <RouterLink :to="{ name: 'product-category', params: { category: entry.category } }">
              {{ categoryLabel(entry.category) }}
            </RouterLink>
            <span aria-hidden="true">›</span>
            <span class="pd-breadcrumb-current">{{ entry.model }}</span>
          </nav>

          <header class="pd-header">
            <div>
              <span class="product-model">{{ entry.model }}</span>
              <h1>{{ entry.name }}</h1>
            </div>
            <span class="product-cat" :data-cat="entry.category">{{ categoryLabel(entry.category) }}</span>
          </header>
        </div>
      </section>

      <section class="pd-body-section">
        <div class="container">
          <div class="product-body">
            <div class="product-main">
              <figure v-if="resolvedImage" class="product-image">
                <img :src="resolvedImage" :alt="`${entry.model} ${entry.name}`" />
              </figure>

              <div class="product-section">
                <h2>{{ t('products.overview') }}</h2>
                <p class="product-overview">
                  <ModelLinkedText :text="entry.overview" />
                </p>
                <p v-if="entry.id === 'intelibilge'" class="product-deep-link">
                  <RouterLink to="/intelibilge">{{ t('products.intelibilgeFullPage') }}</RouterLink>
                </p>
              </div>

              <div class="product-grid-two">
                <div class="product-section">
                  <h2>{{ t('products.features') }}</h2>
                  <ul class="feature-list">
                    <li v-for="(f, i) in entry.features" :key="i">
                      <ModelLinkedText :text="f" />
                    </li>
                  </ul>
                </div>

                <div class="product-section">
                  <h2>{{ t('products.applications') }}</h2>
                  <p class="applications">
                    <ModelLinkedText :text="entry.applications" />
                  </p>
                </div>
              </div>

              <template v-if="isSystem(entry)">
                <div class="product-section">
                  <h2>{{ t('products.howItWorks') }}</h2>
                  <ol class="how-list">
                    <li v-for="(step, i) in entry.howItWorks" :key="i">
                      <ModelLinkedText :text="step" />
                    </li>
                  </ol>
                </div>
              </template>

              <div class="product-section">
                <h2>{{ t('products.ordering') }}</h2>
                <p class="ordering">
                  <ModelLinkedText :text="entry.ordering" />
                </p>
              </div>

              <template v-if="isSystem(entry) && entry.whatsIncluded?.length">
                <div class="product-section">
                  <h2>{{ t('products.whatsIncluded') }}</h2>
                  <ul class="feature-list">
                    <li v-for="(w, i) in entry.whatsIncluded" :key="i">
                      <ModelLinkedText :text="w" />
                    </li>
                  </ul>
                </div>
              </template>

              <template v-if="isSystem(entry) && entry.orderingRows?.length">
                <div class="order-table-wrap product-section">
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
              <h2>{{ t('products.specifications') }}</h2>
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

      <section v-if="related.length" class="pd-related">
        <div class="container">
          <h2 class="toc-title">{{ t('productDetail.related') }}</h2>
          <div class="related-grid">
            <RouterLink
              v-for="r in related"
              :key="r.id"
              :to="{ name: 'product-detail', params: { id: r.id } }"
              class="related-card"
            >
              <span class="related-model">{{ r.model }}</span>
              <span class="related-name">{{ r.name }}</span>
            </RouterLink>
          </div>
        </div>
      </section>

      <section class="pd-footnote">
        <div class="container">
          <div class="footnote-panel">
            <p>{{ t('products.disclaimer') }}</p>
            <p class="contact-line">{{ t('products.contact') }}</p>
            <RouterLink :to="{ name: 'product-categories' }" class="back-link">
              {{ t('productDetail.backCategories') }}
            </RouterLink>
          </div>
        </div>
      </section>
    </template>

    <section v-else class="pd-missing">
      <div class="container">
        <h1>{{ t('productDetail.notFound') }}</h1>
        <p>{{ t('productDetail.notFoundLead') }}</p>
        <RouterLink :to="{ name: 'product-categories' }" class="back-link">
          {{ t('productDetail.backCategories') }}
        </RouterLink>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from '@/composables/useI18n'
import { useFadeIn } from '@/composables/useFadeIn'
import ModelLinkedText from '@/components/ModelLinkedText.vue'
import {
  findProduct,
  isSystem,
  productCatalog,
  type CatalogEntry,
} from '@/data/productCatalog'

const props = defineProps<{ id: string }>()

const { t } = useI18n()
useFadeIn('.product-detail-page')
const baseUrl = import.meta.env.BASE_URL

const entry = computed(() => findProduct(props.id))

const resolvedImage = computed(() => {
  if (!entry.value?.image) return null
  return `${baseUrl}${entry.value.image}`
})

const related = computed<CatalogEntry[]>(() => {
  if (!entry.value) return []
  return productCatalog
    .filter((p) => p.category === entry.value!.category && p.id !== entry.value!.id)
    .slice(0, 3)
})

function categoryLabel(cat: CatalogEntry['category']): string {
  const key = `products.category.${cat}`
  const label = t(key)
  return label === key ? cat : label
}
</script>

<style scoped>
.product-detail-page {
  padding-top: 5rem;
  min-height: 60vh;
}

.pd-hero,
.pd-body-section,
.pd-related,
.pd-footnote,
.pd-missing {
  border-bottom: 1px solid var(--border-subtle);
}

.pd-hero {
  padding: 3rem 0 2.5rem;
}

.pd-body-section {
  padding: 3rem 0;
}

.pd-related,
.pd-footnote {
  padding: 2.5rem 0;
}

.pd-missing {
  padding: 5rem 0;
  text-align: center;
}

.pd-breadcrumb {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  align-items: center;
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.pd-breadcrumb a {
  color: var(--brand-marine-blue);
  text-decoration: none;
}

[data-theme="dark"] .pd-breadcrumb a {
  color: #6FA0CC;
}

.pd-breadcrumb a:hover {
  text-decoration: underline;
}

.pd-breadcrumb-current {
  color: var(--text-primary);
  font-weight: 600;
}

.pd-header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: end;
}

.pd-header h1 {
  font-size: clamp(1.8rem, 3vw, 2.6rem);
}

.product-model {
  display: inline-block;
  margin-bottom: 0.6rem;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--brand-marine-blue);
}

[data-theme="dark"] .product-model {
  color: #6FA0CC;
}

.product-cat {
  padding: 0.5rem 0.9rem;
  border: 1px solid var(--border-subtle);
  border-radius: 999px;
  color: var(--text-secondary);
  white-space: nowrap;
}

.product-body {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(18rem, 0.8fr);
  gap: 1.5rem;
}

.product-main,
.product-aside {
  display: grid;
  gap: 1rem;
}

.product-section,
.product-aside,
.product-image {
  padding: 1.4rem;
  border-radius: 1.25rem;
  border: 1px solid var(--border-medium);
  background: var(--glass-bg);
}

.product-image {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 18rem;
  background: #ffffff;
  border: 1px solid rgba(15, 42, 68, 0.08);
  box-shadow: 0 8px 24px rgba(15, 42, 68, 0.06);
}

[data-theme="dark"] .product-image {
  background: rgba(255, 255, 255, 0.04);
}

.product-image img {
  max-width: 100%;
  max-height: 22rem;
  width: auto;
  height: auto;
  object-fit: contain;
}

.product-grid-two {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.feature-list,
.how-list {
  display: grid;
  gap: 0.7rem;
  padding-left: 1.1rem;
  color: var(--text-secondary);
}

.product-overview,
.applications,
.ordering {
  color: var(--text-secondary);
  line-height: 1.7;
}

.product-deep-link a,
.back-link {
  color: var(--brand-marine-blue);
  font-weight: 600;
  text-decoration: none;
}

[data-theme="dark"] .product-deep-link a,
[data-theme="dark"] .back-link {
  color: #6FA0CC;
}

.product-deep-link a:hover,
.back-link:hover {
  text-decoration: underline;
}

.spec-table-wrap,
.order-table-wrap {
  overflow-x: auto;
}

.spec-table {
  width: 100%;
  border-collapse: collapse;
}

.spec-table th,
.spec-table td {
  padding: 0.8rem 0.5rem;
  text-align: left;
  border-bottom: 1px solid var(--border-subtle);
  vertical-align: top;
}

.spec-table th {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-muted);
}

.spec-table td {
  color: var(--text-secondary);
  line-height: 1.55;
}

.spec-table td:first-child {
  color: var(--text-primary);
}

.toc-title {
  margin-bottom: 1.25rem;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: 1rem;
}

.related-card {
  display: grid;
  gap: 0.4rem;
  padding: 1rem 1.2rem;
  border-radius: 1rem;
  border: 1px solid var(--border-medium);
  background: var(--surface-soft);
  text-decoration: none;
  color: var(--text-primary);
  transition: border-color 0.2s, background 0.2s;
}

.related-card:hover {
  border-color: var(--brand-marine-blue);
  background: rgba(31, 78, 121, 0.06);
}

.related-model {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  letter-spacing: 0.04em;
  font-size: 0.78rem;
  text-transform: uppercase;
  color: var(--brand-marine-blue);
}

[data-theme="dark"] .related-model {
  color: #6FA0CC;
}

.related-name {
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.footnote-panel {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  align-items: center;
  padding: 1.5rem;
  border-radius: 1.25rem;
  border: 1px solid var(--border-medium);
  background: var(--glass-bg);
}

.footnote-panel p {
  color: var(--text-secondary);
  line-height: 1.6;
}

@media (max-width: 980px) {
  .product-body,
  .product-grid-two,
  .footnote-panel {
    grid-template-columns: 1fr;
  }

  .pd-header {
    align-items: start;
    flex-direction: column;
  }
}
</style>
