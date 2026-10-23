# Deployed on Vercel through its Git integration

Date: 2026-10-23 · Status: superseded by 2026-10-23-clean-urls-vercel-json.md

## Context

The site is static: `npm run build` produces `dist/` with no server code. It needs a public
address for the portfolio and for the repository's description.

## Decision

- Hosted on Vercel through its Git integration: a push to `main` is production
  (<https://banking-coral-three.vercel.app>), other pushed branches get previews. The project is
  the author's; agents never recreate, reconnect or reconfigure it.
- The build is `npm run build`, the output directory `dist/`; Vercel's Vite preset needs nothing
  more, so the repo has no `vercel.json`.

## Consequences

- Every push to `main` ships to production: `main` must always build and open.
- A change that can affect the build (the sources' location, `outDir`, file moves) is checked on a
  branch preview before it is merged.
- After a push agents check the live site read-only (open it, fetch it) and touch nothing in the
  Vercel project.
- Rejected: a `vercel.json` that repeats the preset (nothing to pin); GitHub Pages (the author
  already deploys to Vercel and wants branch previews).
