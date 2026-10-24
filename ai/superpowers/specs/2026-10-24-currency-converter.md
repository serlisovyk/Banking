# Spec: currency converter (MY-193)

## Behavior

- The Money Exchange block of the hero card is a working converter: a currency and an amount on
  the left, the converted amount on the right, the olive **Exchange** button under them.
- Currencies: USD, EUR, INR, BTC, ETH, at fixed rates. It opens as 5000 INR to USD.
- Each side has a native select. The flag (coin icon for BTC and ETH) and the currency name next to
  it follow the selection. Choosing the same currency on both sides is allowed (the rate is 1).
- The result is recomputed on every keystroke and on every select change; nothing is submitted.
- **Exchange** swaps the two currencies and keeps the typed amount; the result is recomputed.
- Amounts: digits with an optional `.` or `,` as the decimal separator, from 0 to 1,000,000,000.
  Anything else (letters, a minus sign, two separators, too large) is invalid.
- Output is formatted with `Intl.NumberFormat` in English: thousands separated by commas, two
  decimals for fiat, up to eight for BTC and six for ETH, at least two.
- An empty field shows an em dash as the result. An invalid value shows an em dash too and marks the
  field `aria-invalid`.
- Under the card a **Supported Currency** pill shows the coin icons of USD, EUR, BTC and ETH.

## Keyboard and assistive technology

- Tab order: from-currency select, amount, to-currency select, Exchange. The arrows and `Alt`+`Down`
  work in the selects as in any native select; `Enter` and `Space` press Exchange.
- Both selects, the amount and the result have a name (a hidden label); each select is described by
  the currency name shown under it.
- The result is a live region (`aria-live="polite"`): it announces "12.00 USD" after a change, or
  "Enter an amount from 0 to 1,000,000,000" for an invalid value.

## Layout

- The block keeps the hero card's size at 1920, 1440 and 390 px; the currency boxes share the card
  width in two equal columns. No horizontal scroll from 320 to 2560 px.
- The Supported Currency pill overhangs the bottom right of the card, as the Monthly Income pill
  does at the top left.

## Not changed

- Your Transactions, the Monthly Income pill, the other sections and their scripts.
- No rates from a network: the converter works offline.
