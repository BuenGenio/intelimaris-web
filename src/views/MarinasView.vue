<template>
  <main class="marinas-page">
    <section class="page-hero">
      <div class="container">
        <nav class="page-breadcrumb" aria-label="Breadcrumb">
          <RouterLink to="/">{{ t('nav.home') }}</RouterLink>
          <span aria-hidden="true">›</span>
          <span class="page-breadcrumb-current">{{ t('nav.marina') }}</span>
        </nav>
        <div class="section-label">{{ t('marina.label') }}</div>
        <h1>{{ t('marina.title') }}</h1>
        <p class="page-lead">{{ t('marina.what.p1') }}</p>
      </div>
    </section>

    <MarinaSection />

    <section class="page-footnote">
      <div class="container">
        <div class="footnote-panel">
          <p>{{ t('marinas.footnote') }}</p>
          <RouterLink to="/contact" class="back-link">{{ t('marinas.contactCta') }}</RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from '@/composables/useI18n'
import { useFadeIn } from '@/composables/useFadeIn'
import MarinaSection from '@/components/sections/MarinaSection.vue'

const { t } = useI18n()
useFadeIn('.marinas-page')
</script>

<style scoped>
.marinas-page {
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
