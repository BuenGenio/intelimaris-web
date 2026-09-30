<template>
  <span class="partner-logo" :style="{ '--logo-width': `${logo.width}px` }">
    <img class="partner-logo-light" :src="logo.light" :alt="logo.name" :width="logo.width" :height="logo.height" />
    <img class="partner-logo-dark" :src="logo.dark" :alt="logo.name" :width="logo.width" :height="logo.height" />
  </span>
</template>

<script setup lang="ts">
defineProps<{ logo: { name: string; light: string; dark: string; width: number; height: number } }>()
</script>

<style scoped>
.partner-logo { display: inline-flex; align-items: center; line-height: 0; max-width: 100%; }
.partner-logo img { display: block; width: var(--logo-width); max-width: 100%; height: auto; }
.partner-logo-dark { display: none !important; }
[data-theme='dark'] .partner-logo-light { display: none !important; }
[data-theme='dark'] .partner-logo-dark { display: block !important; }
</style>
