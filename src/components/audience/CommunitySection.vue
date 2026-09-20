<template>
  <section class="editorial-section community">
    <div class="editorial-shell">
      <div class="section-intro">
        <div>
          <p class="editorial-eyebrow">Boaters, crews and marinas</p>
          <h2>Better together on the water.</h2>
        </div>
        <p>A sign-up takes a mobile number and a name. What you add after that helps the people around you: the crew joining aboard, the marina expecting you, the boater a mile behind.</p>
      </div>
      <div class="community-grid">
        <article v-for="card in CARDS" :key="card.title" class="community-card">
          <span class="community-icon"><RoleIcon :id="card.icon" /></span>
          <h3>{{ card.title }}</h3>
          <p>{{ card.body }}</p>
          <p class="community-status"><span class="badge-status" :data-state="card.status === 'Live' ? 'live' : 'building'">{{ card.status }}</span></p>
        </article>
      </div>
      <div class="community-cta">
        <p>Bring your vessel. Bring your crew. One text message starts it.</p>
        <button type="button" class="editorial-button" @click="start(undefined, $event.currentTarget as HTMLElement)">Start free <span aria-hidden="true">→</span></button>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import RoleIcon from '@/components/onboarding/RoleIcon.vue'
import { useOnboarding } from '@/composables/useOnboarding'
const { start } = useOnboarding()
const CARDS = [
  { icon: 'captains', title: 'Hazards, reported by the people who found them', body: 'A submerged post, a shoaled bend, a closed bridge. Report it once and every planner on the water routes around it, with the report’s age on it.', status: 'Live' },
  { icon: 'crew', title: 'Your crew and passengers, on the same passage', body: 'Share the plan with the people aboard. They see the route, the stops and the arrival time on their own phone.', status: 'Live' },
  { icon: 'marina-teams', title: 'Marinas that know who is arriving', body: 'Request a berth from the chart. The dockmaster sees your length, draft and time of arrival before you round the breakwater.', status: 'Live' },
  { icon: 'fleet-owners', title: 'A profile with your vessel, photos and video', body: 'Put a face on the boat. A photo of the transom and a short clip of the approach help a marina, a technician or a new crew member recognise you.', status: 'In development' },
]
</script>
