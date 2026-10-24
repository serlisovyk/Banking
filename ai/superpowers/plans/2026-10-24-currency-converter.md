# Plan: currency converter (MY-193)

Goal: a working Money Exchange in the hero card. Behavior is in
`ai/superpowers/specs/2026-10-24-currency-converter.md`. No open questions: the author's answers of
2026-10-24 are final (native `<select>`, fiat and crypto, fixed rates in `data/`, live recalculation,
**Exchange** swaps).

## Decisions made in this plan

- **A component, not a controller.** The converter is one widget in a hero card, so
  `components/CurrencyConverter.js` (`constructor(root, options)`, `start()`) and `main.js` creates it
  directly from a row `[data-currency-converter]` (`ai/rules/oop.md`: a ready component needs no
  controller). The root hook sits on the converter's own block, not on the hero.
- **The markup carries the rates.** `data/currency-rates.js` exports `currencies`; the partial
  renders the options with `data-converter-rate` and `data-converter-digits`, and the script reads
  them. No import of `data/` into the script, no `context` beyond one new entry.
- **Defaults live in the markup**: `data-converter-from="INR"`, `data-converter-to="USD"` on the root
  and `value="5000"` on the input; `start()` applies them (a conditional `selected` attribute would
  break Prettier, `ai/rules/html.md`).
- **Flag, coin and name per currency are rendered once and toggled with `hidden`**, like the panels
  of `Toggle`, so a switch never loads an image and the page has no flash before the script runs
  (all start `hidden`).
- Amount field: `<input type="text" inputmode="decimal">` (a `number` input hides invalid text and
  mishandles `,`); result: `<output aria-live="polite">`. Both validated by one private static
  parser.
- A decision record covers the rates and the select (`ai/decisions/`).

## Changes

- `data/currency-rates.js` → `currencies`: `code`, `name`, `icon`, `glyph` (the Supported Currency
  icon, absent for INR), `rate` (units per 1 USD), `fractionDigits`, `isCrypto`; wired in `context`.
  Rates: USD 1, EUR 0.86, INR 88, BTC 0.00001, ETH 0.00025.
- `assets/images/flags/eu.svg`: a small hand-drawn round flag (twelve stars). BTC and ETH use the
  existing coin icons.
- `partials/components/currency-converter.html` (title, two sides, the result, the Exchange button);
  `hero.html` includes it in place of the old `hero__change` block and button, and gains the
  Supported Currency pill after the card.
- `styles/components/currency-converter.css` (box, divider lines, native select on tokens with
  `color-scheme: dark`, the button moved from `.hero__button`); `styles/sections/hero.css` loses
  `.hero__change-title` and `.hero__button` and gains the pill; `styles/ui/visually-hidden.css` for the
  hidden labels; tokens `--icon-currency`, `--space-converter-cell`; imports in `style.css`.
- `scripts/components/CurrencyConverter.js`, its constants in `scripts/constants.js`
  (`CURRENCY_CONVERTER`: locale, maximum, texts), one row in `main.js`.

## Changed while building

- The select and the amount have a 44 px touch height (the select by a negative margin, so the row
  keeps the icon's height); a coin icon's padding is a share of `--icon-currency`.
- The Supported Currency pill sits flush with the card's right edge below 768 px: its 20 px overhang
  scrolled the page sideways at 320 px.
- An invalid amount is also underlined with a wavy line, so the state is not only the dash.

## Docs

- A decision record `fixed rates, no API; native select` and its line in the index.
- `ai/map.md`: the partial, the data file, the styles, the component. `ai/rules/oop.md`: the list of
  components. `ai/rules/css.md`: nothing (the utility class rule exists).
- `.size-limit.json` only if the JS passes 3 kB gzip.

## Verification

`npm run lint`, `lint:css`, `format:check`, `build`, `size`. `npm run preview -- --port 4193`: type
amounts, both selects, Exchange, empty and invalid input, keyboard only, the hidden texts present;
1920, 1440, 390 and 320 px; the other widgets still work.

## Left out

- Live rates, more currencies, a swap animation, remembering the choice.
