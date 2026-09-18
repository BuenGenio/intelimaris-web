<template>
  <!-- The mark's crest, extended. The brand's only decorative device:
       at most once per surface. -->
  <svg
    class="wave-rule"
    :class="{ 'wave-rule--center': center }"
    viewBox="0 0 440 22"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M2 15.5c34-11 58 3.5 92 3.5s58-14.5 92-14.5 58 14.5 92 14.5 58-14.5 92-14.5c26 0 48 8 68 12"
      stroke="currentColor"
      stroke-width="2.4"
      stroke-linecap="round"
      opacity="0.85"
    />
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ center?: boolean }>(), { center: false })
</script>
