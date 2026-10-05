<template>
  <article :id="item.id" class="mcp-case">
    <header class="mcp-case-head">
      <span class="editorial-index">{{ String(index + 1).padStart(2, '0') }}</span>
      <div>
        <p class="editorial-eyebrow">{{ item.eyebrow }} <span class="mcp-access" :data-access="item.access">{{ item.access === 'public' ? 'Public data' : 'Signed in · your vessels' }}</span></p>
        <h3>{{ item.title }}</h3>
        <p>{{ item.summary }}</p>
      </div>
    </header>

    <div class="mcp-case-body">
      <figure class="mcp-chat">
        <figcaption class="mcp-panel-label">What you see</figcaption>
        <div class="mcp-chat-window">
          <div class="mcp-chat-bar"><span class="mcp-chat-dot" aria-hidden="true"></span>Assistant · connected to InteliMaris</div>
          <p class="mcp-bubble mcp-bubble--you"><span class="sr-only">You: </span>{{ item.ask }}</p>
          <div class="mcp-bubble mcp-bubble--assistant">
            <span class="sr-only">Assistant: </span>
            <p class="mcp-used">Used <code v-for="call in item.calls" :key="call.tool">{{ call.tool }}</code></p>
            <p v-for="line in item.answer" :key="line">{{ line }}</p>
            <div class="mcp-card">
              <p class="mcp-card-title">{{ item.card.title }}</p>
              <ul>
                <li v-for="row in item.card.rows" :key="row.primary + row.secondary">
                  <span><strong>{{ row.primary }}</strong><small v-if="row.secondary">{{ row.secondary }}</small></span>
                  <em v-if="row.tag" :data-tone="row.tone || 'neutral'">{{ row.tag }}</em>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </figure>

      <div class="mcp-api">
        <p class="mcp-panel-label">How it works</p>
        <ol class="mcp-calls">
          <li v-for="(call, i) in item.calls" :key="call.tool">
            <p class="mcp-step"><span class="mcp-step-n">{{ i + 1 }}</span>The assistant calls <code>{{ call.tool }}</code></p>
            <JsonView :value="{ name: call.tool, arguments: call.args }" :label="`tools/call ${call.tool}`" />
            <p class="mcp-rest"><span aria-hidden="true">↳</span> reads <code>{{ call.rest }}</code></p>
            <JsonView :value="call.result" :label="`${call.tool} result`" />
          </li>
        </ol>
      </div>
    </div>

    <p class="mcp-honest"><span aria-hidden="true">✓</span>{{ item.honest }}</p>
  </article>
</template>

<script setup lang="ts">
import JsonView from '@/components/api/JsonView.vue'
import type { McpUseCase } from '@/data/mcp'
defineProps<{ item: McpUseCase; index: number }>()
</script>

<style scoped>
.mcp-case { padding: 44px 0 40px; border-top: 1px solid var(--border-medium); scroll-margin-top: calc(var(--site-header-height, 110px) + 16px); }
.mcp-case-head { display: grid; grid-template-columns: 25px minmax(0, 1fr); gap: 16px; max-width: 760px; }
.mcp-case-head .editorial-index { padding-top: 2px; font-size: .8rem; color: var(--text-muted); }
.mcp-case-head h3 { font-size: clamp(1.4rem, 2.2vw, 1.9rem); margin-bottom: 10px; }
.mcp-case-head p:not(.editorial-eyebrow) { color: var(--text-secondary); margin: 0; }
.mcp-access { display: inline-block; margin-left: 10px; padding: 2px 9px; border-radius: var(--radius-pill); border: 1px solid var(--border-medium); color: var(--text-muted); letter-spacing: .06em; font-size: .62rem; vertical-align: 1px; }
.mcp-access[data-access='signed-in'] { border-color: color-mix(in srgb, var(--domain) 45%, transparent); color: var(--domain-ink); }

.mcp-case-body { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); gap: 28px; margin-top: 28px; align-items: start; }
.mcp-panel-label { font-size: .68rem; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; color: var(--text-muted); margin: 0 0 10px; }

