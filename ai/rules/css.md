# CSS Rules

Plain CSS with native nesting; no preprocessor, CSS Modules, CSS-in-JS or utility
framework. `styles/style.css` imports every file, in this order: `general`, `ui`,
`components`, `sections` (`ai/map.md`).

## Naming: BEM

- `block__element--modifier`. The block is the partial (`.header`, `.product-card`), an
  element is a part of it (`.product-card__title`), a modifier is a variation or a state
  (`.button--secondary`, `.case-item--inverted`).
- Elements do not nest in the name: `block__element`, never `block__element__sub`; a
  two-word element is hyphenated (`header__nav-link`).
- One block, one stylesheet named like its partial, in `styles/sections/` or
  `styles/components/`; a shared element (`.button`, headings) is in `styles/ui/`. A new
  file is imported in `style.css` beside its kind.
- A state a script sets is a native attribute (`[aria-expanded='true']`, `[hidden]`,
  `[inert]`) or a BEM modifier; a hook for a script is a `data-*` attribute, never a class
  (`ai/rules/style.md`).
- A tag selector appears only inside its block (`.questions__button img`), never globally
  outside `general/`.

## Nesting

- States, pseudo-elements, children and media queries nest inside their rule: `&:hover`,
  `&::after`, `@media (...)`. A media query sits inside the selector it changes, as a strict
  range without `=`: `@media (width < 1024px)`.
- Nesting adds the parent's specificity: stay at two levels, and let order or a more
  specific selector win, never `!important`.
- `:hover` only inside `@media (hover: hover)`, so a tap leaves no hover look.

## Tokens

- Every value comes from a token in `styles/general/variables.css`: colours (also inside a
  gradient or a shadow), the font family, radii, durations. `#`, `rgb(` and `hsl(` appear
  nowhere else; `transparent` and `currentColor` stay keywords.
- A value used in more than one place is a token first, named on the existing scale
  (`--green-60`, `--grey-15`). A one-off layout size (a section's padding, a column's width)
  need not be a token.
- A token is one exact value: merging near-duplicates changes the look, so it is decided with
  the result in front of you.
- The font is set once on `body` and inherited; buttons repeat it only because a form control
  does not inherit it.
- Text contrast is at least 4.5:1, large text, icons and control borders at least 3:1, in
  every state, hover and focus included.

## Breakpoints

- The design is drawn at 1920, 1440 and 390 px. The code today uses `1440`, `1024` and `768`
  (`width <`, widest first); the exact scheme is fixed by MY-177, and until then a
  new media query takes only a value the code already uses and is checked at 1920, 1440 and
  390 px. This section is rewritten when the scheme lands.
- The base rule is the widest layout; a narrower screen overrides it.
- No horizontal scroll from 390 to 1920 px, and none at 200% zoom.

## Motion and focus

- Reduced motion is handled once, in `general/reset.css`; a component never adds its own
  `prefers-reduced-motion` block. A duration comes from a token (`--transition-duration`).
- A `transition` names its properties, never `all`.
- One `:focus-visible` rule in `general/` draws the ring for every control; never
  `outline: none` without a replacement.
- Use `hidden` or `inert` to take an element out of the page; text for assistive technology
  only is a utility class in `ui/`, not `display: none`, which hides it from them too.
- Every `@keyframes` lives in one stylesheet in `general/`.
