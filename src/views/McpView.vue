<template>
  <main class="editorial-page mcp-page" lang="en">
    <section class="editorial-shell guide-hero">
      <LanguageNote />
      <p class="editorial-eyebrow">InteliMaris for AI assistants · MCP</p>
      <div class="guide-heading">
        <h1>Ask in plain words. Get answers from the water.</h1>
        <div>
          <p class="editorial-lede">The InteliMaris MCP server lets an AI assistant plan passages, check whether a vessel fits, find berths, and read hazards, events, float plans and live traffic. It answers from the same data and the same rules as InteliWaterwayz™, and says “unknown” when a figure was never stated.</p>
          <p class="mcp-status"><span>In development</span>The tool list already runs the assistant inside InteliWaterwayz™. The connection for outside assistants is being built now.</p>
          <div class="mcp-hero-actions">
            <RouterLink :to="contactLink()" class="editorial-button">Talk to the team <span aria-hidden="true">↗</span></RouterLink>
            <RouterLink to="/api" class="editorial-text-link">Try the public API <span aria-hidden="true">→</span></RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="editorial-section section-wash">
      <div class="editorial-shell">
        <div class="section-intro">
          <div>
            <p class="editorial-eyebrow">What MCP is</p>
            <h2>A standard way for an assistant to use real tools.</h2>
          </div>
          <p>The Model Context Protocol lets assistants such as Claude or ChatGPT call tools that someone else runs. Ours are the InteliMaris platform: the assistant asks, our services answer, and the person sees a plain answer.</p>
        </div>
        <ol class="mcp-flow">
          <li v-for="(step, i) in FLOW" :key="step.title">
            <span class="mcp-flow-n">{{ i + 1 }}</span>
            <h3>{{ step.title }}</h3>
            <p>{{ step.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <section class="editorial-shell editorial-section">
      <div class="section-intro">
        <div>
          <p class="editorial-eyebrow">What it’s good for</p>
          <h2>Seven questions it answers well.</h2>
        </div>
        <p>Each example shows the conversation a person sees, then the tool calls behind it. The vessel is {{ MCP_EXAMPLE_VESSEL }}. Figures are illustrative; the field names are the platform’s own.</p>
      </div>
      <nav class="mcp-jump" aria-label="Use cases">
        <a v-for="item in MCP_USE_CASES" :key="item.id" :href="`#${item.id}`">{{ item.eyebrow }}</a>
      </nav>
      <McpUseCase v-for="(item, i) in MCP_USE_CASES" :key="item.id" :item="item" :index="i" />
    </section>

    <section class="editorial-section section-wash">
      <div class="editorial-shell">
        <div class="section-intro">
          <div>
            <p class="editorial-eyebrow">Connecting an assistant</p>
            <h2>One server. Your account. The tools you’re allowed.</h2>
          </div>
          <p>Tools are task-shaped, like “plan a passage for this vessel”, not one per endpoint. They call our services over the public REST API and share its schemas, so the two can’t disagree about what a vessel is.</p>
        </div>
        <div class="mcp-connect">
          <div v-for="step in CONNECT" :key="step.title" class="mcp-connect-step">
            <h3>{{ step.title }}</h3>
            <p>{{ step.text }}</p>
            <JsonView v-if="step.example" :value="step.example" :label="step.title" />
          </div>
        </div>
      </div>
    </section>

    <section class="editorial-shell editorial-section">
      <div class="section-intro">
        <div>
          <p class="editorial-eyebrow">Already in the tool list</p>
          <h2>Running inside InteliWaterwayz™ today.</h2>
        </div>
        <p>These tools answer the assistant in the app now. Outside assistants get the same list, with the same rules.</p>
      </div>
      <ul class="mcp-registry">
        <li v-for="t in MCP_REGISTRY_TOOLS" :key="t.tool">
          <code>{{ t.tool }}</code>
          <h3>{{ t.title }}</h3>
          <p>{{ t.summary }}</p>
        </li>
      </ul>
    </section>

    <GuideClosing title="Want an assistant that knows the water?" />
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import GuideClosing from '@/components/audience/GuideClosing.vue'
import LanguageNote from '@/components/audience/LanguageNote.vue'
import JsonView from '@/components/api/JsonView.vue'
import McpUseCase from '@/components/mcp/McpUseCase.vue'
import { contactLink } from '@/data/audiences'
import { MCP_EXAMPLE_VESSEL, MCP_REGISTRY_TOOLS, MCP_USE_CASES } from '@/data/mcp'

const FLOW = [
  { title: 'You ask', text: 'In your assistant, in plain words, about your vessel, your passage or the water around you.' },
  { title: 'It picks a tool', text: 'From the InteliMaris tools your account is allowed to see.' },
  { title: 'The tool reads the platform', text: 'Over the same public REST operations our apps use. No second copy of the data.' },
  { title: 'You get an answer', text: 'With its limits stated: unknown, reported by another skipper, or no feed.' },
]

const CONNECT = [
  {
    title: 'Connect',
    text: 'One MCP server over streamable HTTP, at /v0/mcp on the InteliMaris API. Your assistant signs in with your InteliMaris account (OAuth).',
  },
  {
    title: 'Discover',
    text: 'tools/list returns the tools your account may use: public tools for everyone, tools about your own vessels once signed in, operator tools only for operators.',
    example: { tools: [{ name: 'marina_fit', description: 'Does this marina, and each berth it has drawn, take this vessel? …', inputSchema: { type: 'object', properties: { marina: { type: 'string' }, loa_m: { type: 'number' }, beam_m: { type: 'number' }, draft_m: { type: 'number' } } } }, '…'] },
  },
  {
    title: 'Call',
    text: 'tools/call runs one tool and returns its answer, with the same field names as the REST API.',
    example: { jsonrpc: '2.0', id: 7, method: 'tools/call', params: { name: 'marina_fit', arguments: { marina: 'bahia-mar', loa_m: 12.8, beam_m: 4.3, draft_m: 1.4 } } },
  },
]
</script>

<style scoped>
.mcp-status { display: flex; flex-wrap: wrap; align-items: baseline; gap: 10px; margin: 22px 0 0; max-width: 52ch; font-size: .9rem; color: var(--text-secondary); }
.mcp-status span { flex-shrink: 0; padding: 3px 10px; border-radius: var(--radius-pill); background: color-mix(in srgb, #d98a1c 16%, transparent); color: #9a5a06; font-size: .72rem; font-weight: 600; letter-spacing: .04em; }
[data-theme='dark'] .mcp-status span { color: #f2b45e; }
.mcp-hero-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 24px; margin-top: 26px; }

.mcp-flow { list-style: none; margin: 8px 0 0; padding: 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0; counter-reset: flow; }
.mcp-flow li { position: relative; padding: 22px 22px 6px 0; border-top: 2px solid var(--domain); }
.mcp-flow li + li { padding-left: 22px; border-left: 1px solid var(--border-subtle); }
.mcp-flow-n { display: block; font-size: .72rem; font-weight: 600; color: var(--domain-ink); margin-bottom: 8px; }
.mcp-flow h3 { font-size: 1.15rem; margin-bottom: 8px; }
.mcp-flow p { margin: 0; font-size: .92rem; color: var(--text-secondary); }

.mcp-jump { display: flex; flex-wrap: wrap; gap: 8px; margin: 0 0 8px; }
.mcp-jump a { padding: 7px 14px; border: 1px solid var(--border-medium); border-radius: var(--radius-pill); color: var(--text-primary); text-decoration: none; font-size: .82rem; font-weight: 500; }
.mcp-jump a:hover { border-color: var(--domain); color: var(--domain-ink); }

.mcp-connect { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 28px; align-items: start; }
.mcp-connect-step h3 { font-size: 1.2rem; margin-bottom: 8px; }
.mcp-connect-step p { margin: 0 0 14px; font-size: .92rem; color: var(--text-secondary); }

.mcp-registry { list-style: none; margin: 8px 0 0; padding: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0 40px; }
.mcp-registry li { padding: 24px 0; border-top: 1px solid var(--border-medium); }
.mcp-registry code { font: 500 .76rem ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; padding: 3px 8px; border-radius: 6px; background: var(--domain-soft); color: var(--domain-ink); }
.mcp-registry h3 { font-size: 1.2rem; margin: 14px 0 8px; }
.mcp-registry p { margin: 0; font-size: .92rem; color: var(--text-secondary); }

@media (max-width: 1000px) {
  .mcp-flow { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .mcp-flow li:nth-child(3) { padding-left: 0; border-left: 0; }
  .mcp-connect, .mcp-registry { grid-template-columns: minmax(0, 1fr); }
}
@media (max-width: 560px) {
  .mcp-flow { grid-template-columns: minmax(0, 1fr); }
  .mcp-flow li + li { padding-left: 0; border-left: 0; }
}
</style>
