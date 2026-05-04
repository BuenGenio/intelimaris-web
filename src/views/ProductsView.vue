<template>
  <main class="products-page">
    <section class="products-hero">
      <div class="container">
        <div class="products-hero-grid">
          <div>
            <div class="section-label">{{ t('products.label') }}</div>
            <h1>{{ t('products.title') }}</h1>
            <p class="products-lead">{{ t('products.lead') }}</p>
          </div>

          <aside class="products-hero-panel">
            <div class="hero-panel-card">
              <span class="panel-kicker">Catalog focus</span>
              <h2>Hardware built to feed the InteliMarine AI Stack</h2>
              <p>
                Use this catalog to evaluate vessel coverage, shortlist sensor families, and map a deployment from
                individual products to full-system rollouts such as InteliBilge.
              </p>
            </div>
            <div class="hero-panel-points">
              <span>Marine-grade sensing</span>
              <span>Cloud-connected alerts</span>
              <span>Automation-ready workflows</span>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <section class="products-filter">
      <div class="container">
        <div class="filter-header">
          <h2 class="toc-title">{{ t('products.filterBy') }}</h2>
          <p>Filter by system domain to move from overview to specification faster.</p>
        </div>
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
          <div>
            <span class="product-model">{{ entry.model }}</span>
            <h2>{{ entry.name }}</h2>
          </div>
          <span class="product-cat" :data-cat="entry.category">{{ categoryLabel(entry.category) }}</span>
        </header>

        <div class="product-body">
          <div class="product-main">
            <figure v-if="entry.image" class="product-image">
              <img :src="`${baseUrl}${entry.image}`" :alt="`${entry.model} ${entry.name}`" loading="lazy" />
            </figure>
            <div class="product-section">
              <h3>{{ t('products.overview') }}</h3>
              <p class="product-overview">
                <ModelLinkedText :text="entry.overview" />
              </p>
              <p v-if="entry.id === 'intelibilge'" class="product-deep-link">
                <RouterLink to="/intelibilge">{{ t('products.intelibilgeFullPage') }}</RouterLink>
              </p>
            </div>

            <div class="product-grid-two">
              <div class="product-section">
                <h3>{{ t('products.features') }}</h3>
                <ul class="feature-list">
                  <li v-for="(f, i) in entry.features" :key="i">
                    <ModelLinkedText :text="f" />
                  </li>
                </ul>
              </div>

              <div class="product-section">
                <h3>{{ t('products.applications') }}</h3>
                <p class="applications">
                  <ModelLinkedText :text="entry.applications" />
                </p>
              </div>
            </div>

            <template v-if="isSystem(entry)">
              <div class="product-section">
                <h3>{{ t('products.howItWorks') }}</h3>
                <ol class="how-list">
                  <li v-for="(step, i) in entry.howItWorks" :key="i">
                    <ModelLinkedText :text="step" />
                  </li>
                </ol>
              </div>
            </template>

            <div class="product-section">
              <h3>{{ t('products.ordering') }}</h3>
              <p class="ordering">
                <ModelLinkedText :text="entry.ordering" />
              </p>
            </div>

            <template v-if="isSystem(entry) && entry.whatsIncluded?.length">
              <div class="product-section">
                <h3>{{ t('products.whatsIncluded') }}</h3>
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
        <div class="footnote-panel">
          <p>{{ t('products.disclaimer') }}</p>
          <p class="contact-line">{{ t('products.contact') }}</p>
          <RouterLink to="/" class="back-link">{{ t('products.backHome') }}</RouterLink>
        </div>
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
const baseUrl = import.meta.env.BASE_URL

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
.products-page {
  padding-top: 5rem;
  min-height: 60vh;
}

.products-hero,
.products-filter,
.products-toc,
.products-footnote,
.product-block {
  border-bottom: 1px solid var(--border-subtle);
}

.products-hero {
  padding: 5rem 0 4rem;
}

.products-hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.85fr);
  gap: 2rem;
  align-items: start;
}

.products-lead,
.filter-header p,
.product-overview,
.applications,
.ordering,
.footnote-panel p {
  color: var(--text-secondary);
  line-height: 1.7;
}

.products-hero-panel,
.hero-panel-card,
.footnote-panel {
  display: grid;
  gap: 1rem;
}

.hero-panel-card,
.footnote-panel {
  padding: 1.5rem;
  border-radius: 1.25rem;
  border: 1px solid var(--border-medium);
  background: var(--glass-bg);
}

.panel-kicker {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--brand-marine-blue);
}

[data-theme="dark"] .panel-kicker {
  color: #6FA0CC;
}

.hero-panel-card h2 {
  font-size: clamp(1.4rem, 2vw, 2rem);
}

.hero-panel-points {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.hero-panel-points span,
.toc-chip,
.filter-chip,
.product-cat {
  border-radius: 999px;
}

.hero-panel-points span {
  padding: 0.5rem 0.9rem;
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
}

.products-filter,
.products-toc,
.products-footnote {
  padding: 2rem 0;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: end;
  margin-bottom: 1rem;
}

.filter-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-chip {
  padding: 0.55rem 1rem;
  border: 1.5px solid var(--border-medium);
  background: transparent;
  color: var(--text-secondary);
  font-family: 'Montserrat', sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}

.filter-chip:hover {
  border-color: var(--brand-marine-blue);
  color: var(--text-primary);
}

.filter-chip.active {
  background: var(--brand-marine-blue);
  border-color: var(--brand-marine-blue);
  color: #ffffff;
}

.toc-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.toc-chip {
  display: inline-flex;
  gap: 0.55rem;
  padding: 0.75rem 1rem;
  text-decoration: none;
  border: 1px solid var(--border-medium);
  color: var(--text-secondary);
  background: var(--surface-soft);
  transition: border-color 0.2s, color 0.2s, background 0.2s;
}

.toc-chip:hover {
  color: var(--text-primary);
  border-color: var(--brand-marine-blue);
  background: rgba(31, 78, 121, 0.06);
}

.toc-model {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--brand-marine-blue);
}

[data-theme="dark"] .toc-model {
  color: #6FA0CC;
}

.product-block {
  padding: 3rem 0;
}

.product-header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: end;
  margin-bottom: 1.5rem;
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

.footnote-panel {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: center;
}

@media (max-width: 980px) {
  .products-hero-grid,
  .product-body,
  .product-grid-two,
  .footnote-panel {
    grid-template-columns: 1fr;
  }

  .filter-header,
  .product-header {
    align-items: start;
    flex-direction: column;
  }
}
</style>