.mcp-chat { margin: 0; position: sticky; top: calc(var(--site-header-height, 110px) + 16px); }
.mcp-chat-window { border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); background: var(--surface-raised); box-shadow: var(--sky-shadow); padding: 0 18px 20px; overflow: hidden; }
.mcp-chat-bar { display: flex; align-items: center; gap: 8px; margin: 0 -18px 16px; padding: 11px 18px; border-bottom: 1px solid var(--border-subtle); font-size: .74rem; font-weight: 600; color: var(--text-secondary); background: var(--surface-soft); }
.mcp-chat-dot { width: 8px; height: 8px; border-radius: 50%; background: #2f9e6a; box-shadow: 0 0 0 3px color-mix(in srgb, #2f9e6a 22%, transparent); }
.mcp-bubble { margin: 0 0 12px; font-size: .92rem; line-height: 1.55; }
.mcp-bubble--you { margin-left: auto; max-width: 86%; width: fit-content; padding: 11px 15px; border-radius: 18px 18px 4px 18px; background: var(--domain); color: #fff; }
.mcp-bubble--assistant { max-width: 100%; padding: 14px 16px; border-radius: 18px 18px 18px 4px; background: var(--surface-page); border: 1px solid var(--border-subtle); }
.mcp-bubble--assistant > p { margin: 0 0 10px; }
.mcp-used { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; font-size: .72rem !important; color: var(--text-muted); }
.mcp-used code, .mcp-step code, .mcp-rest code { font: 500 .74rem ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; padding: 2px 7px; border-radius: 6px; background: var(--domain-soft); color: var(--domain-ink); }

.mcp-card { margin-top: 4px; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); overflow: hidden; }
.mcp-card-title { margin: 0; padding: 9px 13px; font-size: .76rem; font-weight: 600; background: var(--surface-soft); color: var(--text-secondary); }
.mcp-card ul { list-style: none; margin: 0; padding: 0; }
.mcp-card li { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 10px 13px; border-top: 1px solid var(--border-subtle); }
.mcp-card li strong { display: block; font-size: .86rem; font-weight: 600; }
.mcp-card li small { display: block; font-size: .76rem; color: var(--text-muted); line-height: 1.4; margin-top: 2px; }
.mcp-card em { flex-shrink: 0; font-style: normal; font-size: .7rem; font-weight: 600; padding: 3px 9px; border-radius: var(--radius-pill); background: var(--surface-strong); color: var(--text-secondary); white-space: nowrap; }
.mcp-card em[data-tone='good'] { background: color-mix(in srgb, #2f9e6a 16%, transparent); color: #1f7a50; }
.mcp-card em[data-tone='warn'] { background: color-mix(in srgb, #d98a1c 18%, transparent); color: #9a5a06; }
[data-theme='dark'] .mcp-card em[data-tone='good'] { color: #6fd3a2; }
[data-theme='dark'] .mcp-card em[data-tone='warn'] { color: #f2b45e; }

.mcp-calls { list-style: none; margin: 0; padding: 0; display: grid; gap: 22px; }
.mcp-step { display: flex; align-items: center; gap: 10px; margin: 0 0 8px; font-size: .86rem; font-weight: 600; }
.mcp-step-n { display: inline-grid; place-items: center; width: 22px; height: 22px; border-radius: 50%; background: var(--domain); color: #fff; font-size: .72rem; }
.mcp-rest { margin: 8px 0; font-size: .8rem; color: var(--text-muted); display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.mcp-rest code { background: var(--surface-strong); color: var(--text-primary); }

.mcp-honest { display: flex; gap: 10px; align-items: baseline; margin: 22px 0 0; font-size: .9rem; color: var(--text-secondary); max-width: 760px; }
.mcp-honest span { color: #2f9e6a; font-weight: 700; }

@media (max-width: 1000px) {
  .mcp-case-body { grid-template-columns: minmax(0, 1fr); }
  .mcp-chat { position: static; }
}
</style>
