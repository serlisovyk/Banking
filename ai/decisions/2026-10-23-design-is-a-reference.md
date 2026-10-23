# The design is a third-party template: a reference only, never published

Date: 2026-10-23 · Status: accepted

## Context

The site is built from a design template made by another author. It guides the markup and styles,
but the template is not the author's work and the repository is public.

## Decision

- The design is a visual reference while building: layout at 1920, 1440 and 390 px, spacing,
  type, colours (which become tokens).
- Its link, file key, node ids and exports are not committed anywhere: not in code, docs, plans,
  specs or commit messages.
- Assets the site needs (SVG icons, images) are added to `assets/` as ordinary files; the template
  itself is not stored in the repo.

## Consequences

- Docs and plans say "the design", without a link.
- An agent reaches the design through what the author gives it in the session, not through a file
  in the repo.
- If the author decides to publish a link, that is a new record.
- Rejected: linking the template in the README or the docs (it exposes another author's work and
  adds a dependency on a file that can move); committing exported frames (a copy of that work).
