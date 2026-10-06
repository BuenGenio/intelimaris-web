<template>
  <section class="role-showcase" aria-label="Explore the product by role">
    <div class="showcase-heading">
      <p class="editorial-eyebrow">Your place in the picture</p>
      <p>Six perspectives. One connected day.</p>
    </div>
    <div class="bookmark-stack">
      <article v-for="(card, index) in cards" :key="card.id" class="bookmark"
        :class="{ 'is-open': active === index }" :style="{ '--card-accent': card.color, '--card-image': `url(${shotFallback(card.shot)})` }"
        @pointerenter="onPointerEnter($event, index)" @focusin="active = index">
        <button class="bookmark-spine" type="button" :aria-expanded="active === index"
          :aria-controls="`role-panel-${card.id}`" @click="active = index">
          <span class="bookmark-label">{{ card.label }}</span>
        </button>
        <div :id="`role-panel-${card.id}`" class="bookmark-panel" :inert="active !== index" :aria-hidden="active !== index">
          <div class="bookmark-copy">
            <p class="bookmark-product">{{ card.product }}</p>
            <h2>{{ card.title }}</h2>
            <p class="bookmark-description">{{ card.description }}</p>
          </div>
          <figure class="bookmark-shot">
            <img :src="shotFallback(card.shot)" :srcset="shotSrcSet(card.shot, 'webp')"
              sizes="(max-width: 700px) 85vw, (max-width: 1100px) 65vw, 850px"
              :alt="SHOTS[card.shot].alt" :width="SHOTS[card.shot].width" :height="SHOTS[card.shot].height"
              :loading="index === 0 ? 'eager' : 'lazy'" decoding="async" />
            <figcaption>{{ card.caption }}</figcaption>
          </figure>
          <div class="bookmark-links">
            <RouterLink v-for="id in card.roles" :key="id" :to="audienceLink(id)">
              {{ findAudience(id)?.label }} <span aria-hidden="true">↗</span>
            </RouterLink>
          </div>
        </div>
      </article>
    </div>
    <p class="showcase-hint">Hover, focus or tap a card to explore. Product screenshots show example workspaces.</p>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { audienceLink, findAudience } from '@/data/audiences'
import { SHOTS, shotFallback, shotSrcSet, type ShotId } from '@/data/shots'

const props = defineProps<{ selected?: string }>()
// Captures originate in workspace/docs/screen-gallery; see scripts/build-shots.py.
// Group all nine marketing audiences into six bookmarks without inventing access roles.
const cards: { id: string; label: string; product: string; title: string; description: string; shot: ShotId; caption: string; roles: string[]; color: string }[] = [
  { id: 'passage', label: 'Captains & guests', product: 'InteliWaterwayz™ · Passage', title: 'See the journey ahead.', description: 'Plan around your vessel, explore the destination and bring the people aboard into the picture.', shot: 'waterwayz-route', caption: 'Passage planning, conditions and your next stop.', roles: ['captains', 'passengers'], color: '#93c7ea' },
  { id: 'vessel', label: 'Owners & crew', product: 'InteliMARIS™ · Vessel', title: 'Stay close to every system.', description: 'Keep vessel readings, crew access and upkeep together in a workspace for each vessel.', shot: 'waterwayz-sensors', caption: 'Systems aboard, with the age of each reading visible.', roles: ['fleet-owners', 'crew'], color: '#a5d3c6' },
  { id: 'marina', label: 'Marina teams', product: 'InteliMarina · Operations', title: 'Bring the basin together.', description: 'Connect berth layouts, arriving vessels and the people working from office to pontoon.', shot: 'pms-berth-layout', caption: 'A basin layout with berth dimensions and availability.', roles: ['marina-owners', 'marina-teams'], color: '#c6c3ee' },
  { id: 'service', label: 'Service & technicians', product: 'InteliMARIS™ · Service', title: 'Know what needs attention.', description: 'Connect service work, technician assignments and vessel history. System readings add context to the job.', shot: 'waterwayz-sensors', caption: 'Vessel monitoring context; technician access follows an active assignment.', roles: ['maintenance'], color: '#ead0a6' },
  { id: 'dock', label: 'Private dock hosts', product: 'Dock Pass · Hosting', title: 'Make room for the next arrival.', description: 'Describe your dock, manage requests and keep upcoming stays in view, with clear details for visiting vessels.', shot: 'dock-host-dashboard', caption: 'Dock listings, waiting requests and upcoming stays.', roles: ['private-docks'], color: '#b8d3df' },
  { id: 'business', label: 'Waterfront businesses', product: 'InteliWaterwayz™ · Discover', title: 'Become part of the passage.', description: 'Help nearby vessels find your place. Keep your approved listing and category-specific details current.', shot: 'waterwayz-discover', caption: 'Discovery on the map connects vessels with places ashore.', roles: ['waterfront-businesses'], color: '#d7dba4' },
]
const active = ref(0)
watch(() => props.selected, id => {
  const index = cards.findIndex(card => card.roles.includes(id ?? ''))
  active.value = index >= 0 ? index : 0
}, { immediate: true })
function onPointerEnter(event: PointerEvent, index: number) {
  if (event.pointerType === 'mouse') active.value = index
}
</script>

<style scoped>
.role-showcase { padding:0; margin:0 0 32px; }
.showcase-heading { display:flex; justify-content:space-between; align-items:baseline; gap:16px; margin-bottom:20px; }
.showcase-heading p { margin:0; }
.showcase-heading > p:last-child, .showcase-hint { color:var(--text-muted); font-size:.78rem; }
.bookmark-stack { display:flex; height:580px; padding-top:8px; isolation:isolate; }
/* Each narrow surface is the exposed edge of a complete card. The next card
   overlaps it, so there is no separate coloured tab or rail. */
