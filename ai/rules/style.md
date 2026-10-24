# Style Rules

Prettier decides the formatting (`.prettierrc`); these are the rules it does not. HTML
structure and data: `ai/rules/html.md`; CSS: `ai/rules/css.md`; classes: `ai/rules/oop.md`.

## General

- **No comments in code** — HTML, CSS, JavaScript and the root configs. Names and small
  functions say what the code does; a durable "why" goes to a rule, a skill or a decision
  record.
- Follow the naming and spacing patterns already in the repo before introducing new ones.
- Files, folders, partials and data files are kebab-case; a class file is the class's
  PascalCase name (`ai/rules/oop.md`).

## JavaScript

- Early `return` instead of nested `if` / `else`; no nested ternaries.
- **A clean `return`:** a name, a literal, one call or a boolean of names. A chain, a
  comparison, `??` or a ternary is computed into a `const` first.
- **Named conditions:** a long or compound condition becomes a named `const`
  (`isHorizontal`) or early returns, one idea per line; no side effect inside a condition.
- **Booleans** start with `is`, `has`, `can` or `should` — fields, results and options too.
- No magic numbers or strings: a breakpoint, a delay or a key name is a named constant.
- Repeated scaffolding goes into one private helper.
- **Blank lines group steps** (guard, work, result). A guard is its own paragraph, or has no
  blank line inside when it is one or two lines.
- Parameter names say what they are (`selectedTab`, `isExpanded`), not a bare `x` or `result`.
- An empty `catch {}` is not written: return a fallback.
- ARIA state attributes are set as strings: `String(isOpen)`.
- A DOM handler is a private method called from an inline arrow
  (`addEventListener('click', () => this.#handleClick())`); an arrow-function field only for
  a function that is both added and removed.

## Hooks for scripts

- A script finds its elements by `data-*` attributes (`data-tab-panel`,
  `data-toggle-button`, `data-header-nav`), never by BEM classes. A class says how
  something looks, an attribute says what the code does with it, so renaming a class never
  breaks a script.
- A state is shown to CSS by a native attribute (`aria-expanded`, `hidden`, `inert`) or a
  BEM modifier; JS never writes a style, except a custom property that carries a number.

## ARIA patterns

Roles, `aria-controls` and `aria-labelledby` are in the partial; the script changes states.

- **Tabs** (`tablist` / `tab` / `tabpanel`): `aria-selected` on the tabs and `tabindex="-1"`
  on the inactive ones; the arrows move the selection, `Home` and `End` go to the ends,
  `aria-orientation` follows the layout; a panel is named by `aria-labelledby`.
- **Disclosure** — a button with `aria-expanded` and `aria-controls`; the hidden content is
  out of the tab order (`inert` or `hidden`); a changed label is text, not only an icon.
- **Menu** (the mobile navigation) — a button with `aria-expanded`, `aria-controls` and a
  label that changes with the state; `Escape` closes it and returns focus to the button; a
  followed link closes it.
- **A two-state switch** (a group of buttons with `aria-pressed`) is not tabs unless it
  drives panels with the `tabpanel` role.
- Every control is reachable and usable by keyboard and shows a visible focus.
