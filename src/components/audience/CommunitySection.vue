<template>
  <section class="editorial-section community">
    <div class="editorial-shell">
      <div class="section-intro">
        <div>
          <p class="editorial-eyebrow">Boaters, crews and marinas</p>
          <h2>Better together on the water.</h2>
        </div>
        <p>A useful detail helps the next person: the crew member joining aboard, the dockmaster expecting an arrival or the technician coming to service a vessel. Keep that information with the vessel or place it belongs to.</p>
      </div>
      <div class="community-grid">
        <article v-for="card in CARDS" :key="card.title" class="community-card">
          <span class="community-icon"><RoleIcon :id="card.icon" /></span>
          <h3>{{ card.title }}</h3>
          <p>{{ card.body }}</p>
          <RouterLink :to="card.to" class="editorial-text-link">{{ card.link }} <span aria-hidden="true">↗</span></RouterLink>
        </article>
      </div>
      <div class="community-cta">
        <p>Start with your role. Explore what connects your part of the day.</p>
        <button type="button" class="editorial-button" @click="start(undefined, $event.currentTarget as HTMLElement)">Start free <span aria-hidden="true">→</span></button>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import RoleIcon from '@/components/onboarding/RoleIcon.vue'
import { RouterLink } from 'vue-router'
import { useOnboarding } from '@/composables/useOnboarding'
const { start } = useOnboarding()
const CARDS = [
  { icon: 'crew', title: 'Bring the crew into the vessel’s workspace', body: 'Invite the people aboard with the access they need. Vessel details, available readings and crew conversations stay with the vessel.', to: '/for/crew', link: 'Explore the crew guide' },
  { icon: 'marina-teams', title: 'Prepare for the next arrival', body: 'Connect a stay with the vessel’s dimensions and its assigned berth. Give the dock team the approach details they need to meet the arrival.', to: '/for/marina-teams', link: 'Explore the dock team guide' },
  { icon: 'maintenance', title: 'Give a technician the right context', body: 'An agreed service engagement connects the company with the vessel. Assigned technicians see the service information they need, while private crew conversations stay with the crew.', to: '/for/maintenance', link: 'Explore the service guide' },
  { icon: 'captains', title: 'Understand a report before acting on it', body: 'View reported hazards around a passage. Try the local reporting simulation to see the direction of the work; submitting, confirming and clearing reports in the app are still being developed.', to: '/capabilities/hazard-reporting', link: 'Explore hazards and reporting' },
]
</script>
