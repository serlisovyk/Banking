# Carousel: CSS scroll-snap, no library

Date: 2026-10-24 · Status: accepted

## Context

Our Testimonials needed a slider: cards in a row, arrows to the neighbouring card, swipe on a touch
screen, the outer cards fading out. A slider library is the usual answer.

## Decision

- **The browser does the scrolling.** The track is a flex row with `overflow-x: auto`,
  `scroll-snap-type: x mandatory` and `scroll-behavior: smooth`. Swipe, the snap to a card, the keyboard
  scroll of a focused track and `prefers-reduced-motion` (`general/reset.css`) come from the browser and
  the CSS; `Carousel` only scrolls by one card step from the arrows and keeps their disabled state.
- **The fade is an alpha `mask-image` on the track**, not a gradient laid over the cards: it stays fixed
  while cards pass under it and needs no extra element.
- **One carousel per audience panel.** The toggle shows and hides panels; each carousel keeps its position.
- **No autoplay, no loop, no dots.** A slider that moves by itself is an accessibility problem
  (`aria-roledescription="carousel"`, labelled slides and arrows, and nothing else to announce).

## Consequences

- `Carousel` is about 40 lines and adds well under 0.5 kB gzip; there is no dependency to update.
- The step is read from the layout (the offset of the second card from the first), so a change of the
  cards' width or gap needs no script change.
- Needs more cards than are visible to scroll at all: each audience has five.
- Rejected: Swiper, Splide and similar (tens of kB of script and a stylesheet for four lines of CSS that
  the browser already does); a transform-based slider with pointer handlers (re-implements swipe and
  snapping, and loses native touch scrolling).
