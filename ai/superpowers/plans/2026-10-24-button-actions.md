# Plan: buttons that do something (MY-195)

Goal: no button on the site without an action. Author's decisions (2026-10-24): anchors, no dialogs; Open Account
(hero, CTA) goes to `#products`; Learn More goes to `#products` with the matching tab selected; Exchange is done
(MY-193). No open questions. The behavior is in the spec.

## Approach

- **Navigation is `<a>`, an action is `<button>`.** Hero Open Account becomes
  `<a class="button button--large" href="#products">`; the CTA already is one. Learn More becomes
  `<a class="button button--secondary case-item__button">` with its `href` from `data/case-items.js`
  (`href: '#products-individuals'` / `'#products-businesses'`). `.button` gets `display: inline-block`, so a link
  sizes like the `<button>` did.
- **The address carries the tab: `#products-<key>`**, `key` being a `data-toggle-button` value. Why not a click
  handler with `data-*` on the link: a handler loses a link opened in a new tab and a shared URL; the address
  keeps them and the Back button.
- **No element has that id**, so the browser never scrolls to it half-way: the panels are renamed
  `products-<key>-panel` (and their `aria-controls`); the controller does the scroll.
- `Toggle.selectByKey(key, { shouldFocus })` selects the button with that key, focuses it with
  `preventScroll`, and returns whether the key exists. It reveals the panel through the same `select`.
- `ProductsController` (the section owns the address): on `start()` and on `hashchange` it reads
  `location.hash`; when it starts with `PRODUCTS.hashPrefix` it calls `selectByKey` and, on a known key,
  `root.scrollIntoView()`. On load it does not move focus; on `hashchange` it does. One more `click`
  listener on `document` catches a link with that prefix whose hash equals the current one (no `hashchange`
  will come, so the link would do nothing) and reveals the same way. The prefix and the link selector go to
  `PRODUCTS` in `constants.js`.
- Smooth scroll: `html { scroll-behavior: smooth }` under `@media (prefers-reduced-motion: no-preference)` in
  `general/main.css`; `reset.css` already forces `auto` on reduce. `scrollIntoView()` and anchor jumps both obey it.
- `scroll-margin-top` is not added: the header is not sticky, and the section's own top padding is the margin
  the jump needs.
- Focus: Learn More leaves the focus on a link far above; the selected tab button is the first control of the
  target, so that is where it goes (the section heading is not focusable and giving it `tabindex` only adds a stop).

## Docs

- `ai/rules/html.md`: a link that goes somewhere and looks like a button stays `<a class="button">`.
- Decision `2026-10-24-open-account-to-products.md` and its index line: no sign-up page, so Open Account and
  Learn More lead to Our Products, the tab in the address.
- `ai/map.md`: the `ProductsController` line (reads the address); hooks unchanged.

## Verification

`npm run lint`, `lint:css`, `format:check`, `build`, `size`; `dist/404.html` equals `dist/index.html`;
`npm run preview -- --port 4195` at 1920 / 1440 / 390: hero and CTA Open Account jump, both Learn More select the
right tab (also pressed twice and after switching the tab by hand), `/#products-businesses` on load, Back, Tab
and Enter, reduced motion, console clean; Careers CTA leads to Home Products; every button on Home acts.

## Left out

- A sign-up page, a dialog; writing the address when a tab is clicked by hand.
