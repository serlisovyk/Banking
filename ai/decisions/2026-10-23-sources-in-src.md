# Sources in `src/`, one bundled asset scheme

Date: 2026-10-23 · Status: accepted

## Context

The sources lay in the repo root beside the configs and docs, sections of different pages
were mixed in one folder, and images had two path schemes: `/images/…` (copied raw from
`publicDir`, no hash) and `/assets/images/…` (bundled, hashed), so `dist/` held some images
twice.

## Decision

- Vite's `root` is `src/`; the pages (`index`, `about`, `careers`, `security`) sit at its top
  and are listed in `build.rollupOptions.input`. Output stays `dist/` at the repo root, so the
  Vercel build and output directory do not change (decision `vercel-deploy`). The repo root
  holds configs, docs, `src/` and `public/` only.
- Partials live in `src/partials/`: `sections/<page>/` (`shared/` for what several pages use)
  and `components/`. The plugin is given the `partials` folder, so a partial's name is its
  path (`sections/home/hero`): unambiguous, no collision between a section and a component.
- Every image and the font is a source in `src/assets/`, referenced by the root path
  `/assets/…` in HTML, partial parameters, `data/*.js` and CSS. Vite resolves it against
  `root`, hashes it and emits it once; `build.assetsInlineLimit: 0` keeps small files as
  files, not `data:` URIs copied into every use.
- `public/` is only for a file that needs a fixed URL (favicon, `robots.txt`).

## Consequences

- A new page: an HTML file in `src/` plus an `input` entry, a `context` flag and a nav link.
- Paths from `data/*.js` need no JS imports: Handlebars fills them in before Vite's HTML step.
- Page URLs lose the `pages/` prefix (`/careers.html`); clean URLs are a separate task.
- Rejected: partials registered per `sections/` and `components/` folder (names like
  `home/hero` and `product-card` could collide as folders grow); importing images in `data/`
  (JS in a data file, a build coupling); keeping `publicDir` for images (no hash, a second
  scheme, duplicates in `dist/`).
