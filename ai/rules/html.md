# HTML Rules

Pages are assembled from partials by `vite-plugin-handlebars` (`vite.config.js`). Where
everything lives: `ai/map.md`; how the layers relate: `ai/rules/architecture.md`.

## Pages and partials

- A page is a shell: `<head>` and a list of `{{> section }}` calls. Section markup is never
  written on a page.
- `sections/` — one page section: `<section class="<name> section">` with a `.container`
  inside. `components/` — a repeated element (a card, a list item).
- A partial's file name is the name of its BEM block (`product-card.html` → `.product-card`);
  kebab-case.
- A partial has one root element with the block's class. A component is used by sections
  only; a section does not include another section.

## Partial parameters

- A repeated element takes its data as parameters: a hash (`{{> product-card title="…" }}`)
  or the context of `{{#each items}} {{> item }} {{/each}}`.
- A variation is a parameter flag and a BEM modifier
  (`{{#if inverted}} case-item--inverted{{/if}}`).
- The current page reaches a partial as a flag from `context` (`isHome`, `isCareers`, …); the
  current navigation link gets `aria-current="page"`.
- Template logic stays at `if` / `unless` / `each`: anything more is computed in `data/`.

## Data

- Texts and lists that repeat or are rendered by a loop live **only** in `data/*.js`, reach
  the templates through `context` in `vite.config.js`, and are never copied into a partial.
  A literal in a partial is for markup unique to that section.
- A `data/` file exports a named constant of plain values; it holds no markup, class names or
  styles. A new file is wired into `context`.

## Semantics and ARIA

- Semantic elements for the page regions (`header`, `nav`, `main`, `section`, `article`,
  `footer`); one `h1` per page, headings in order without skipping a level.
- A button for an action (`<button type="button">`), a link only for going to another
  address; a link that opens a new tab has `target="_blank"` and `rel="noopener"` and says so.
- A control with no visible text, or whose text is not enough, has an accessible name
  (`aria-label`); an icon next to text is decorative (`alt=""`, `aria-hidden="true"`).
- Widgets (tabs, disclosure, menu) carry their roles, `aria-controls` and
  `aria-labelledby` in the markup; the script changes only the states
  (`ai/rules/style.md`, "ARIA patterns").
- A hook for a script is a `data-<block>-<role>` attribute, not a BEM class.
- No inline `style`, no inline handlers, no `<br>` for spacing.
- Interface texts follow the design; one action has one name wherever it shows.
