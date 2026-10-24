# Plan: Careers Job Openings, the shared badge (MY-197)

Goal: the Job Openings section of Careers after Our Benefits: three vacancies as cards from `data/`,
and a generic `badge` that Press Releases on About reuses. No spec: the only new behavior is a
`mailto:` link. No open questions. The design file is out of reach, so the sources are
`ai/design-system.md` and a crop of the layout at 1920.

## Changes

- `partials/components/badge.html`, block `.badge`: a pill that renders `{{label}}: {{value}}` and
  nothing else, so it knows neither jobs nor press. Parameters: `label`, `value`.
- `partials/components/job-card.html`, block `.job-card` (`__title`, `__badges`, `__subtitle`,
  `__text`, `__list`, `__item`, `__button`). An `<article>`; the title is an `h3`, the two
  sub-headings `h4`. Parameters are the context of `{{#each jobs}}`: `title`, `location`,
  `department`, `about`, `requirements`, `applyHref`.
- `partials/sections/careers/jobs.html`, block `.jobs`: `section-heading` with the whole title
  accented (`titleAccent="Job Openings"`, no start or end) and a grid of `job-card`.
- `data/jobs.js` → `jobs`, wired into `context`: a new vacancy is one record. `applyHref` is built
  there from one address and the title, so the template stays at `each`.
- Requirements are a `<ul>`; the icon is a `background` on `li::before` (one small SVG in
  `assets/images/icons/`, the template's bag glyph from `bag.svg` at 24 px, fill `--grey-70`), not an
  `<img>` per item.
- Apply Now is `<a class="button button--compact">` to
  `mailto:careers@yourbank.com?subject=Application%3A%20<title>`: the site has no applications page
  and no form (`scope.md`), so mail is the author's default for now. Its name is
  "Apply Now for <title>": the suffix is a `visually-hidden` span, so three identical buttons are
  told apart by a screen reader and the visible label stays in the name.
- `.button--compact` in `ui/button.css` (the "Apply Now" size of the design system, 59 / 45 / 45 tall) with
  two padding tokens.
- Styles: `styles/components/badge.css`, `styles/components/job-card.css`, `styles/sections/jobs.css`,
  imported in `style.css`. The card is `--grey-11`, 1 px `--grey-15`, no decor; radius
  `--border-radius-medium` (about 15 px measured, the design system says 12 and marks it approximate). The grid is two columns with
  `--space-grid-gap`, one below 768 px; the odd last card stays in the left column at half width by
  the grid itself. The button sits at the card's bottom edge (`margin-top: auto`), so the two cards
  of a row end alike.
- Fluid tokens in `variables.css` (`:root` for 1440 to 1920, the `< 1440` block for 390 to 1440):
  `--space-job-card` 50 / 40 / 24, `--space-job-block` 40 / 32 / 24, `--space-job-list` 20 / 14 / 14,
  `--text-job-title` 30 / 24 / 20, `--text-job-subtitle` 24 / 20 / 18, `--badge-padding-y` 8 / 6 / 6,
  `--badge-padding-x` 16 / 14 / 10, `--badge-gap` 10 / 8 / 6, `--button-padding-y-compact` 16 / 12 / 12,
  `--button-padding-x-compact` 30 / 20 / 20. Values at 1920 are measured from the crop; 1440 and 390 are
  the design-system figures where it has them and scaled otherwise (`--space-job-block`).
- `careers.html`: the section after Benefits.

## Docs

- `ai/map.md`: the Careers page line, the partials lines (`badge`, `job-card`, `careers/jobs`), the data line.
- `ai/design-system.md`: the job card values decided here (radius, block gaps, icon colour), one line each.
- Rules, skills, decisions: nothing; no pattern changed.

## Verification

`npm run lint`, `lint:css`, `format:check`, `build`, `size` (CSS limit 8 kB gzip: reported, not raised),
`cmp dist/404.html dist/index.html`; `npx vite preview --port 4197`: Careers at 1920 / 1440 / 390
against the crop, no horizontal scroll at 320, 390, 767, 768, 1024, 1440 and 1920; Tab reaches each
Apply Now with a visible focus ring; the accessible names of the three links differ.

## Left out

- A real applications page or form, and a per-vacancy page.
- Filtering or searching vacancies; the Press Releases section itself (it only reuses `badge` later).