.bookmark {
  position:relative; flex:0 0 92px; min-width:0; overflow:hidden; isolation:isolate;
  border:1px solid rgba(255,255,255,.2); border-radius:22px;
  background:color-mix(in srgb, var(--card-accent) 18%, #172a3b);
  box-shadow:-10px 4px 24px rgba(7,18,30,.16), 0 12px 28px rgba(7,18,30,.1), inset 0 1px rgba(255,255,255,.12);
  backdrop-filter:blur(24px); -webkit-backdrop-filter:blur(24px);
  transform:translateY(8px);
  transition:flex-grow 560ms cubic-bezier(.22,.8,.25,1), transform 560ms cubic-bezier(.22,.8,.25,1);
}
.bookmark::before, .bookmark::after { content:''; position:absolute; pointer-events:none; z-index:-1; }
.bookmark::before { inset:-24px; background:var(--card-image) center / cover; filter:blur(22px) saturate(.45); opacity:.32; }
.bookmark::after { inset:0; background:linear-gradient(145deg, rgba(255,255,255,.07), rgba(13,29,44,.44) 65%); }
.bookmark + .bookmark { margin-left:-22px; }
.bookmark.is-open { flex-grow:1; transform:translateY(0); }
.bookmark-spine {
  position:absolute; inset:0 auto 0 0; width:70px; padding:28px 0;
  display:flex; align-items:center; justify-content:center;
  border:0; color:#fff; background:transparent; cursor:pointer;
  font:600 1.3rem var(--font-text); text-shadow:0 2px 12px rgba(0,0,0,.12);
}
.bookmark-spine:focus-visible { outline:2px solid #fff; outline-offset:-7px; border-radius:18px; }
.bookmark-label { writing-mode:vertical-rl; transform:rotate(180deg); letter-spacing:-.025em; white-space:nowrap; }
.is-open .bookmark-spine { inset:0 0 auto; width:100%; height:72px; padding:24px 30px 12px; justify-content:flex-start; font-size:1.25rem; }
.is-open .bookmark-label { writing-mode:horizontal-tb; transform:none; }
.bookmark-panel { height:100%; min-width:0; padding-top:72px; display:flex; flex-direction:column; opacity:0; visibility:hidden; transition:opacity 140ms, visibility 140ms; }
.is-open .bookmark-panel { opacity:1; visibility:visible; transition:opacity 300ms 180ms; }
.bookmark-copy { padding:4px 30px 20px; }
.bookmark-product { margin:0 0 10px; color:rgba(255,255,255,.65); font-size:.65rem; font-weight:500; text-transform:uppercase; letter-spacing:.14em; }
.bookmark-copy h2 { margin:0 0 12px; color:#fff; font-size:clamp(1.5rem,2.6vw,2.25rem); line-height:1.12; letter-spacing:-.035em; font-weight:600; }
.bookmark-description { margin:0; max-width:68ch; color:rgba(255,255,255,.8); font-size:.88rem; line-height:1.55; }
.bookmark-shot { margin:0 30px; min-height:0; flex:1; display:flex; flex-direction:column; overflow:hidden; }
.bookmark-shot img { display:block; width:100%; min-height:0; flex:1; object-fit:cover; object-position:top left; border:1px solid rgba(255,255,255,.16); border-radius:10px; background:#172d38; }
.bookmark-shot figcaption { color:rgba(255,255,255,.65); font-size:.66rem; line-height:1.4; padding:10px 0; }
.bookmark-links { display:flex; flex-wrap:wrap; gap:8px 20px; padding:8px 30px 24px; }
.bookmark-links a { color:#fff; font-size:.76rem; font-weight:500; text-decoration-color:rgba(255,255,255,.4); text-underline-offset:5px; }
.bookmark-links a:hover { text-decoration-color:#fff; }
.showcase-hint { margin:24px 0 0; }
@media (max-width:1100px) and (min-width:701px) {
  .bookmark { flex-basis:74px; }
  .bookmark-spine { width:52px; font-size:1.1rem; }
  .bookmark-stack { height:600px; }
  .bookmark-copy { padding-inline:22px; }
  .bookmark-shot { margin-inline:22px; }
  .is-open .bookmark-spine, .bookmark-links { padding-inline:22px; }
}
@media (max-width:700px) {
  .showcase-heading { align-items:flex-start; flex-direction:column; gap:6px; }
  .bookmark-stack { flex-direction:column; height:auto; padding-top:0; }
  .bookmark { flex:none; min-height:72px; border-radius:18px; transform:none; box-shadow:0 -5px 16px rgba(7,18,30,.12); }
  .bookmark + .bookmark { margin-left:0; margin-top:-12px; }
  .bookmark.is-open { transform:none; padding-bottom:12px; }
  .bookmark-spine, .is-open .bookmark-spine { position:relative; inset:auto; width:100%; height:72px; padding:16px 22px 24px; justify-content:flex-start; font-size:1.2rem; }
  .bookmark-label { writing-mode:horizontal-tb; transform:none; }
  .bookmark-panel { display:none; padding-top:0; }
  .is-open .bookmark-panel { display:flex; height:460px; }
  .bookmark-copy { padding:0 22px 18px; }
  .bookmark-copy h2 { font-size:1.8rem; }
  .bookmark-shot { margin-inline:22px; }
  .bookmark-links { padding:8px 22px 24px; }
}
@media (prefers-reduced-transparency:reduce) {
  .bookmark { backdrop-filter:none; -webkit-backdrop-filter:none; background:#24394b; }
  .bookmark::before, .bookmark::after { display:none; }
}
@media (prefers-reduced-motion:reduce) {
  .bookmark, .bookmark-panel, .is-open .bookmark-panel { transition:none; }
}
</style>
