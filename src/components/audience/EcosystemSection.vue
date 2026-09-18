<template>
  <section class="editorial-section ecosystem-section" lang="en">
    <div class="editorial-shell">
      <div class="section-intro">
        <div>
      <p class="editorial-eyebrow">How it connects</p>
      <h2>One ecosystem.<br>A clear role for every part.</h2>
      </div>
        <p>InteliMARIS™ is the company and marine brand. WaterWayz™ is the experience that brings the journey, vessel and people together.</p>
      </div>
      <ol class="ecosystem-flow" aria-label="From vessel data to the WaterWayz experience">
        <li>
      <span class="editorial-index">01 / ABOARD</span>
      <h3>Connected systems</h3>
      <p>PWTS, InteliBilge and InteliBMS collect supported vessel data. Local hardware and firmware define device behavior.</p>
      <RouterLink to="/pwts">Explore the systems →</RouterLink>
      </li>
        <li>
      <span class="editorial-index">02 / THE LINK</span>
      <h3>MX MariWavz™</h3>
      <p>The radio network links compatible devices and gateways. Gateway connectivity carries their data onward.</p>
      <RouterLink to="/software">Understand the connection →</RouterLink>
      </li>
        <li>
      <span class="editorial-index">03 / THE SOFTWARE</span>
      <h3>InteliMARIS Stack</h3>
      <p>Software and data infrastructure organize the information. AI analysis and contextual recommendations are developing within this layer.</p>
      <RouterLink to="/intelligence">See developing intelligence →</RouterLink>
      </li>
        <li>
      <span class="editorial-index">04 / YOUR VIEW</span>
      <h3>WaterWayz™</h3>
      <p>Plan the passage, view connected systems and coordinate the arrival. InteliMarina + Dock Pass connect the marina side of the journey.</p>
      <RouterLink to="/waterwayz">Explore WaterWayz →</RouterLink>
      </li>
      </ol>
      <p class="ecosystem-context">Underway · At anchor · At your home marina · At a transient marina</p>
    </div>
  </section>
</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
