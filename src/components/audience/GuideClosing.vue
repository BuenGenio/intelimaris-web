<template>
  <section class="guide-closing">
    <div class="editorial-shell closing-layout">
      <div>
        <p class="editorial-eyebrow">Your next step</p>
        <h2>{{ title || audience?.cta || 'Let’s find your place on the water.' }}</h2>
        <p>Tell us what you need to do. We’ll start with the workflow that matters to you.</p>
      </div>
      <RouterLink :to="contactLink(audience, topic)" class="editorial-button">Talk to the team <span aria-hidden="true">↗</span>
      </RouterLink>
    </div>
  </section>
</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { contactLink, type Audience } from '@/data/audiences'
defineProps<{ audience?: Audience; topic?: string; title?: string }>()
</script>
