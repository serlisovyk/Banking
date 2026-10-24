# Plan: small bugs (MY-188)

Goal: the small markup and CSS errors listed in MY-188. Behavior is in
`ai/superpowers/specs/2026-10-24-small-bugs.md`. No open questions.

## Already done by earlier tasks (verified, not redone)

- `.hero__change {}` is gone (MY-182); the hero card and `.hero__money` no longer scroll the page
  from 320 to 2560 px (MY-185): re-checked in the browser only.

## Changes

- `lang="en"` on the four pages in `src/*.html`.
- `<main>` around the section calls on each page; `about` and `security` get an empty `<main>` that
  their tasks fill.
- Header logo: `<a href="/" class="header__logo">` with the image `alt="YourBank"`; the footer logo
  comes with the footer (MY-189).
- `type="button"` on the `case-item` button, the only one without it.
- `styles/general/main.css`: `.wrapper` goes (no markup uses it); the single
  `:focus-visible` rule of `ai/rules/css.md` is added there, with the ring as the token
  `--focus-ring` in `variables.css`.
- `:focus` removed from every hover rule (`header.css`, `ui/button.css`) and `:hover` moved into
  `@media (hover: hover)`, as `ai/rules/css.md` requires. A control's `[aria-current]` state stays
  outside the query.

## Docs

- `ai/rules/html.md`: `lang="en"` and `<main>` on a page, a logo link; the `type="button"` rule exists.
- `ai/rules/css.md`: the `:focus-visible` line names the token and the ring; the hover rule exists.
- `ai/map.md`: the header partial line and the `main.css` line if they went stale.

## Verification

`npm run lint`, `lint:css`, `format:check`, `build`, `size`; `dist/404.html` equals `dist/index.html`;
`npm run preview`: Tab through the four pages (ring on links and buttons, none after a click), the
logo link, no horizontal scroll at 320 / 390 / 1440 / 1920, burger, toggle, tabs and FAQ still work.

## Left out

- The footer logo (MY-189); a hero rework (the converter is MY-193).
