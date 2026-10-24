# Plan: shared-faq (MY-192)

Goal: the FAQ section becomes one partial any page includes with its own questions, and several
FAQs on a page do not clash. No spec: Home looks and behaves as before; the only visible change is
the email in the subtitle becoming a `mailto:` link. No open questions.

## Changes

- `partials/sections/home/questions.html` → `partials/sections/shared/faq.html`. The BEM block follows the
  file name (`ai/rules/css.md`), so `questions` becomes `faq` throughout: `.faq__*` classes,
  `styles/sections/faq.css`, the root hook `data-faq`, the expanded modifier `faq__more--expanded`, the
  custom property `--faq-expanded-height`. `components/question-item` stays: it is an item, not the section.
- Parameters: `groups` (`{ initial, additional }`, the shape of `questionGroups`) and `name`, a short
  word per instance. The region `id` and the button's `aria-controls` are `faq-{{name}}-more`, so two
  instances never share an id. Home calls `{{> sections/shared/faq name="home" groups=questionGroups }}`.
- Data: one shared set, `questionGroups` in `data/question-items.js` (the design shows the same questions on
  Home, Careers and Security). A page that needs its own questions passes another object with the same
  shape as `groups`; the partial reads nothing from the global `context`. No new data file and no new
  `context` key until a page really has its own set.
- Subtitle link: `components/section-heading` gets two optional parameters, `linkText` and `linkHref`,
  rendered as an `<a class="section-heading__link">` at the end of the text (a parameter never carries
  HTML, `ai/rules/html.md`). The FAQ passes `support@yourbank.com` / `mailto:support@yourbank.com`. The link is
  `--green-60`, with an underline on hover under `(hover: hover)`; the global focus ring covers the keyboard.
- JS: `FaqController` and `Disclosure` already work inside their root; `main.js` creates one controller per
  `[data-faq]`. Only the selector and the `FAQ` constants (class, property) are renamed.
- "Load All FAQ's": the closed state keeps the fade over the lower part of the shown row and the centred
  button pulled up over it (`ai/design-system.md`, "FAQ fade"); compared at 1920 / 1440 / 390 and left as is
  unless it differs.
- `src/index.html`: only the FAQ partial line changes.

## Docs

- `ai/map.md`: the pages line, the partials line, the data line (`questionGroups` is the default set),
  the hook `data-faq`.
- `ai/rules/architecture.md`, `css.md`: the examples that name `--questions-expanded-height` and
  `.questions__button`.
- `ai/skills/section.md`: nothing, the pattern did not change.

## Verification

`npm run lint`, `lint:css`, `format:check`, `build`, `size`; `dist/404.html` equals `dist/index.html`;
`npm run preview -- --port 4192`: the FAQ on Home at 1920 / 1440 / 390 against the `main` build, Load All and
Show Less with the mouse and the keyboard, the mailto link, no console errors. The two-instance case: the
partial rendered twice on a page with different data and names, both toggle independently with their own
`aria-controls`; removed afterwards, not committed.

## Left out

- FAQ on Careers and Security (MY-198, MY-201); a per-page question set (the pages add it when they need it).
