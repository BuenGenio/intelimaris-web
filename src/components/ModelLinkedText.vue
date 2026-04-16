<template>
  <component :is="tag" class="model-linked-text">
    <template v-for="(seg, i) in segments" :key="i">
      <RouterLink
        v-if="seg.type === 'link'"
        :to="{ name: 'products', hash: '#' + seg.id }"
        class="model-product-link"
      >
        {{ seg.model }}
      </RouterLink>
      <template v-else>{{ seg.value }}</template>
    </template>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { LINKABLE_PRODUCT_IDS } from '@/utils/linkableProductIds'

const props = withDefaults(
  defineProps<{
    text: string
    tag?: string
  }>(),
  { tag: 'span' }
)

const MODEL_RE = /\b(IM\d{3})\b/g

type Seg = { type: 'text'; value: string } | { type: 'link'; model: string; id: string }

const segments = computed((): Seg[] => {
  const text = props.text ?? ''
  const parts: Seg[] = []
  if (!text) {
    return [{ type: 'text', value: '' }]
  }
  const re = new RegExp(MODEL_RE.source, 'g')
  let lastIndex = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    if (m.index > lastIndex) {
      parts.push({ type: 'text', value: text.slice(lastIndex, m.index) })
    }
    const raw = m[1]!
    const id = raw.toLowerCase()
    if (LINKABLE_PRODUCT_IDS.has(id)) {
      parts.push({ type: 'link', model: raw, id })
    } else {
      parts.push({ type: 'text', value: raw })
    }
    lastIndex = m.index + m[0].length
  }
  if (lastIndex < text.length) {
    parts.push({ type: 'text', value: text.slice(lastIndex) })
  }
  if (parts.length === 0) {
    parts.push({ type: 'text', value: text })
  }
  return parts
})
</script>
