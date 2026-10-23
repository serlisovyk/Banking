# Plan: clean URLs, a real 404 and asset caching on Vercel (MY-184)

Goal: pages open at `/careers`, `/about`, `/security`; an unknown path returns status 404 with
the home page; hashed assets are cached for a year. No spec: nothing changes in layout or
interaction. The author's answer: no separate 404 design, the 404 is the home page.

## `vercel.json`

- `cleanUrls: true`, `trailingSlash: false`: Vercel serves `careers.html` at `/careers` and
  redirects `/careers.html` to `/careers` (308).
- `headers`: `/assets/(.*)` gets `Cache-Control: public, max-age=31536000, immutable`. Every file
  Vite emits there carries a content hash (decision `sources-in-src`), so a changed file is a new URL.
- `redirects`: permanent `/pages/:slug(about|careers|security)` (after `cleanUrls` strips `.html`) to `/:slug`. The `pages/`
  URLs were the live ones until the move into `src/`; the rule keeps old links and search results
  working, costs one entry, and lists the slugs so it never redirects a path that never existed.
  Alternative `(.*)` rejected: it would also bounce unknown paths to a second 404.
- No `rewrites`, no `routes` (the deprecated key cannot be combined with `cleanUrls`,
  `redirects` and `headers`): a catch-all to `index.html` is what returned 200 for every path on
  the previous site. Production already answers `/nope` with 404; the config stays in
  `vercel.json` and agents never touch the Vercel project (decision `vercel-deploy`).

## 404

- No `404.html` in `src/`. A small build-only plugin in `vite.config.js` copies the built
  `dist/index.html` to `dist/404.html` in `closeBundle` (`node:fs/promises`), so the copy is the
  page after every HTML transform. It is the last plugin and takes the output folder from the
  resolved config.
- Vercel serves `404.html` from the output root for an unmatched path, with status 404. Asset and
  link URLs are root paths, so the copy works at any depth. Its `Home` link carries
  `aria-current`, as the home page does.
- Rejected: a hand-made 404 page (a second look to keep in step with the site).

## Navigation

- `shared/header` links: `/`, `/careers`, `/about`, `/security`; `aria-current` stays driven by
  the page flags.
- Vite's dev and preview servers do not apply `cleanUrls`: locally the links lead to a 404
  (`/careers` is not a file there). Clean URLs are verified on production after the merge.

## Docs

- `ai/map.md`: `vercel.json`, the 404 copy.
- `ai/rules/architecture.md`: links are clean URLs; `404.html` is a build copy, not a page.
- Decision `clean-urls-vercel-json`: restates `vercel-deploy` (Git integration, `dist/`, agents
  leave the project alone) and adds `vercel.json` with clean URLs, the redirect, the cache header,
  the 404 as a home copy and the absence of a catch-all rewrite. `vercel-deploy` becomes
  superseded; the index moves its line, and `ai/workflow.md` points to the new record. The
  `sources-in-src` line about `/careers.html` stays (a record's text is not rewritten).

## Verify

- `npm run build`: `dist/404.html` is byte-identical to `dist/index.html`; the nav links in it
  are clean URLs.
- `npm run build && npm run preview -- --port 4184`: `/404.html` renders the home page.
- The `:slug(...)` pattern of the redirect is checked with `path-to-regexp` 6 (the matcher
  Vercel documents) on `/pages/about.html`, `/pages/nope.html`, `/about.html`.
- Push `my-184-vercel-urls` for a Vercel preview and read its status through the GitHub status
  API. The preview is behind Vercel login, so `curl -I` on `/about` (200), `/about.html` (308),
  `/pages/about.html` (308), `/nope` (404 with the home page) and `/assets/<file>`
  (`cache-control`) is done on production after the merge.
- `npm run format:check` stays red for MY-182 (CRLF working copy on Windows, the header's
  conditional attribute): reported, not fixed.
