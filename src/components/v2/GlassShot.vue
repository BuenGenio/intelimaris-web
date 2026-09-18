<template>
  <figure class="glass-shot" :class="{ 'glass-shot--bleed': bleed }">
    <button
      type="button"
      class="glass-shot-frame glass glass--stroked"
      :aria-label="`${t('shot.zoomAria')}: ${alt}`"
      @click="open = true"
    >
      <span class="glass-shot-chrome" aria-hidden="true">
        <span class="glass-shot-dots"><i /><i /><i /></span>
        <span class="glass-shot-label">{{ chrome }}</span>
        <span class="glass-shot-zoom">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5M11 8v6M8 11h6" stroke-linecap="round" />
          </svg>
        </span>
      </span>
      <ShotImage :id="id" :sizes="sizes" :priority="priority" />
    </button>

    <figcaption v-if="caption || availability !== 'live'" class="glass-shot-caption">
      <span v-if="availability !== 'live'" class="badge-status" :data-state="availability">
        {{ t(`availability.${availability}`) }}
      </span>
      <span class="t-caption">{{ caption }}</span>
    </figcaption>

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
    chrome?: string
    sizes?: string
    priority?: boolean
    bleed?: boolean
  }>(),
  {
    caption: '',
    chrome: 'app.waterwayz.com',
    sizes: '(min-width: 1200px) 1100px, 94vw',
    priority: false,
    bleed: false,
  },
)

const { t } = useI18n()
const open = ref(false)
const alt = SHOTS[props.id].alt
const availability = SHOTS[props.id].availability
</script>

<style scoped>
.glass-shot {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.glass-shot-frame {
  display: block;
  width: 100%;
  padding: 0;
  overflow: hidden;
  border-radius: var(--radius-lg);
  cursor: zoom-in;
  transition: transform 320ms var(--ease-out), box-shadow 320ms var(--ease-out);
}

.glass-shot-frame:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg), var(--panel-halo);
}

.glass-shot-chrome {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: 0.625rem 0.875rem;
  border-bottom: 1px solid var(--glass-border);
}

.glass-shot-dots {
  display: inline-flex;
  gap: 5px;
  flex-shrink: 0;
}

.glass-shot-dots i {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--border-medium);
}

.glass-shot-label {
  flex: 1;
  text-align: center;
  font-size: var(--type-micro);
  letter-spacing: 0.04em;
  color: var(--text-muted);
  font-family: var(--font-mono);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.glass-shot-zoom {
  display: inline-flex;
  flex-shrink: 0;
  color: var(--text-muted);
}

.glass-shot-zoom svg {
  width: 15px;
  height: 15px;
}

.glass-shot-frame:hover .glass-shot-zoom {
  color: var(--brand-wave-400);
}

.glass-shot-caption {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  flex-wrap: wrap;
}

@media (max-width: 720px) {
  .glass-shot--bleed {
    margin-inline: calc(var(--space-4) * -1);
  }

  .glass-shot--bleed .glass-shot-frame {
    border-radius: var(--radius-md);
  }
}
</style>
