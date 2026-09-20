# CRM bridge

Turns intelimaris.com contact-form submissions into Threadwise CRM records
(an Organisation if a company was given, a Person, and an Activity logging
the message). It's a Cloudflare Worker because the site itself is a static
Vue SPA on GitHub Pages with no server of its own.

The form side of this already exists and needs no changes: `ClosingSection.vue`
POSTs `{ name, email, company, role, message, source, submittedAt }` to
`import.meta.env.VITE_CONTACT_FORM_ENDPOINT` when that build-time env var is
set, and falls back to a prefilled `mailto:` link when it isn't. Deploying
this Worker and setting that env var is the only wiring left to do.

## Where Threadwise actually lives

Threadwise is live at `https://threadwise.anthill.org.uk` — verified
reachable 2026-09-20 (`/api/health` → `200 {"ok":true,...}`). It's already
fronted by its own Cloudflare Worker
(`~/Projects/CRM/deploy/cloudflare-front`), which proxies to the real
instance on a Scaleway VPS. This Worker just calls that public API like any
other client — no separate tunnel or private network needed for this piece.

It also runs in **`session` auth mode** with a real API-key system
(`better-auth`), confirmed by hitting `/api/auth/mode` (→ `"session"`) and an
unauthenticated `/api/me` (→ `401 unauthenticated`, not a demo user). See
`~/Projects/CRM/docs/AUTH.md` for the full model. That means Threadwise's
own auth is what protects it — this Worker doesn't need to add another
layer, just authenticate correctly.

*(An earlier version of this bridge worked around Threadwise having no API
authentication at all, with a hand-rolled shared-secret header and a Caddy
config change. That's gone — Threadwise gained real auth since, and the
workaround would now just be redundant.)*

## Getting a Threadwise API key

Sign in to `https://threadwise.anthill.org.uk` with an account that has
`settings:manage` (owner or admin), then either:

- **UI**: Settings → Identity & access → API keys → create one, scope
  **`records:write` only** — nothing else. That's the minimum permission
  that can create people, organisations and activities; it cannot read,
  export, delete or change settings. Copy the key now — it's shown once.
- **API**: `POST /api/api-keys` (while signed in) with
  `{ "name": "intelimaris-web contact form", "scopes": ["records:write"] }`.

Set the returned `tw_…` key as this Worker's secret (below); set the target
workspace's id as `CRM_WORKSPACE_ID` in `wrangler.toml`. Sending both means a
key accidentally scoped to the wrong workspace fails loudly (`403`) instead
of quietly writing leads somewhere unexpected.

## What it does

1. Rejects anything that isn't a POST from `ALLOWED_ORIGIN`.
2. Rejects the honeypot field (`website` — added to `ClosingSection.vue`
   alongside this Worker; real visitors never see or fill it).
3. Validates `name`, `email` (format-checked) and `message` are present and
   within length limits.
4. Optionally rate-limits by IP (5/hour) if a `RATE_LIMIT` KV namespace is
   bound — see `wrangler.toml`. Skipped if not bound; **for a public
   endpoint, also add
   [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) to
   the form** (free, purpose-built, far better than a hand-rolled counter —
   not implemented here to keep this Worker dependency-free). This is
   separate from — and still worth doing alongside — Threadwise's own
   600 req/min API-key rate limit, which doesn't stop a burst of form spam
   from landing as real CRM records.
5. Creates the Organisation (if `company` was given), the Person linked to
   it, and an Activity (`kind: 'note'`) carrying the message — tagged
   `source:intelimaris-web` throughout so the CRM shows where the record
   came from.
6. Returns `{ ok: true }` or an error code; never leaks Threadwise's
   response body to the browser.

## Deploy

```bash
cd crm-bridge
npm install
npx wrangler login

# Edit wrangler.toml: CRM_WORKSPACE_ID (from the account the key above was
# minted in), ALLOWED_ORIGIN if this ever serves a preview domain too.

npx wrangler secret put CRM_API_KEY    # the tw_… key from "Getting a
                                        # Threadwise API key" above

npm run deploy
```

Wrangler prints the deployed URL
(`https://intelimaris-crm-bridge.<your-subdomain>.workers.dev`). Set that as
`VITE_CONTACT_FORM_ENDPOINT` in the site's build — add it as a GitHub Actions
env var/secret in `.github/workflows/deploy-github-pages.yml`'s `Build` step,
next to `VITE_DEPLOY_BASE` — and redeploy the site. No other site change is
needed; the form already knows how to use it.

To watch it handle live traffic: `npm run tail`.

## Local development

```bash
cp .dev.vars.example .dev.vars   # fill in CRM_API_KEY; gitignored
npm run dev
```

`wrangler dev` reads `[vars]` from `wrangler.toml` and secrets from
`.dev.vars`. Point a local build's `VITE_CONTACT_FORM_ENDPOINT` at the
printed `http://localhost:8787` to test end to end. A key scoped to
`records:write` really will create records on the **live** Threadwise
instance when you test this way — there's no separate staging workspace
documented, so use a workspace you don't mind seeing test leads in, and
delete them afterwards (`DELETE` isn't in this Worker's scope, so do that
from the Threadwise UI itself).
