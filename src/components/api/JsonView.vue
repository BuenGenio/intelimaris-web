<template>
  <pre class="json-view" :aria-label="label"><code><span v-for="(token, i) in tokens" :key="i" :class="token.kind && `json-${token.kind}`">{{ token.text }}</span></code></pre>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ value: unknown; label?: string }>()

type Token = { text: string; kind?: 'key' | 'string' | 'number' | 'literal' | 'more' }

/* '…' in the data marks something left out; it prints bare, not as a string. */
const PATTERN = /("(?:\\.|[^"\\])*")(\s*:)?|\b(?:true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|…/g

/* Pretty-printed, but anything that fits on one short line stays on one line. */
const WIDTH = 72
function format(value: unknown, indent = ''): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value)
  const entries = Array.isArray(value)
    ? value.map(v => format(v, `${indent}  `))
    : Object.entries(value).map(([k, v]) => `${JSON.stringify(k)}: ${format(v, `${indent}  `)}`)
  const [open, close] = Array.isArray(value) ? ['[', ']'] : ['{ ', ' }']
  if (!entries.length) return Array.isArray(value) ? '[]' : '{}'
  const flat = `${open}${entries.join(', ')}${close}`
  if (!flat.includes('\n') && flat.length + indent.length <= WIDTH) return flat
  return `${open.trim()}\n${entries.map(e => `${indent}  ${e}`).join(',\n')}\n${indent}${close.trim()}`
}

const tokens = computed<Token[]>(() => {
  const text = format(props.value).replace(/"…"/g, '…')
  const out: Token[] = []
  let last = 0
  for (const m of text.matchAll(PATTERN)) {
    if (m.index! > last) out.push({ text: text.slice(last, m.index) })
    const [whole, str, colon] = m
    if (str && colon) {
      out.push({ text: str, kind: 'key' }, { text: colon })
    } else if (str) {
      out.push({ text: whole, kind: 'string' })
    } else if (whole === '…') {
      out.push({ text: whole, kind: 'more' })
    } else {
      out.push({ text: whole, kind: /\d/.test(whole[0]!) || whole[0] === '-' ? 'number' : 'literal' })
    }
    last = m.index! + whole.length
  }
  if (last < text.length) out.push({ text: text.slice(last) })
  return out
})
</script>

<style scoped>
.json-view {
  margin: 0;
  padding: 14px 16px;
  overflow-x: auto;
  border-radius: var(--radius-sm);
  background: var(--navy);
  color: #d6e2ef;
  font: 400 .78rem/1.6 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  tab-size: 2;
}
[data-theme='dark'] .json-view { background: #060b14; border: 1px solid var(--border-subtle); }
.json-key { color: #82b8ec; }
.json-string { color: #a8dcb2; }
.json-number { color: #f2c98b; }
.json-literal { color: #e7a6c9; }
.json-more { color: #8b95a6; }
</style>
