<template>
  <main class="editorial-page" lang="en">
    <section class="editorial-shell guide-hero">
      <SiteBreadcrumbs :items="[{ label: 'Page not found' }]" />
      <p class="editorial-eyebrow">Page not found</p>
      <h1>Let’s get you<br>back on course.</h1>
      <p class="editorial-lede">That page is not in this guide. Start with your role or explore the platform.</p>
      <div class="editorial-actions">
        <RouterLink to="/" class="editorial-button">Find your role →</RouterLink>
        <RouterLink to="/capabilities" class="editorial-text-link">Explore the platform</RouterLink>
      </div>
    </section>
  </main>
</template>
<script setup lang="ts">
import SiteBreadcrumbs from '@/components/SiteBreadcrumbs.vue'
import { RouterLink } from 'vue-router'</script>
