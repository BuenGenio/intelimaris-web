<template>
  <main class="category-page">
    <template v-if="meta">
      <section class="cv-hero">
        <div class="container">
          <nav class="cv-breadcrumb" aria-label="Breadcrumb">
            <RouterLink to="/products">{{ t('nav.products') }}</RouterLink>
            <span aria-hidden="true">›</span>
            <RouterLink :to="{ name: 'product-categories' }">{{ t('categories.title') }}</RouterLink>
            <span aria-hidden="true">›</span>
            <span class="cv-breadcrumb-current">{{ categoryLabel(meta.id) }}</span>
          </nav>

          <div class="cv-hero-grid">
            <div>
              <span class="section-label">{{ t('categories.label') }}</span>
              <h1>{{ categoryLabel(meta.id) }}</h1>
              <p class="cv-lead">{{ blurb }}</p>
            </div>
            <figure class="cv-hero-image">
              <img :src="`${baseUrl}${meta.image}`" :alt="categoryLabel(meta.id)" loading="lazy" />
            </figure>
          </div>
        </div>
      </section>

      <section class="cv-products-section">
        <div class="container">
          <h2 class="toc-title">
            {{ products.length }}
            {{ products.length === 1 ? t('categories.productSingular') : t('categories.productPlural') }}
          </h2>

          <div class="cv-product-grid">
            <RouterLink
              v-for="p in products"
              :key="p.id"
              :to="{ name: 'product-detail', params: { id: p.id } }"
              class="cv-product-card fade-in"
            >
              <div class="cv-product-media">
                <img v-if="p.image" :src="`${baseUrl}${p.image}`" :alt="`${p.model} ${p.name}`" loading="lazy" />
                <span v-else class="cv-product-placeholder">{{ p.model }}</span>
              </div>
              <div class="cv-product-body">
                <span class="cv-product-model">{{ p.model }}</span>
                <h3>{{ p.name }}</h3>
                <p>{{ p.overview }}</p>
                <span class="cv-product-cta">{{ t('categories.viewProduct') }} →</span>
              </div>
            </RouterLink>
          </div>
        </div>
      </section>

      <section class="cv-footnote">
        <div class="container">
          <div class="footnote-panel">
            <p>{{ t('products.disclaimer') }}</p>
            <RouterLink :to="{ name: 'product-categories' }" class="back-link">
              {{ t('productDetail.backCategories') }}
            </RouterLink>
          </div>
        </div>
      </section>
    </template>

    <section v-else class="cv-missing">
      <div class="container">
        <h1>{{ t('categoryView.notFound') }}</h1>
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
import {
  CATEGORY_ORDER,
  categoryMeta,
  productsByCategory,
  type ProductCategory,
} from '@/data/productCatalog'

const props = defineProps<{ category: string }>()

const { t } = useI18n()
useFadeIn('.category-page')
const baseUrl = import.meta.env.BASE_URL

const meta = computed(() => {
  const slug = props.category as ProductCategory
  return CATEGORY_ORDER.includes(slug) ? categoryMeta[slug] : undefined
})

const products = computed(() => (meta.value ? productsByCategory(meta.value.id) : []))

const blurb = computed(() => {
  if (!meta.value) return ''
  const key = `products.categoryBlurb.${meta.value.id}`
  const label = t(key)
  return label === key ? '' : label
})

function categoryLabel(id: ProductCategory): string {
  const key = `products.category.${id}`
  const label = t(key)
  return label === key ? id : label
}
</script>

<style scoped>
.category-page {
  padding-top: 5rem;
  min-height: 60vh;
}

.cv-hero,
.cv-products-section,
.cv-footnote,
.cv-missing {
  border-bottom: 1px solid var(--border-subtle);
}

.cv-hero {
  padding: 3rem 0 3rem;
}

.cv-products-section {
  padding: 3rem 0;
}

.cv-footnote {
  padding: 2.5rem 0;
}

.cv-missing {
  padding: 5rem 0;
  text-align: center;
}

.cv-breadcrumb {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  align-items: center;
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.cv-breadcrumb a {
  color: var(--brand-marine-blue);
  text-decoration: none;
}

[data-theme="dark"] .cv-breadcrumb a {
  color: #6FA0CC;
}

.cv-breadcrumb a:hover {
  text-decoration: underline;
}

.cv-breadcrumb-current {
  color: var(--text-primary);
  font-weight: 600;
}

.cv-hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  gap: 2rem;
  align-items: center;
}

.cv-hero-grid h1 {
  font-size: clamp(2rem, 3.4vw, 2.8rem);
  margin: 0.5rem 0 1rem;
}

.cv-lead {
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 38rem;
}

.cv-hero-image {
  margin: 0;
  border-radius: 1.25rem;
  overflow: hidden;
  border: 1px solid var(--border-medium);
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 14rem;
  box-shadow: 0 8px 24px rgba(15, 42, 68, 0.06);
}

[data-theme="dark"] .cv-hero-image {
  background: rgba(255, 255, 255, 0.04);
}

.cv-hero-image img {
  max-width: 75%;
  max-height: 16rem;
  object-fit: contain;
}

.toc-title {
  margin-bottom: 1.25rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.cv-product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));
  gap: 1.25rem;
}

.cv-product-card {
  display: flex;
  flex-direction: column;
  border-radius: 1.25rem;
  border: 1px solid var(--border-medium);
  background: var(--glass-bg);
  text-decoration: none;
  color: inherit;
  overflow: hidden;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.cv-product-card:hover {
  transform: translateY(-4px);
  border-color: var(--brand-marine-blue);
  box-shadow: 0 14px 32px rgba(15, 42, 68, 0.12);
}

.cv-product-media {
  height: 10rem;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--border-subtle);
}

[data-theme="dark"] .cv-product-media {
  background: rgba(255, 255, 255, 0.04);
}

.cv-product-media img {
  max-width: 65%;
  max-height: 80%;
  object-fit: contain;
}

.cv-product-placeholder {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  letter-spacing: 0.1em;
  font-size: 1.4rem;
  color: var(--text-muted);
}

.cv-product-body {
  padding: 1.2rem 1.4rem 1.4rem;
  display: grid;
  gap: 0.4rem;
}

.cv-product-model {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--brand-marine-blue);
}

[data-theme="dark"] .cv-product-model {
  color: #6FA0CC;
}

.cv-product-body h3 {
  font-size: 1.1rem;
  line-height: 1.3;
}

.cv-product-body p {
  color: var(--text-secondary);
  line-height: 1.55;
  font-size: 0.9rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.cv-product-cta {
  margin-top: 0.4rem;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--brand-marine-blue);
}

[data-theme="dark"] .cv-product-cta {
  color: #6FA0CC;
}

.footnote-panel {
  display: grid;
  grid-template-columns: 2fr 1fr;
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

.back-link {
  color: var(--brand-marine-blue);
  font-weight: 600;
  text-decoration: none;
  text-align: right;
}

[data-theme="dark"] .back-link {
  color: #6FA0CC;
}

.back-link:hover {
  text-decoration: underline;
}

@media (max-width: 880px) {
  .cv-hero-grid,
  .footnote-panel {
    grid-template-columns: 1fr;
  }

  .back-link {
    text-align: left;
  }
}
</style>
