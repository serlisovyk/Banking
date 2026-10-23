# npm is the package manager

Date: 2026-10-23 · Status: accepted

## Context

The project is a small static site with three dev dependencies. The repo needs one lockfile and
one install command that every agent and the Vercel build use the same way.

## Decision

- The package manager is `npm`; `package-lock.json` is the only lockfile and is committed.
- Installs are `npm ci` (from the lockfile) and `npm install` when a dependency changes; the
  lockfile is never edited by hand.
- `package.json` declares `engines.node` as Vite's own minimum (`^20.19.0 || >=22.12.0`), and the
  scripts agents run are `dev`, `build`, `preview`, `format`, `format:check`.

## Consequences

- No `yarn.lock`, `pnpm-lock.yaml`, `packageManager` field or other tool's config.
- Vercel's Vite preset detects npm from the lockfile, so nothing is configured there.
- When Vite raises its Node minimum, `engines.node` follows it.
- Rejected: yarn and pnpm (their speed and disk savings do not matter for three dependencies, and a
  second tool is one more thing to keep in sync).
