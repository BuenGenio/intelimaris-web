<template>
  <main class="categories-page">
    <section class="cats-hero">
      <div class="container">
        <div class="section-label">{{ t('categories.label') }}</div>
        <h1>{{ t('categories.title') }}</h1>
        <p class="cats-lead">{{ t('categories.lead') }}</p>
      </div>
    </section>

    <section class="cats-grid-section">
      <div class="container">
        <div class="cats-grid">
          <RouterLink
            v-for="cat in categories"
            :key="cat.id"
            :to="{ name: 'product-category', params: { category: cat.id } }"
            class="cat-card fade-in"
          >
            <div class="cat-card-media">
              <img :src="`${baseUrl}${cat.image}`" :alt="categoryLabel(cat.id)" loading="lazy" />
            </div>
            <div class="cat-card-body">
              <span class="cat-card-count">
                {{ countFor(cat.id) }} {{ countFor(cat.id) === 1 ? t('categories.productSingular') : t('categories.productPlural') }}
              </span>
              <h2>{{ categoryLabel(cat.id) }}</h2>
              <p>{{ blurbFor(cat.id) }}</p>
              <span class="cat-card-cta">{{ t('categories.viewCategory') }} →</span>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="cats-footnote">
      <div class="container">
        <div class="footnote-panel">
          <p>{{ t('categories.footnote') }}</p>
          <RouterLink to="/products" class="back-link">{{ t('categories.viewFullCatalog') }}</RouterLink>
        </div>
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

const { t } = useI18n()
useFadeIn('.categories-page')
const baseUrl = import.meta.env.BASE_URL

const categories = computed(() =>
  CATEGORY_ORDER.filter((id) => productsByCategory(id).length > 0).map((id) => categoryMeta[id]),
)

function countFor(id: ProductCategory): number {
  return productsByCategory(id).length
}

function categoryLabel(id: ProductCategory): string {
  const key = `products.category.${id}`
  const label = t(key)
  return label === key ? id : label
}

function blurbFor(id: ProductCategory): string {
  const key = `products.categoryBlurb.${id}`
  const label = t(key)
  return label === key ? '' : label
}
</script>

<style scoped>
.categories-page {
  padding-top: 5rem;
  min-height: 60vh;
}

.cats-hero,
.cats-grid-section,
.cats-footnote {
  border-bottom: 1px solid var(--border-subtle);
}

.cats-hero {
  padding: 5rem 0 3rem;
}

.cats-hero h1 {
  font-size: clamp(2rem, 3.4vw, 3rem);
  margin-bottom: 1rem;
}

.cats-lead {
  max-width: 48rem;
  color: var(--text-secondary);
  line-height: 1.7;
}

.cats-grid-section {
  padding: 3rem 0;
}

.cats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: 1.5rem;
}

.cat-card {
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

.cat-card:hover {
  transform: translateY(-4px);
  border-color: var(--brand-marine-blue);
  box-shadow: 0 14px 32px rgba(15, 42, 68, 0.12);
}

.cat-card-media {
  height: 11rem;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--border-subtle);
}

[data-theme="dark"] .cat-card-media {
  background: rgba(255, 255, 255, 0.04);
}

.cat-card-media img {
  max-width: 70%;
  max-height: 80%;
  object-fit: contain;
}

.cat-card-body {
  padding: 1.4rem 1.5rem 1.6rem;
  display: grid;
  gap: 0.5rem;
}

.cat-card-count {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--brand-marine-blue);
}

[data-theme="dark"] .cat-card-count {
  color: #6FA0CC;
}

.cat-card-body h2 {
  font-size: 1.35rem;
}

.cat-card-body p {
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: 0.95rem;
}

.cat-card-cta {
  margin-top: 0.5rem;
  font-weight: 600;
  color: var(--brand-marine-blue);
}

[data-theme="dark"] .cat-card-cta {
  color: #6FA0CC;
}

.cats-footnote {
  padding: 2.5rem 0;
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

@media (max-width: 720px) {
  .footnote-panel {
    grid-template-columns: 1fr;
  }

  .back-link {
    text-align: left;
  }
}
</style>
