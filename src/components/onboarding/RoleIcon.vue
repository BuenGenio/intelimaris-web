<template>
  <!-- One glyph per role, drawn on a 24-unit grid with a single stroke weight. -->
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <template v-if="id === 'captains'"><circle cx="12" cy="12" r="7" /><circle cx="12" cy="12" r="2.2" /><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8" /></template>
    <template v-else-if="id === 'passengers'"><circle cx="12" cy="8" r="3.4" /><path d="M5 20c0-3.9 3.1-6.5 7-6.5s7 2.6 7 6.5" /></template>
    <template v-else-if="id === 'crew'"><circle cx="8.5" cy="8.5" r="2.8" /><circle cx="16" cy="9.5" r="2.4" /><path d="M3.5 19c0-3.2 2.2-5.3 5-5.3s5 2.1 5 5.3M13.6 18.6c.4-2.4 2-3.9 4.2-3.9 1.5 0 2.7.7 3.2 1.9" /></template>
    <template v-else-if="id === 'fleet-owners'"><path d="M3 15h18l-2 4H5zM6 15V9h5l3-3h4v9M8 12h6" /></template>
    <template v-else-if="id === 'marina-owners'"><path d="M3 20h18M4 20V9l8-5 8 5v11M9 20v-6h6v6M12 4v3" /></template>
    <template v-else-if="id === 'marina-teams'"><path d="M3 18c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0 3-1 4.5 0M4 14V6h4v8M12 14V9h4v5M8 10h4" /></template>
    <template v-else-if="id === 'maintenance'"><path d="M14.5 6.5a4 4 0 0 0-5 5L4 17l3 3 5.5-5.5a4 4 0 0 0 5-5l-2.5 2.5-2-2z" /></template>
    <template v-else-if="id === 'private-docks'"><path d="M3 12h18M6 12v8M12 12v8M18 12v8M4 20h16M12 4v8M8 7l4-3 4 3" /></template>
    <template v-else><path d="M4 21V10l4-3 4 3 4-3 4 3v11M4 21h16M9 21v-5h6v5M12 3v4" /></template>
  </svg>
</template>
<script setup lang="ts">
defineProps<{ id: string }>()
</script>
