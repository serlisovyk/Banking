# Currency converter: fixed rates, no API, a native select

Date: 2026-10-24 · Status: accepted

## Context

The hero card's Money Exchange had to become a working converter, the main interactive feature of the
home page. It needed rates, a way to pick a currency, and an answer to what the **Exchange** button does.

## Decision

- **Rates are static data.** `data/currency-rates.js` lists each currency with its rate as units per
  1 USD, a name, an icon and the number of decimals. No network request, no key, no backend
  (`ai/rules/scope.md`). The numbers are round and illustrative, not market data.
- **Five currencies, fiat and crypto:** USD, EUR, INR, BTC, ETH. The partial renders the options from
  the data and the script reads the rates from the options' `data-*` attributes, so the data file is
  the only place a rate is written.
- **Currency is chosen in a native `<select>`**, styled on tokens; the flag (or coin icon) and the
  name beside it follow the selection.
- **Exchange swaps the two currencies** and keeps the amount; the result is recomputed on every input.

## Consequences

- The converter works offline and in a static build; it shows no rate date, because there is none.
- A new currency is one entry in the data file, plus a flag or coin icon in `assets/`.
- The look of the open dropdown is the browser's: a native select cannot show flags in its options.
- Rejected: a live rates API (a key or a proxy, CORS, loading and error states: a backend in all but
  name); a custom listbox with `aria-*` (more script and accessibility to maintain for the same job
  on a four-page site; it can replace the select later if the options must show flags); an
  `<input type="number">` for the amount (it hides invalid text and refuses a comma as the decimal
  separator).
