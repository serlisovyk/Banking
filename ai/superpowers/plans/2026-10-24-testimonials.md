# Plan: Testimonials (MY-194)

Goal: the Testimonials section of Home. Behavior is in `ai/superpowers/specs/2026-10-24-testimonials.md`.
No open questions: the choices below are final.

## Decisions made in this plan

- **One `Carousel` per audience panel; the toggle only shows and hides panels.** The two carousels
  never reset: each keeps its own scroll position, and a `ResizeObserver` re-reads the arrow state when a
  panel becomes visible again (a hidden panel has no size). Rejected: one shared carousel whose slides
  are swapped on toggle (the script would have to know the data).
- **`TestimonialsController` assembles `Toggle` and the carousels** it finds by `[data-carousel]`, as
  `ProductsController` does for the toggle alone. `Toggle` and its CSS are reused unchanged.
- **Built on `scroll-snap`, no library** (decision record in this change). The track is a flex row with
  `overflow-x: auto`, `scroll-snap-type: x mandatory` and `scroll-behavior: smooth`; the arrows call
  `scrollBy` by one card step, and reduced motion is already handled in `general/reset.css`, so the
  script has no `matchMedia`. The arrows' state is read from `scrollLeft`.
- **Start-aligned snap, five cards per audience.** With three cards in view, three cards could not scroll;
  so each set has five, the first three are what the design shows, and the middle of the three is the
  bright one. The two extra individual cards are written in the same tone.
- **The fade is `mask-image` on the track** with the token `--black` as the opaque colour (alpha is all a
  mask reads), so it stays fixed while cards pass under it. Off below 1024 px, where there is one card.
- **Layout:** a grid `arrow | track | arrow` at 1024 px and wider; below 1024 px the track takes the
  first row and the arrows share the second (`<1024` is the structural query for stacking, no new one).
- **"N of M" labels come from `data/`**: the file adds `position` to each card, so the markup is complete
  without script and the template needs no arithmetic (`ai/rules/html.md`).
- **Markup:** the section partial has the heading with the toggle and two panels (as Products, the second
  `hidden`); each panel includes one component, `components/testimonial-carousel` (arrows, track, cards
  as `figure`/`blockquote`/`figcaption`). The carousel takes `label` and `items` as parameters.
- **Arrows are `.button .button--empty`** with a size, a border and a mirrored glyph: hover, press and
  transition stay those of the button. Disabled: dimmed, no pointer events.

## Changes

- `data/testimonials.js` → `testimonials` (`individuals`, `businesses`: `text`, `name`, `position`); wired in
  `context`.
- `assets/images/icons/quote.svg`, `arrow-right.svg` (the left arrow is the same file mirrored in CSS).
- `partials/sections/home/testimonials.html`, `partials/components/testimonial-carousel.html`; the section
  is added to `index.html` after the FAQ.
- `styles/components/testimonial-carousel.css`; tokens `--space-testimonial-gap`, `--space-testimonial-arrow`,
  `--testimonial-arrow-size`, `--icon-testimonial-arrow`, `--icon-quote`, `--text-testimonial-name`
  (`:root` and `<1440`); import in `style.css`.
- `scripts/components/Carousel.js`, `scripts/controllers/TestimonialsController.js`, `TESTIMONIALS` and
  `CAROUSEL` in `constants.js`, one row in `main.js`.

## Docs

- `ai/map.md` (section, component partial, data file, styles, `Carousel`, `TestimonialsController`, hook),
  `ai/rules/oop.md` (component and controller lists), `ai/design-system.md` (the values decided here),
  a decision record `carousel on scroll-snap, no library` and its index line.

## Verification

`npm run lint`, `lint:css`, `format:check`, `build`, `size`; `dist/404.html` equals `dist/index.html`.
`npm run preview -- --port 4194`: both arrows, the ends, swipe (touch emulation), keyboard, the toggle
switching the set and keeping positions, reduced motion; 1920, 1440, 390 and 320 px, no page scroll
sideways from 320 to 1920; Products, the FAQ and the converter still work.

## Left out

- Autoplay, dots or a slide counter, looping, a drag with the mouse, real client photos.
