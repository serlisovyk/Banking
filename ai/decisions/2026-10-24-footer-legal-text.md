# Privacy Policy and Terms of Service are text, not links

Date: 2026-10-24 · Status: accepted

## Context

The design's footer bar ends with "Privacy Policy | Terms of Service". The project has four pages and
will not get legal pages (`four-pages-no-auth`), so there is nowhere for these to lead.

## Decision

- Both are plain text in the footer bar, rendered from `data/footer.js`; they are not links, not
  buttons, and not in the Tab order.
- The social buttons are real links to the networks' home pages (`https://facebook.com`,
  `https://x.com`, `https://linkedin.com`) in a new tab, each named by an `aria-label`.

## Consequences

- No link in the footer leads nowhere.
- Rejected: links to `#` or to an empty page (dead controls for a keyboard and a screen reader), and
  inventing legal pages the project does not have.
- Real legal pages, if they ever exist, are a new record and turn these items into links.
