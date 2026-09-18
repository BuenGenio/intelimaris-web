<template>
  <div class="audience-chooser" role="group" aria-label="Choose your place on the water">
    <div v-for="group in groups" :key="group.id" class="audience-group">
      <h3 class="editorial-eyebrow">{{ group.label }}</h3>
      <button v-for="person in AUDIENCES.filter(a => a.group === group.id)" :key="person.id" type="button" class="audience-choice" :aria-pressed="selected === person.id" aria-controls="audience-preview" @click="$emit('choose', person.id)">
        <span>
          <strong>{{ person.label }}</strong>
          <span>{{ person.intent }}</span>
        </span>
        <span class="choice-arrow" aria-hidden="true">{{ selected === person.id ? '↗' : '→' }}</span>
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { AUDIENCES } from '@/data/audiences'
defineProps<{ selected?: string }>()
defineEmits<{ choose: [id: string] }>()
const groups = [{ id: 'aboard', label: 'On the water' }, { id: 'ashore', label: 'On shore' }]
</script>
