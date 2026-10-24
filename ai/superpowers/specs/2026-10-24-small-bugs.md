# Spec: small bugs (MY-188)

## Behavior

- Every page declares `lang="en"`: a screen reader reads the English content with English
  pronunciation. `dist/404.html` stays a copy of `dist/index.html`.
- Every page has one `main` landmark around its sections; the header sits outside it.
- The header logo is a link to `/` named "YourBank".
- Keyboard focus is drawn by one ring on every link and button: a 2 px green outline with a 2 px offset.
  A mouse click on a button or link shows no ring and leaves no hover look behind.
- Hover looks apply only on devices that can hover, so a tap leaves nothing highlighted.
- A button outside a form never submits: every one has `type="button"`.

## Not changed

- Layout at every width: the hero already has no horizontal scroll from 320 to 2560 px (MY-185).
- The look of hover and of the current navigation link.
