<template>
  <main class="capabilities-page">
    <section class="page-hero">
      <div class="container">
        <nav class="page-breadcrumb" aria-label="Breadcrumb">
          <RouterLink to="/">{{ t('nav.home') }}</RouterLink>
          <span aria-hidden="true">›</span>
          <span class="page-breadcrumb-current">{{ t('nav.capabilities') }}</span>
        </nav>
        <div class="section-label">{{ t('capabilities.label') }}</div>
        <h1>{{ t('capabilities.title') }}</h1>
        <p class="page-lead">{{ t('capabilities.subtitle') }}</p>
      </div>
    </section>

    <CapabilitiesSection />

    <section class="page-footnote">
      <div class="container">
        <div class="footnote-panel">
          <p>{{ t('capabilities.footnote') }}</p>
          <div class="footnote-actions">
            <RouterLink :to="{ name: 'product-categories' }" class="back-link">
              {{ t('capabilities.exploreProducts') }}
            </RouterLink>
            <RouterLink to="/contact" class="back-link">{{ t('marinas.contactCta') }}</RouterLink>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from '@/composables/useI18n'
import { useFadeIn } from '@/composables/useFadeIn'
import CapabilitiesSection from '@/components/sections/CapabilitiesSection.vue'

const { t } = useI18n()
useFadeIn('.capabilities-page')
</script>

<style scoped>
.capabilities-page {
  padding-top: 5rem;
  min-height: 60vh;
}

.page-hero,
.page-footnote {
  border-bottom: 1px solid var(--border-subtle);
}

.page-hero {
  padding: 3rem 0 2.5rem;
}

.page-footnote {
  padding: 2.5rem 0;
}

.page-breadcrumb {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  align-items: center;
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.page-breadcrumb a {
  color: var(--brand-marine-blue);
  text-decoration: none;
}

[data-theme="dark"] .page-breadcrumb a {
  color: #6FA0CC;
}

.page-breadcrumb a:hover {
  text-decoration: underline;
}

.page-breadcrumb-current {
  color: var(--text-primary);
  font-weight: 600;
}

.page-hero h1 {
  margin: 0.5rem 0 1rem;
}

.page-lead {
  max-width: 48rem;
  color: var(--text-secondary);
  line-height: 1.7;
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

.footnote-actions {
  display: grid;
  gap: 0.5rem;
  text-align: right;
}

.back-link {
  color: var(--brand-marine-blue);
  font-weight: 600;
  text-decoration: none;
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

  .footnote-actions {
    text-align: left;
  }
}
</style>
