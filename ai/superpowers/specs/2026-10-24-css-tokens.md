# Spec: CSS on the design system (MY-185)

What a user sees changes where the code did not yet follow `ai/design-system.md`. Every value
is the one in that document at 1920 / 1440 / 390 px and interpolates between them
(`ai/decisions/2026-10-23-breakpoint-scheme.md`).

## Layout and queries

- Structure changes only at `width < 1024px` (both heroes, product columns, use-case rows, feature
  tabs stack) and `width < 768px` (card grids become one column, the header becomes the menu
  button, the use-case stats stack). Nothing changes at 1440.
- The FAQ grid stays two columns down to 768 px (it was one column below 1024 px).
- The Use Cases plate stays 2 x 2 at 390 px (it was one column).
- The use-case text column no longer top-aligns below 1440 px, and its stats stay a row above 768 px.

## Type and spacing

- Section titles are 48 / 38 / 28 px (the broken `clamp` kept them at 48 px on mobile); the Careers
  title is 58 / 48 / 28 px, line 1.3. Body text, buttons, card titles, the stat numbers, the value
  titles and the FAQ questions take their sizes from the table.
- The gap between sections is 150 / 120 / 80 px; the heading block, card paddings, grid gaps and the
  Products / Use Cases / Features / FAQ / Values inner spacing follow the tables.
- The page gutter is 162 / 80 / 16 px, so the content is 1596 / 1280 / 358 px wide.
- The Products toggle takes the sizes of the design (container padding 14 / 12 / 12 px).

## Looks

- The hero card border is `--green-60` (was `--grey-15`); its three rows fade 100 / 50 / 20 %; the hero
  paragraph is `--white-90`.
- The hero card is 515 x 624 / 410 x 501 / 305 x 368 px, so it no longer overflows at 390 px.
- Light (300) text renders in the real Light weight: the `@font-face` range is 300 to 700.
- Pills (navbar, buttons, toggle) use a 100 px radius; the page-hero panel is 20 px and its photo,
  like the small cards in the plate, 16 px.
- Section headings are one block everywhere: below 1024 px the title and text are centred, on
  Careers too.

## Not in this task

Markup fixes (`lang`, focus ring, logo link, `<main>`), data in `data/`, scripts.
