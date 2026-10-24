# Open Account leads to Our Products, the tab in the address

Date: 2026-10-24 · Status: accepted

## Context

The design has Open Account in the hero and the CTA and Learn More on both Use Cases cards. The site has no
sign-up page (`four-pages-no-auth`), so these buttons had nothing to open, and a button that does nothing looks
unfinished. Options were a dialog saying "coming soon", a link to an FAQ answer, or a link to a section.

## Decision

- **Open Account is a link to Our Products** (`#products`, `/#products` from another page): the nearest honest
  answer to "what can I open". No dialog, no sign-up page.
- **Learn More is a link to Our Products with its tab selected.** The address carries the tab:
  `#products-individuals` or `#products-businesses`. `ProductsController` reads it on load and on `hashchange`.
- The hash is not an element id, so the browser never half-scrolls to a hidden panel; the controller selects the
  tab and scrolls to the section, which also keeps a new tab, a shared link and the Back button working.

## Consequences

- A link that goes somewhere is `<a class="button">`, an action on the page is `<button>` (`ai/rules/html.md`).
- A new button with no real destination is not added; it points at a section or is left out.
- Rejected: a "coming soon" `<dialog>` (a modal, a focus trap and a text for a button that has no feature
  behind it); a click handler with a `data-*` on the link (loses the new tab and the shared address).
