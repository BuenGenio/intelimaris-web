<template>
  <figure class="shot" :class="{ 'shot--bleed': bleed }">
    <!-- The field: slate above the line carrying the caption, the domain
         below carrying the screen. -->
    <button
      type="button"
      class="shot-frame"
      :aria-label="`${t('shot.zoomAria')}: ${alt}`"
      @click="open = true"
    >
      <span class="shot-band">
        <span class="shot-caption">{{ caption || alt }}</span>
        <span v-if="availability !== 'live'" class="badge-status shot-badge" :data-state="availability">
          {{ t(`availability.${availability}`) }}
        </span>
      </span>
      <span class="shot-line" aria-hidden="true" />
      <span class="shot-well">
        <ShotImage :id="id" :sizes="sizes" :priority="priority" />
      </span>
    </button>

    <ShotLightbox v-model="open" :id="id" :caption="caption" />
  </figure>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ShotImage from './ShotImage.vue'
import ShotLightbox from './ShotLightbox.vue'
import { SHOTS, type ShotId } from '@/data/shots'
import { useI18n } from '@/composables/useI18n'

const props = withDefaults(
  defineProps<{
    id: ShotId
    caption?: string
    sizes?: string
    priority?: boolean
    bleed?: boolean
  }>(),
  { caption: '', sizes: '(min-width: 1200px) 1100px, 94vw', priority: false, bleed: false },
)

const { t } = useI18n()
const open = ref(false)
const alt = SHOTS[props.id].alt
const availability = SHOTS[props.id].availability
</script>

<style scoped>
.shot {
  margin: 0;
}

.shot-frame {
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--slate);
  color: #ffffff;
  text-align: left;
  cursor: zoom-in;
}

.shot-band {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding: 0.875rem 1.125rem;
  background: var(--slate);
}

.shot-caption {
  font-family: var(--font-text);
  font-size: var(--type-body-sm);
  font-weight: 500;
  color: #ffffff;
  line-height: 1.35;
}

.shot-badge {
  color: rgba(255, 255, 255, 0.72);
  flex-shrink: 0;
}

.shot-line {
  display: block;
  height: 2px;
  background: rgba(255, 255, 255, 0.55);
}

.shot-well {
  display: block;
  padding: clamp(0.75rem, 0.5rem + 1vw, 1.25rem);
  background: var(--maris-day);
}

.shot-well :deep(.shot-image) {
  border-radius: var(--radius-sm);
  overflow: hidden;
}

@media (max-width: 720px) {
  .shot--bleed {
    margin-inline: calc(var(--space-4) * -1);
  }

  .shot--bleed .shot-frame {
    border-radius: 0;
  }
}
</style>
