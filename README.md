# DhruvLabs — dhruvlabs.online

The official DhruvLabs studio website. Plain HTML/CSS/JS, no build step, no framework.

## Stack

Static HTML + CSS + a small vanilla-JS progressive-enhancement layer. No bundler, no
npm dependencies, nothing to build. Chosen because:

- Every route (`/`, `/trycut/privacypolicy`, `/trycut/termsofservice`) is a real
  file on disk, so direct navigation, refresh, and no-JS all work identically —
  important for the Google Play Privacy Policy URL requirement.
- Zero JS is required for the page to be usable; `main.js` only adds a sticky-nav
  shadow and scroll-reveal animation, both of which no-op safely if JS fails.
- Fastest possible Lighthouse baseline for a marketing/legal site.

## Structure

```
index.html                          Homepage
trycut/privacypolicy/index.html     Placeholder — TryCut AI Privacy Policy
trycut/termsofservice/index.html    Placeholder — TryCut AI Terms of Service
404.html                            Not-found page (used by most static hosts automatically)
assets/css/style.css                Full design system + component styles
assets/js/main.js                   Progressive enhancement only
assets/images/                      TryCut AI logo (resized), favicon
robots.txt, sitemap.xml, site.webmanifest
netlify.toml                        Netlify-specific redirect/header config
```

### Adding a future product (e.g. `/futureapp/...`)

Create a new top-level folder (`/futureapp/`) with its own `index.html` files —
same pattern as `/trycut/`. No routing config changes needed on any static host.

## Local preview

No server required — but some browsers restrict `fetch`/module features on
`file://`, so a tiny static server is the safer way to preview:

```bash
npx serve .
```

## Deployment

Any static host works (Netlify, Vercel, Cloudflare Pages, GitHub Pages, S3+CloudFront).
A `netlify.toml` is included for Netlify; on Vercel or Cloudflare Pages no config
file is needed at all — just point the host at this folder with **no build command**
and **publish directory `.`**.

Canonical host is the apex domain, `https://dhruvlabs.online` — see
`netlify.toml` for the `www` → apex redirect. If you deploy on a host without a
config-based redirect (e.g. GitHub Pages), configure that redirect at the DNS/host
level instead.

## Optional follow-ups (not launch blockers)

1. **OG/social share image**: no image-generation tooling was available in this
   environment, so there's no `og:image`. Text-only Open Graph/Twitter tags are in
   place; add a designed `og:image` (1200×630) later for richer link previews.
2. **TryCut AI logo asset**: resized copies (`trycut-logo-512.png`,
   `trycut-logo-192.png`) were generated from `TryCut LOGO.png` using Windows'
   built-in image APIs (no compression library was available). Re-export a
   properly compressed version if you have design tooling — the current 512px
   file is ~340KB.
