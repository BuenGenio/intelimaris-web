<template>
  <nav class="site-breadcrumbs" aria-label="Breadcrumb">
    <ol>
      <li><RouterLink to="/">{{ t('nav.home') }}</RouterLink></li>
      <li v-for="(item, index) in items" :key="index">
        <span class="breadcrumb-separator" aria-hidden="true">/</span>
        <RouterLink v-if="item.to && index < items.length - 1" :to="item.to">{{ item.label }}</RouterLink>
        <span v-else :aria-current="index === items.length - 1 ? 'page' : undefined">{{ item.label }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink, type RouteLocationRaw } from 'vue-router'
import { useI18n } from '@/composables/useI18n'

defineProps<{ items: { label: string; to?: RouteLocationRaw }[] }>()
const { t } = useI18n()
</script>

<style scoped>
.site-breadcrumbs { margin-bottom: 32px; font-size: .8rem; line-height: 1.5; color: var(--text-secondary); }
.site-breadcrumbs ol { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 12px; list-style: none; padding: 0; margin: 0; }
.site-breadcrumbs li { display: flex; align-items: baseline; gap: 12px; min-width: 0; }
.site-breadcrumbs a { display: inline-flex; align-items: center; min-height: 32px; color: var(--domain-ink); text-decoration: none; overflow-wrap: anywhere; }
.site-breadcrumbs a:hover { text-decoration: underline; text-underline-offset: 4px; }
.site-breadcrumbs a:focus-visible { outline: 2px solid var(--domain-ink); outline-offset: 4px; border-radius: 2px; }
.site-breadcrumbs [aria-current='page'] { color: var(--text-primary); overflow-wrap: anywhere; }
.breadcrumb-separator { color: var(--text-muted); flex-shrink: 0; }
@media (max-width: 560px) {
  .site-breadcrumbs { margin-bottom: 24px; }
  .site-breadcrumbs ol, .site-breadcrumbs li { column-gap: 8px; }
}
</style>
