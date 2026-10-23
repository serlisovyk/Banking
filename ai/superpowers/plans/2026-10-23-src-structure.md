# Plan: move the sources into `src/` (MY-179)

Goal: one layout the next tasks build on — the sources under `src/`, partials grouped by page,
one asset path scheme. Behaviour and look stay 1:1; no spec (no interaction or layout change),
only the page URLs lose the `pages/` prefix.

## Target layout

```
src/
  index.html  about.html  careers.html  security.html
  partials/
    sections/{shared/header, home/{hero,products,cases,features,questions}, careers/{careers-hero,values}}
    components/{product-card,case-item,feature-item,question-item}
  styles/  scripts/  data/
  assets/{images/…, fonts/}
```

- `partials/sections/about/` and `security/` are not created: no empty folders, and the pages
  have no section of their own yet.
- `questions` stays in `home/` until the FAQ moves to `shared/` as `faq` (MY-192).
- `public/` is not created: nothing needs a fixed URL yet (favicon and robots come later).
- Moves go through `git mv`, so history follows the files; file contents change only where a
  path or a partial name is written.

## Build config

- `vite.config.js`: `root: 'src'`, `publicDir: '../public'`, `build.outDir: '../dist'`,
  `emptyOutDir: true`, and the four pages in `build.rollupOptions.input` (the old top-level
  `input` was not a Vite option).
- Output stays `dist/` at the repo root and the build `npm run build`, so Vercel needs no
  change (decision `vercel-deploy`); checked on a branch preview.
- `vite-plugin-handlebars` names a partial by its path under the registered folder. Registering
  `src/partials` itself gives names equal to the path (`sections/home/hero`,
  `components/product-card`): unambiguous by construction, no collisions between folders.
  Pages call `{{> sections/home/hero }}`.
- `context(pagePath)`: the page is the last path segment without `.html`; with the pages at the
  root of `src/` the dev server and the build both pass `/<page>.html`, checked in the output.

## Asset scheme

- Every image and the font is a source file in `src/assets/` and is referenced by its root
  absolute path (`/assets/images/…`, `/assets/fonts/…`) in HTML, partial parameters, `data/*.js`
  and CSS. Vite resolves it against `root` and emits it once, hashed. A path that Handlebars
  fills in from `data/*.js` is still plain HTML when Vite's HTML step runs (the plugin runs
  with `order: 'pre'`), so it is bundled too: no JS imports in `data/`, no `public/` copy.
- `build.assetsInlineLimit: 0`: otherwise Vite inlines small files as `data:` URIs, copied into
  every place that uses them. Every image stays one cached file, as it is today.
- The `publicDir: 'assets'` copy of `/images/…` and `/fonts/…` goes away.

## Other paths

- Nav links: `/careers.html`, `/about.html`, `/security.html` (clean URLs are a later task).
- `.gitignore` / `.prettierignore` do not name the moved folders; checked, no change expected.

## Docs

`ai/map.md` (new structure, drop the "moves in MY-179" notes here and in `AGENTS.md`),
`ai/rules/html.md` (partials folders and names), `ai/rules/architecture.md` (layers table, new
page), `ai/rules/assets-performance.md` (font and image paths, hashed), `ai/skills/section.md`
(paths), a decision `2026-10-23-sources-in-src.md` with its index line.

## Verify

- `npm run build`: `dist/` has the four pages at its root, every image once, hashed; no
  `dist/images`, `dist/pages`, `dist/fonts`.
- `npm run build && npm run preview -- --port 4179` and `npm run dev -- --port 5179`: four pages
  at 1920 / 1440 / 390, images, font, burger menu, products switch, feature tabs, FAQ expander;
  compared with the production site.
- A branch push for a Vercel preview.
- `npm run format:check` is red for reasons that belong to MY-182 (CRLF working copy on
  Windows, the header's conditional attribute); reported, not fixed.
