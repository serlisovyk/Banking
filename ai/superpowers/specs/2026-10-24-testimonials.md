# Spec: Testimonials (MY-194)

## Behavior

- Home gets **Our Testimonials** between the FAQ and the end of the page: the heading block with the
  **For Individuals / For Businesses** toggle at its right, then a carousel of quote cards.
- Each card: a green quote mark, the text, the name of the client, all centred. Each audience has
  five cards; the toggle shows one set and hides the other. It opens on **For Individuals**.
- At 1024 px and wider three cards are visible with a round arrow at each side; the middle card
  is bright and the side ones fade out towards the edges. Below 1024 px one card is visible and
  the two arrows sit below it, side by side.
- The arrows scroll to the neighbouring card: the next arrow moves the row one card to the left,
  the previous one one card to the right. A card never rests half-way: the row snaps.
- The previous arrow is disabled at the first card, the next one when the last card is in view.
  If the focused arrow becomes disabled, focus moves to the other one.
- Touch: the row is swiped with a finger and snaps to a card; the arrows follow the position.
- Each audience keeps its position when the toggle is switched away and back.
- Scrolling is smooth; with `prefers-reduced-motion: reduce` it is instant. No autoplay.

## Keyboard and assistive technology

- Tab order: the toggle buttons, then the previous arrow, then the next arrow (a disabled arrow is
  skipped). `Enter` and `Space` press an arrow. A scrolled row also answers the arrow keys when
  the browser makes it focusable.
- The carousel is a region named by audience ("Testimonials from individuals") with
  `aria-roledescription="carousel"`; a card is a group with `aria-roledescription="slide"` and
  the name "2 of 5"; the arrows are named "Previous testimonial" and "Next testimonial".
- The quote mark is decorative. The text is a `blockquote`, the name its `figcaption`.

## Layout

- The cards share the row: at 1920 / 1440 px each is 404 / 325 wide with an 80 / 60 gap, and the
  arrows (62 / 52 px) sit 50 / 40 px away from the row. At 390 px the card is the full width.
- The quote mark is 60 / 44 / 44 px, the name 18 / 16 / 16 px medium in green.
- No horizontal scroll of the page from 320 to 1920 px.

## Not changed

- Products and its toggle, the FAQ and the other sections and scripts.
