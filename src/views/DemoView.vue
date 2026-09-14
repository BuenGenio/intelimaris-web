<template>
  <main class="demo-page">
    <section class="page-hero">
      <div class="container">
        <nav class="page-breadcrumb" aria-label="Breadcrumb">
          <RouterLink to="/">{{ t('nav.home') }}</RouterLink>
          <span aria-hidden="true">›</span>
          <span class="page-breadcrumb-current">{{ t('demo.label') }}</span>
        </nav>
        <div class="section-label">{{ t('demo.label') }}</div>
        <h1>{{ t('demo.title') }}</h1>
        <p class="page-lead">{{ t('demo.lead') }}</p>
      </div>
    </section>

    <section class="demo-cards">
      <div class="container">
        <div class="demo-grid">
          <article class="demo-card fade-in">
            <span class="demo-index">01</span>
            <h2>{{ t('demo.card.lidar.title') }}</h2>
            <p>{{ t('demo.card.lidar.desc') }}</p>
            <ul class="demo-specs">
              <li><strong>220.4 M</strong><span>{{ t('demo.spec.sourcePoints') }}</span></li>
              <li><strong>1.18 M</strong><span>{{ t('demo.spec.webPoints') }}</span></li>
              <li><strong>0.8 m</strong><span>{{ t('demo.spec.voxel') }}</span></li>
              <li><strong>LAS 1.4</strong><span>{{ t('demo.spec.format') }}</span></li>
            </ul>
          </article>
          <article class="demo-card fade-in" :style="{ transitionDelay: '0.08s' }">
            <span class="demo-index">02</span>
            <h2>{{ t('demo.card.marina.title') }}</h2>
            <p>{{ t('demo.card.marina.desc') }}</p>
            <RouterLink :to="{ name: 'demo-marina' }" class="demo-cta">{{ t('demo.cta') }} →</RouterLink>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from '@/composables/useI18n'
import { useFadeIn } from '@/composables/useFadeIn'

const { t } = useI18n()
useFadeIn('.demo-page')
</script>

<style scoped>
.demo-page { padding-top: 5rem; min-height: 60vh; }
.page-hero { padding: 3rem 0 2.5rem; border-bottom: 1px solid var(--border-subtle); }
.page-breadcrumb { display: flex; flex-wrap: wrap; gap: 0.45rem; align-items: center; font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1.5rem; }
.page-breadcrumb a { color: var(--brand-marine-blue); text-decoration: none; }
[data-theme="dark"] .page-breadcrumb a { color: #6FA0CC; }
.page-breadcrumb a:hover { text-decoration: underline; }
.page-breadcrumb-current { color: var(--text-primary); font-weight: 600; }
.page-hero h1 { margin: 0.5rem 0 1rem; }
.page-lead { max-width: 48rem; color: var(--text-secondary); line-height: 1.7; }
.demo-cards { padding: 3rem 0 5rem; }
.demo-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
.demo-card { padding: 1.6rem; border-radius: 1.25rem; border: 1px solid var(--border-medium); background: var(--glass-bg); }
.demo-index { display: inline-block; margin-bottom: 0.75rem; font-family: 'Montserrat', sans-serif; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.12em; color: var(--brand-marine-blue); }
[data-theme="dark"] .demo-index { color: #6FA0CC; }
.demo-card h2 { margin-bottom: 0.75rem; font-size: clamp(1.3rem, 2vw, 1.7rem); }
.demo-card p { color: var(--text-secondary); line-height: 1.7; }
.demo-specs { list-style: none; margin: 1.25rem 0 0; padding: 0; display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
.demo-specs li { padding: 0.8rem 0.9rem; border-radius: 0.9rem; border: 1px solid var(--border-subtle); background: var(--surface-soft); }
.demo-specs strong { display: block; font-family: 'Montserrat', sans-serif; font-size: 1.25rem; color: var(--brand-marine-blue); }
[data-theme="dark"] .demo-specs strong { color: #6FA0CC; }
.demo-specs span { font-size: 0.8rem; color: var(--text-secondary); }
.demo-cta { display: inline-block; margin-top: 1.25rem; color: var(--brand-marine-blue); font-weight: 600; text-decoration: none; }
[data-theme="dark"] .demo-cta { color: #6FA0CC; }
.demo-cta:hover { text-decoration: underline; }
@media (max-width: 820px) { .demo-grid { grid-template-columns: 1fr; } }
</style>
