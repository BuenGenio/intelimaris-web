<template>
  <span class="partner-logo" :style="{ '--partner-size': `${size}px` }">
    <img class="partner-logo-light" :src="logo.light" :alt="logo.name" :width="size" :height="size" />
    <img class="partner-logo-dark" :src="logo.dark" :alt="logo.name" :width="size" :height="size" />
  </span>
</template>

<script setup lang="ts">
defineProps<{ logo: { name: string; light: string; dark: string }; size: number }>()
</script>

<style scoped>
.partner-logo { display: inline-flex; align-items: center; line-height: 0; }
.partner-logo img { display: block; width: var(--partner-size); height: var(--partner-size); }
.partner-logo-dark { display: none !important; }
[data-theme='dark'] .partner-logo-light { display: none !important; }
[data-theme='dark'] .partner-logo-dark { display: block !important; }
</style>
