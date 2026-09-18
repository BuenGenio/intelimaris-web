<template>
  <nav class="site-breadcrumbs" aria-label="Breadcrumb">
    <ol>
      <li><RouterLink v-if="items.length" to="/">{{ t('nav.home') }}</RouterLink><span v-else aria-current="page">{{ t('nav.home') }}</span></li>
      <li v-for="(item, index) in items" :key="index">
        <span class="breadcrumb-separator" aria-hidden="true">/</span>
        <RouterLink v-if="item.to && index < items.length - 1" :to="item.to">{{ item.label }}</RouterLink>
        <span v-else :aria-current="index === items.length - 1 ? 'page' : undefined">{{ item.label }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useBreadcrumbs } from '@/composables/useBreadcrumbs'
import { useI18n } from '@/composables/useI18n'

const items = useBreadcrumbs()
const { t } = useI18n()
</script>

<style scoped>
.site-breadcrumbs { font-size: .76rem; line-height: 1.5; color: var(--text-secondary); min-width:0; }
.site-breadcrumbs ol { display:flex; align-items:center; gap:12px; list-style:none; padding:0; margin:0; min-height:39px; overflow-x:auto; scrollbar-width:none; }
.site-breadcrumbs ol::-webkit-scrollbar { display:none; }
.site-breadcrumbs li { display:flex; align-items:center; gap:12px; flex-shrink:0; }
.site-breadcrumbs a { display:inline-flex; align-items:center; min-height:39px; color:var(--domain-ink); text-decoration:none; }
.site-breadcrumbs a:hover { text-decoration:underline; text-underline-offset:4px; }
.site-breadcrumbs a:focus-visible { outline:2px solid var(--domain-ink); outline-offset:-2px; border-radius:2px; }
.site-breadcrumbs [aria-current='page'] { color:var(--text-primary); }
.breadcrumb-separator { color:var(--text-muted); }
</style>
