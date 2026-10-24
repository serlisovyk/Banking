# The footer's year is written in the browser

Date: 2026-10-24 · Status: accepted

## Context

The footer names the author and the current year ("Serhii Lisovyk · 2026"). The site is static: a
year written at build time or typed in the markup is the year of the last deploy, not of the visit.

## Decision

- The markup holds the name from `data/footer.js` and an empty `[data-footer-year]` element.
  `FooterController.start()` writes the separator and `new Date().getFullYear()` into it.
- The separator is part of what the script writes, so without JavaScript the line reads just the
  name, never a dangling `·`.

## Consequences

- The year is always the visitor's current year; nothing to edit each January.
- Rejected: the year at build time (a site built in 2026 still says 2026 in 2027 until the next
  build), and a year typed into the template or the data (goes stale the same way).
- The year is the only text a script writes into the footer; the rest is static.
