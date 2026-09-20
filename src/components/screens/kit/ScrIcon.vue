<template>
  <svg class="scr-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <template v-if="name === 'gauge'"><path d="M4 14a8 8 0 0 1 16 0" /><path d="M12 14l4-4" /><path d="M4 18h16" /></template>
    <template v-else-if="name === 'map'"><path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z" /><path d="M9 4v14M15 6v14" /></template>
    <template v-else-if="name === 'vessel'"><path d="M3 15h18l-2 4H5zM6 15V9h5l3-3h4v9" /></template>
    <template v-else-if="name === 'radio'"><circle cx="12" cy="12" r="2" /><path d="M7.5 7.5a6.4 6.4 0 0 0 0 9M16.5 7.5a6.4 6.4 0 0 1 0 9M4.7 4.7a10.3 10.3 0 0 0 0 14.6M19.3 4.7a10.3 10.3 0 0 1 0 14.6" /></template>
    <template v-else-if="name === 'wrench'"><path d="M14.5 6.5a4 4 0 0 0-5 5L4 17l3 3 5.5-5.5a4 4 0 0 0 5-5l-2.5 2.5-2-2z" /></template>
    <template v-else-if="name === 'users'"><circle cx="9" cy="8" r="3" /><circle cx="17" cy="10" r="2.4" /><path d="M3 19c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5M15 19c0-2 1.5-3.5 3.5-3.5S22 17 22 19" /></template>
    <template v-else-if="name === 'anchor'"><circle cx="12" cy="5" r="2.5" /><path d="M12 7.5V21M5 13a7 7 0 0 0 14 0M8 13H5M19 13h-3" /></template>
    <template v-else-if="name === 'message'"><path d="M4 5h16v11H9l-5 4z" /></template>
    <template v-else-if="name === 'calendar'"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></template>
    <template v-else-if="name === 'receipt'"><path d="M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6" /></template>
    <template v-else-if="name === 'list'"><path d="M8 6h13M8 12h13M8 18h13M3 6h1M3 12h1M3 18h1" /></template>
    <template v-else-if="name === 'alert'"><path d="M12 3 2 21h20zM12 10v5M12 18v.5" /></template>
    <template v-else-if="name === 'chart'"><path d="M4 20V4M4 20h16M8 16v-5M12 16V8M16 16v-3" /></template>
    <template v-else-if="name === 'settings'"><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" /></template>
    <template v-else-if="name === 'store'"><path d="M4 9l1-4h14l1 4M4 9v11h16V9M4 9h16M10 20v-6h4v6" /></template>
    <template v-else-if="name === 'activity'"><path d="M3 12h4l3-7 4 14 3-7h4" /></template>
    <template v-else-if="name === 'bell'"><path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 20a2 2 0 0 0 4 0" /></template>
    <template v-else-if="name === 'search'"><circle cx="11" cy="11" r="6" /><path d="m20 20-4.5-4.5" /></template>
    <template v-else-if="name === 'plus'"><path d="M12 5v14M5 12h14" /></template>
    <template v-else-if="name === 'chevron'"><path d="m9 6 6 6-6 6" /></template>
    <template v-else-if="name === 'back'"><path d="m15 6-6 6 6 6" /></template>
    <template v-else-if="name === 'check'"><path d="m5 12 4 4L19 7" /></template>
    <template v-else-if="name === 'x'"><path d="M6 6l12 12M18 6 6 18" /></template>
    <template v-else-if="name === 'phone'"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></template>
    <template v-else-if="name === 'camera'"><path d="M4 8h3l2-3h6l2 3h3v11H4z" /><circle cx="12" cy="13" r="3.5" /></template>
    <template v-else-if="name === 'home'"><path d="M3 11 12 4l9 7M5 10v10h14V10M10 20v-6h4v6" /></template>
    <template v-else-if="name === 'compass'"><circle cx="12" cy="12" r="9" /><path d="m15 9-2 6-4 0 2-6z" /></template>
    <template v-else-if="name === 'user'"><circle cx="12" cy="8" r="3.5" /><path d="M5 20c0-3.9 3.1-6.5 7-6.5s7 2.6 7 6.5" /></template>
    <template v-else-if="name === 'fuel'"><path d="M5 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M5 21h10M7 9h6M15 10h2a2 2 0 0 1 2 2v5a1.5 1.5 0 0 0 3 0V9l-3-3" /></template>
    <template v-else-if="name === 'battery'"><rect x="3" y="8" width="16" height="9" rx="2" /><path d="M21 11v3M6 11v3M9 11v3" /></template>
    <template v-else-if="name === 'drop'"><path d="M12 3s-6 7-6 11a6 6 0 0 0 12 0c0-4-6-11-6-11z" /></template>
    <template v-else-if="name === 'temp'"><path d="M10 14V5a2 2 0 0 1 4 0v9a3.5 3.5 0 1 1-4 0z" /></template>
    <template v-else-if="name === 'lock'"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></template>
    <template v-else-if="name === 'dots'"><circle cx="5" cy="12" r="1.2" /><circle cx="12" cy="12" r="1.2" /><circle cx="19" cy="12" r="1.2" /></template>
    <template v-else-if="name === 'filter'"><path d="M3 5h18l-7 8v6l-4 2v-8z" /></template>
    <template v-else-if="name === 'download'"><path d="M12 3v12M7 10l5 5 5-5M4 21h16" /></template>
    <template v-else-if="name === 'clock'"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></template>
    <template v-else-if="name === 'pin'"><path d="M12 21s-6-5.7-6-11a6 6 0 0 1 12 0c0 5.3-6 11-6 11z" /><circle cx="12" cy="10" r="2" /></template>
    <template v-else-if="name === 'wave'"><path d="M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0 2 2 2 2M2 17c2-2 4-2 6 0s4 2 6 0 4-2 6 0" /></template>
    <template v-else><circle cx="12" cy="12" r="8" /></template>
  </svg>
</template>
<script setup lang="ts">
defineProps<{ name: string }>()
</script>
