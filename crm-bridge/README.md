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

## ⚠ Threadwise has no API authentication — read this first

As of the version in `~/Projects/CRM`, Threadwise's REST API scopes every
request only by a client-supplied `X-Workspace-Id` header (see
`docs/API.md`). **There is no token, key or session check anywhere in the
API.** Anyone who can reach `CRM_BASE_URL` can read or write any record in
any workspace just by setting that header.

That means:

- **`CRM_BASE_URL` must never be Threadwise's public address.** Don't point
  it at a bare `https://crm.yourdomain.com` with nothing else in front.
- Threadwise needs to sit behind something that rejects requests which don't
  prove they came from this Worker. This Worker always sends
  `Authorization: Bearer <CRM_SHARED_SECRET>` for that purpose — Threadwise
  itself ignores it, so a reverse proxy in front of Threadwise has to check
  it. A two-line Caddy example, dropped into Threadwise's
  `deploy/caddy/Caddyfile`:

  ```caddy
  crm.yourdomain.com {
    @unauthorised not header Authorization "Bearer {$CRM_SHARED_SECRET}"
    respond @unauthorised 401
    reverse_proxy threadwise:3001
  }
  ```

  (Same idea with an nginx `map`/`if`, an Fly.io/Cloudflare Access service
  token, or simplest of all: keep Threadwise on a private network — e.g. Fly
  6PN, a Tailscale/WireGuard tunnel — and run this Worker somewhere that can
  reach that private network, so Threadwise is never internet-facing at all.)
- This is a real gap in Threadwise itself, not just a deployment detail —
  worth raising as an issue on that project if you plan to expose it to
  anything public.

Until Threadwise is reachable *only* through something that enforces this,
**do not deploy this Worker against it.**

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
   not implemented here to keep this Worker dependency-free).
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

# Edit wrangler.toml: CRM_BASE_URL (the proxied, authenticated address from
# above — not Threadwise's raw address), CRM_WORKSPACE_ID, ALLOWED_ORIGIN
# if this ever serves a preview domain too.

npx wrangler secret put CRM_SHARED_SECRET   # long random value; same value
                                             # the Caddy/nginx check above expects

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
cp .dev.vars.example .dev.vars   # fill in CRM_SHARED_SECRET; gitignored
npm run dev
```

`wrangler dev` reads `[vars]` from `wrangler.toml` and secrets from
`.dev.vars`. Point a local build's `VITE_CONTACT_FORM_ENDPOINT` at the
printed `http://localhost:8787` to test end to end.
