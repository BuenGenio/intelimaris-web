<template>
  <p v-if="currentLanguage !== 'en'" class="language-note" lang="en">These new audience guides are currently available in English. Your language preference is kept for the rest of the site.</p>
</template>
<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'
const { currentLanguage } = useI18n()
</script>
