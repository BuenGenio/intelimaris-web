<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Workspace settings</h1>
        <p class="scr-sub">Wanderer · Vessel</p>
      </div>
      <span class="scr-pill scr-pill--bare">Owner</span>
    </div>
    <div class="scr-tabs scr-tabs--line" style="margin-bottom: 14px"><span class="scr-tab">General</span><span class="scr-tab">People</span><span class="scr-tab is-on">Advanced</span></div>

    <div class="scr-card">
      <h2 class="scr-card-title">Transfer ownership</h2>
      <p class="scr-small scr-muted" style="margin-bottom: 10px">Owner-only, and it cannot be undone.</p>
      <label class="scr-field"><span class="scr-label">New owner</span><select class="scr-select"><option>Select a member…</option><option>Ana Miller</option><option>Luis Ferreira</option></select></label>
      <button class="scr-btn scr-btn--sm" style="margin-top: 10px" disabled>Transfer ownership</button>
    </div>

    <div class="scr-section scr-card">
      <h2 class="scr-card-title">Leave workspace</h2>
      <p class="scr-small scr-muted" style="margin-bottom: 10px">You keep your account and other workspaces.</p>
      <button class="scr-btn scr-btn--sm" disabled>Leave Wanderer</button>
      <p class="scr-micro scr-muted" style="margin-top: 8px">Owners transfer ownership first — a workspace is never left without one.</p>
    </div>

    <div class="scr-section scr-card adv-danger">
      <h2 class="scr-card-title">Delete this workspace</h2>
      <p class="scr-small scr-muted" style="margin-bottom: 10px">Everything in it goes: vessel data, grants and history. The account and its subscription stay. There is no undo.</p>
      <label class="scr-field"><span class="scr-label">Type “Wanderer” to confirm</span><input class="scr-input" :value="confirm" @input="confirm = ($event.target as HTMLInputElement).value" /></label>
      <button class="scr-btn scr-btn--danger scr-btn--sm" style="margin-top: 10px" :disabled="confirm !== 'Wanderer'">Delete workspace</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const confirm = ref('')
</script>

<style scoped>
.adv-danger { border-color: #f3c4c1; background: #fdf3f2; }
.adv-danger .scr-card-title { color: #7c1f1a; }
</style>
