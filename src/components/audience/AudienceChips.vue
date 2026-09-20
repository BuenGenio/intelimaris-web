<template>
  <div class="audience-chips" role="group" aria-label="Choose your place on the water">
    <button v-for="person in AUDIENCES" :key="person.id" type="button" class="audience-chip" :class="{ ashore: person.group === 'ashore' }" :aria-pressed="selected === person.id" aria-controls="audience-preview" @click="$emit('choose', person.id)">
      <RoleIcon :id="person.id" />
      <span>{{ chipLabel(person) }}</span>
    </button>
  </div>
</template>
<script setup lang="ts">
import { AUDIENCES, type Audience } from '@/data/audiences'
import RoleIcon from '@/components/onboarding/RoleIcon.vue'
defineProps<{ selected?: string }>()
defineEmits<{ choose: [id: string] }>()
/* Chips carry the first name of a paired label: "Captain / navigator" → "Captain". */
const chipLabel = (a: Audience) => a.label.split(' / ')[0]!
</script>
