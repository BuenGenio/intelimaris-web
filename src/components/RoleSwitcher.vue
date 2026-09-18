<template>
  <div ref="root" class="role-switcher" @keydown.esc.stop="close(true)" @focusout="onFocusOut">
    <button ref="trigger" type="button" class="role-trigger" aria-label="Your role" title="Your role" :class="{ 'has-role': audience }" :aria-expanded="open" aria-controls="role-options" aria-haspopup="dialog" @click="toggle">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="8" r="3.5" /><path d="M5 21v-2a7 7 0 0 1 14 0v2" /></svg>
      <span>Your role</span><span class="role-chevron" aria-hidden="true">⌄</span>
    </button>
    <div v-if="open" id="role-options" class="role-popover" role="dialog" aria-labelledby="role-options-title">
      <div class="role-popover-heading"><div><p class="editorial-eyebrow">Your perspective</p><h2 id="role-options-title">Find your view.</h2></div><button type="button" class="role-close" aria-label="Close role selector" @click="close(true)">×</button></div>
      <p class="role-current">{{ audience ? audience.label : 'Explore with a role, or browse the whole platform.' }}</p>
      <div class="role-options-grid">
        <div v-for="group in groups" :key="group.id"><h3>{{ group.label }}</h3><button v-for="person in AUDIENCES.filter(a => a.group === group.id)" :key="person.id" type="button" :aria-pressed="audience?.id === person.id" @click="select(person.id)">{{ person.label }}<span v-if="audience?.id === person.id" aria-hidden="true">✓</span></button></div>
      </div>
      <button type="button" class="role-clear" @click="select(null)">Browse without a role <span aria-hidden="true">↗</span></button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, nextTick, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vue-router'
import { AUDIENCES } from '@/data/audiences'
import { useAudience } from '@/composables/useAudience'
const { audience, switchAudience } = useAudience()
const route = useRoute()
const root = ref<HTMLElement | null>(null)
const trigger = ref<HTMLButtonElement | null>(null)
const open = ref(false)
const groups = [{ id: 'aboard', label: 'On the water' }, { id: 'ashore', label: 'On shore' }]
async function close(restoreFocus = false) { open.value = false; if (restoreFocus) { await nextTick(); trigger.value?.focus() } }
async function toggle() {
  open.value = !open.value
  if (open.value) { await nextTick(); root.value?.querySelector<HTMLButtonElement>('.role-options-grid button')?.focus() }
}
async function select(id: string | null) { await switchAudience(id); await close(true) }
function onPointerDown(event: PointerEvent) { if (!root.value?.contains(event.target as Node)) close() }
function onFocusOut(event: FocusEvent) { if (event.relatedTarget && !root.value?.contains(event.relatedTarget as Node)) close() }
watch(() => route.fullPath, () => close())
onMounted(() => document.addEventListener('pointerdown', onPointerDown))
onBeforeUnmount(() => document.removeEventListener('pointerdown', onPointerDown))
</script>
