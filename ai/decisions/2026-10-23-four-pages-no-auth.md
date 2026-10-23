# Four pages, no Login or Sign Up

Date: 2026-10-23 · Status: accepted

## Context

The design shows sign-in and sign-up entry points. The site has no backend, so authentication
forms would do nothing and make a portfolio page look like a working bank. The project shows
layout and front-end craft, not a banking application.

## Decision

- The site has four pages: home, About, Careers, Security.
- There are no Login or Sign Up pages, and no sign-in or sign-up buttons are added.
- The header navigation links only to these four pages.

## Consequences

- A request for authentication, an account area or sign-in forms reverses this record: it needs
  the author's explicit ask and a new dated record.
- Texts in the content that mention logging in or opening an account stay plain text, not links.
- A fifth public page needs the author's explicit request; it adds a flag in `context` and a link
  in the `header` navigation.
- Rejected: dead Login and Sign Up pages as placeholders (they would look finished and do
  nothing); a mock auth with browser storage (state and security theatre for a static site).
