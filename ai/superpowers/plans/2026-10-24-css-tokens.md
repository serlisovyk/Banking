# Plan: CSS on the design system (MY-185)

Goal: the stylesheets of the finished sections (header, hero, products, cases, features, questions,
careers-hero, values) take every font size, section spacing and radius from tokens, the headings come
from one `section-heading` partial, and the breakpoints are the two structural ones of
`ai/decisions/2026-10-23-breakpoint-scheme.md`. Behavior is spec'd in `ai/superpowers/specs/2026-10-24-css-tokens.md`.

The design is not reachable in this task, so `ai/design-system.md` is the source of truth, including
the "Approximate values" it lists; they are kept and named in the report.

## Tokens (`general/variables.css`)

- `:root` holds the 1440 to 1920 segment of each fluid token; one `@media (width < 1440px)` in the same
  file redefines the fluid tokens as the 390 to 1440 segment. The formulas are the ones in the decision.
  A token that runs against the width (the hero bottom space) gets its `clamp` bounds the other way round.
- Fluid scales, named as in the design document: type (`--text-*`), the section gap, the heading block,
  card and grid spacing, the gutter, navbar, button and toggle sizes, hero, use-case, feature, FAQ, value
  and page-hero spacing. Anything that varies with the width is a token; a fixed size stays a plain value.
- Radii: `--border-radius-pill` (100px), `--border-radius-medium` (16px), `--border-radius-large` (20px) next
  to the existing `--border-radius` (40px, the plate) and `--border-radius-small` (12px).
- `fonts.css`: weight range 300 to 700 (the variable font is checked to contain the 300 instance).

## Shared pieces

- `components/section-heading` partial and stylesheet: title with an accent `<span>` from three parameters
  (`titleStart`, `titleAccent`, `titleEnd`, no HTML in a parameter), `text`, and an optional right slot given
  as a partial block (`{{#> components/section-heading }}`), rendered when it is present. It owns the
  block's spacing (default and with the toggle) and the centring below 1024 px.
- `ui/toggle.css`: the Individuals / Businesses pill, moved out of `products` because Testimonials will
  reuse it. `ui/headings.css` goes (its `h2` rule is the broken one, now `.section-heading__title`).
- `ui/button.css`: size, padding and radius from tokens; a `button--large` modifier for the hero action.

## Sections

Each stylesheet loses its per-width values and its `1440` queries and keeps only the structural queries.
`main.css`: `.container` from the gutter token and the 1596 px content width, `.section` padding half the
section gap. `hero`, `careers-hero`, `case-item`, `header`, `products`, `features`, `questions`, `values`,
`product-card`, `feature-item`, `question-item` move onto the tokens; the five section partials replace
their own heading markup with the `section-heading` partial. The class names a script reads stay.

## Docs

`ai/design-system.md` (tokens now exist, new values), `ai/rules/css.md` (section-heading, the planned note
goes), `ai/map.md`, `ai/skills/section.md` (heading step), the breakpoint decision's status to `accepted`
(its README says the implementing task sets it), `ai/decisions/README.md` index line.

## Verification

`npm run lint`, `lint:css`, `format:check`, `build`; the four pages of a build of `main` and of this branch
side by side at 1920 / 1440 / 390, spot checks at 1024 and 768; the burger, both toggles, the feature tabs
and the FAQ expander by mouse and keyboard.
