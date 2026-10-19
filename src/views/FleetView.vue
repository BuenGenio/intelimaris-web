<template>
  <main class="editorial-page fleet-page" lang="en">
    <section class="editorial-shell fleet-hero">
      <LanguageNote />
      <p class="editorial-eyebrow">InteliMARIS / Fleet management</p>
      <div class="fleet-intro"><div><h1 data-no-fit>{{ demo ? 'Take the fleet operations desk.' : 'Every vessel. One operating picture.' }}</h1><p class="editorial-lede">{{ demo ? 'Choose a vessel, follow its path and find the reports that need attention. Explore a fictional six-vessel fleet on the Fort Lauderdale waterfront.' : 'An operations headquarters for the water. Bring vessel positions, status, reported paths and speeds into view across company, rental, freight, logistics and safety fleets.' }}</p></div><div class="fleet-intro-actions"><a :href="`${APP_URL}/fleet`" class="editorial-button">Open your fleet <span aria-hidden="true">↗</span></a><RouterLink v-if="!demo" to="/demo/fleet" class="editorial-text-link">Explore the fleet demo <span aria-hidden="true">↗</span></RouterLink><RouterLink :to="{ path: '/contact', query: { audience: 'fleet-management', topic: 'fleet-management' } }" class="editorial-text-link">Plan your fleet setup <span aria-hidden="true">↗</span></RouterLink><RouterLink v-if="demo" to="/fleet-management" class="editorial-text-link">About fleet management <span aria-hidden="true">→</span></RouterLink></div></div>
      <p class="fleet-preview-note">Interactive demonstration · Simulated vessel reports · No account required</p>
    </section>
    <div class="fleet-stage editorial-shell"><FleetOperations /></div>
    <section class="editorial-shell editorial-section">
      <div class="section-intro"><div><p class="editorial-eyebrow">The work behind the fleet</p><h2>One view. Different responsibilities.</h2></div><p>Keep the whole operation in sight, then focus on a vessel or the work that needs attention.</p></div>
      <div class="fleet-markets"><article v-for="(market, i) in FLEET_MARKETS" :key="market.id"><span class="editorial-index">0{{ i + 1 }}</span><h3>{{ market.title }}</h3><p>{{ market.detail }}</p></article></div>
    </section>
    <section class="section-wash editorial-section"><div class="editorial-shell"><div class="section-intro"><div><p class="editorial-eyebrow">From headquarters to the vessel</p><h2>Make the next decision with context.</h2></div><p>The fleet view brings the operation together. Each vessel keeps its own workspace, people, passages and service history.</p></div><ol class="guide-steps"><li><span class="editorial-index">01</span><h3>See the operation</h3><p>Locate vessels on the map. Read speed, course, operating status and the last reported path together. Filter by the work your team is responsible for.</p></li><li><span class="editorial-index">02</span><h3>Check what needs attention</h3><p>Separate an advisory from a lost update. A stale fix stays at its last reported position, with the report age and last known speed visible.</p></li><li><span class="editorial-index">03</span><h3>Open the vessel’s context</h3><p>Use authorized vessel workspaces for crew access, route planning, supported sensors and upkeep. Account administration stays separate from operational access.</p></li></ol><aside class="access-note"><h3>Connecting your fleet</h3><p>This public demonstration uses fictional vessels and simulated reports. Your live fleet requires vessel workspaces you can access, a position source and working connectivity. The connected app refreshes its fleet snapshot every 15 seconds; each position keeps its source and report age. Coverage depends on that source; AIS coverage alone does not guarantee continuous tracking. Discuss your hardware, region, team access and required integrations with us. Rental bookings, cargo dispatch and emergency-service dispatch are not provided by this demo.</p></aside></div></section>
    <section class="editorial-shell editorial-section"><p class="editorial-eyebrow">The connected platform</p><h2>Keep the detail with every vessel.</h2><FeatureLinks :ids="['monitoring', 'route-planning', 'maintenance', 'emergency-assistance']" /></section>
    <GuideClosing :audience="findAudience('fleet-management')" topic="fleet-management" />
  </main>
</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router'
import FleetOperations from '@/components/fleet/FleetOperations.vue'
import FeatureLinks from '@/components/audience/FeatureLinks.vue'
import GuideClosing from '@/components/audience/GuideClosing.vue'
import LanguageNote from '@/components/audience/LanguageNote.vue'
import { APP_URL } from '@/data/app'
import { findAudience } from '@/data/audiences'
import { FLEET_MARKETS } from '@/data/playbook/fleet-scene'
defineProps<{ demo?: boolean }>()
</script>
<style scoped>
.fleet-hero { padding-top:42px; padding-bottom:20px; }
.fleet-intro { display:grid; grid-template-columns:minmax(0,1fr) auto; align-items:end; gap:35px; }
.fleet-intro h1 { max-width:18ch; margin:12px 0 18px; font-size:clamp(2.6rem,5.4vw,5.2rem); line-height:1.02; letter-spacing:-.045em; }
.fleet-intro .editorial-lede { max-width:68ch; font-size:clamp(1rem,1.5vw,1.2rem); }
.fleet-intro-actions { display:flex; flex-direction:column; gap:16px; padding-bottom:12px; }
.fleet-preview-note { font-size:.78rem; margin-top:30px; color:var(--text-muted); }
.fleet-stage { max-width:1480px; }
.fleet-markets { display:grid; grid-template-columns:repeat(5,minmax(0,1fr)); gap:24px; }
.fleet-markets article { border-top:1px solid var(--border-medium); padding-top:22px; }
.fleet-markets h3 { margin:20px 0 12px; font-size:1.1rem; }
.fleet-markets p { font-size:.9rem; line-height:1.6; color:var(--text-secondary); }
@media(max-width:900px) { .fleet-intro { grid-template-columns:1fr; gap:10px; } .fleet-intro-actions { flex-direction:row; flex-wrap:wrap; align-items:center; } .fleet-markets { grid-template-columns:repeat(2,minmax(0,1fr)); } }
@media(max-width:550px) { .fleet-stage { width:calc(100% - 20px); } .fleet-hero { padding-top:24px; } .fleet-intro h1 { font-size:2.7rem; } .fleet-markets { gap:20px; } }
</style>
