<template>
  <main class="contact-page">
    <section class="page-hero">
      <div class="container">
        <nav class="page-breadcrumb" aria-label="Breadcrumb">
          <RouterLink to="/">{{ t('nav.home') }}</RouterLink>
          <span aria-hidden="true">›</span>
          <span class="page-breadcrumb-current">{{ t('nav.contact') }}</span>
        </nav>
        <div class="section-label">{{ t('nav.contact') }}</div>
        <h1>{{ t('contact.title') }}</h1>
        <p class="page-lead">{{ t('contact.lead') }}</p>
      </div>
    </section>

    <ClosingSection />
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from '@/composables/useI18n'
import { useFadeIn } from '@/composables/useFadeIn'
import ClosingSection from '@/components/sections/ClosingSection.vue'

const { t } = useI18n()
useFadeIn('.contact-page')
</script>

<style scoped>
.contact-page {
  padding-top: 5rem;
  min-height: 60vh;
}

.page-hero {
  padding: 3rem 0 2.5rem;
  border-bottom: 1px solid var(--border-subtle);
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
</style>
