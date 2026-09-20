/**
 * intelimaris.com contact-form → Threadwise CRM bridge.
 *
 * The site (a static Vue SPA on GitHub Pages) has no backend of its own.
 * ClosingSection.vue already POSTs the contact form to
 * `import.meta.env.VITE_CONTACT_FORM_ENDPOINT` when that build-time env var
 * is set (falling back to a mailto: link when it isn't). This Worker is
 * what that endpoint should point at: it validates the submission, rejects
 * spam, and creates the matching Organisation / Person / Activity in
 * Threadwise so leads show up in the CRM instead of only in an inbox.
 *
 * Threadwise (live at CRM_BASE_URL, already fronted by its own Cloudflare
 * Worker — see ~/Projects/CRM/deploy/cloudflare-front) runs in `session`
 * auth mode with a real scoped API-key system (better-auth). This Worker
 * authenticates as one such key — see README.md "Getting a Threadwise API
 * key" for how to mint one scoped to exactly `records:write`, the minimum
 * permission that can create people/organisations/activities and nothing
 * else (no read, export, delete or settings access).
 */

export interface Env {
  ALLOWED_ORIGIN: string
  CRM_BASE_URL: string
  CRM_WORKSPACE_ID: string
  /** A Threadwise API key scoped to `records:write` only — see README.md. */
  CRM_API_KEY: string
  /** Optional. Bound only if the wrangler.toml kv_namespaces block is uncommented. */
  RATE_LIMIT?: KVNamespace
}

interface LeadPayload {
  name?: unknown
  email?: unknown
  company?: unknown
  role?: unknown
  message?: unknown
  source?: unknown
  submittedAt?: unknown
  /** Hidden form field, invisible to real visitors — see the honeypot field added to ClosingSection.vue. */
  website?: unknown
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_LEN = { name: 200, email: 254, company: 200, role: 100, message: 5000 } as const
const RATE_LIMIT_WINDOW_S = 3600
const RATE_LIMIT_MAX = 5

function corsHeaders(origin: string, allowed: string): HeadersInit {
  const allow = origin === allowed ? allowed : ''
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  }
}

function json(body: unknown, status: number, headers: HeadersInit): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...headers, 'Content-Type': 'application/json' },
  })
}

function trimmedString(v: unknown, max: number): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : ''
}

function splitName(full: string): { firstName: string; lastName: string | null } {
  const parts = full.split(/\s+/).filter(Boolean)
  if (parts.length <= 1) return { firstName: parts[0] ?? full, lastName: null }
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') }
}

async function crmFetch(env: Env, path: string, body: unknown): Promise<Record<string, unknown>> {
  const res = await fetch(`${env.CRM_BASE_URL.replace(/\/$/, '')}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // The API key alone selects the workspace; sending X-Workspace-Id too
      // means a key pointed at the wrong workspace fails loudly (403) rather
      // than silently writing somewhere unexpected.
      'X-Workspace-Id': env.CRM_WORKSPACE_ID,
      Authorization: `Bearer ${env.CRM_API_KEY}`,
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    throw new Error(`Threadwise ${path} → ${res.status}`)
  }
  return (await res.json()) as Record<string, unknown>
}

export default {
  async fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
    const origin = request.headers.get('Origin') ?? ''
    const headers = corsHeaders(origin, env.ALLOWED_ORIGIN)

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers })
    }
    if (request.method !== 'POST') {
      return json({ error: 'method_not_allowed' }, 405, headers)
    }
    if (origin !== env.ALLOWED_ORIGIN) {
      return json({ error: 'origin_not_allowed' }, 403, headers)
    }

    let raw: LeadPayload
    try {
      raw = await request.json()
    } catch {
      return json({ error: 'invalid_json' }, 400, headers)
    }

    // Honeypot: a hidden field real visitors never fill in. Bots that fill
    // every input trip it. Report success so scripted submitters don't
    // learn to skip the field — just never touch the CRM with it.
    if (trimmedString(raw.website, 500)) {
      return json({ ok: true }, 200, headers)
    }

    const name = trimmedString(raw.name, MAX_LEN.name)
    const email = trimmedString(raw.email, MAX_LEN.email)
    const company = trimmedString(raw.company, MAX_LEN.company)
    const role = trimmedString(raw.role, MAX_LEN.role)
    const message = trimmedString(raw.message, MAX_LEN.message)
    const source = trimmedString(raw.source, 100) || 'intelimaris-web'
    const submittedAt =
      typeof raw.submittedAt === 'string' && !Number.isNaN(Date.parse(raw.submittedAt))
        ? raw.submittedAt
        : new Date().toISOString()

    if (!name || !email || !message || !EMAIL_RE.test(email)) {
      return json({ error: 'invalid_fields' }, 422, headers)
    }

    if (env.RATE_LIMIT) {
      const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown'
      const key = `rl:${ip}`
      const count = Number((await env.RATE_LIMIT.get(key)) ?? '0')
      if (count >= RATE_LIMIT_MAX) {
        return json({ error: 'rate_limited' }, 429, headers)
      }
      await env.RATE_LIMIT.put(key, String(count + 1), { expirationTtl: RATE_LIMIT_WINDOW_S })
    }

    try {
      let organisationId: string | null = null
      if (company) {
        const org = await crmFetch(env, '/organisations', {
          name: company,
          tags: ['source:intelimaris-web'],
        })
        organisationId = (org.id as string) ?? null
      }

      const { firstName, lastName } = splitName(name)
      const person = await crmFetch(env, '/people', {
        firstName,
        lastName,
        email,
        organisationId,
        tags: ['source:intelimaris-web', 'contact-form'],
        customFields: { leadRole: role || null, leadSource: 'contact-form' },
      })
      const personId = (person.id as string) ?? null

      await crmFetch(env, '/activities', {
        kind: 'note',
        personId,
        organisationId,
        summary: 'Website contact form submission',
        body: message,
        occurredAt: submittedAt,
        metadata: { role: role || null, source },
      })

      return json({ ok: true }, 200, headers)
    } catch (err) {
      console.error('crm-bridge: Threadwise write failed', err)
      return json({ error: 'crm_unavailable' }, 502, headers)
    }
  },
}
