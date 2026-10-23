# Vanilla JavaScript, Vite and Handlebars; no framework, no TypeScript

Date: 2026-10-23 · Status: accepted

## Context

The site is a few static pages with small interactions (a menu, tabs, a switch, an expander).
It is a portfolio project meant to show clean, framework-free front-end work. Repeated markup
has to come from partials rather than copies.

## Decision

- Plain HTML, modular plain CSS with native nesting, vanilla JavaScript (ESM), Vite.
- Partials and data through `vite-plugin-handlebars`: `sections/`, `components/`, and `data/`
  wired in `context` of `vite.config.js`.
- No React, Vue, Angular or another UI framework; no TypeScript; no CSS preprocessor or utility
  framework; no backend.
- Structure grows by splitting modules along real boundaries, not by changing the stack.

## Consequences

- A request that implies a framework or TypeScript reverses this record: it needs the author's
  explicit ask and a new dated record.
- Interaction and state are written by hand, kept simple and in the style of `ai/rules/oop.md`.
- Linters, a pre-commit hook and CI are not part of this decision and are not forbidden
  (`ai/rules/scope.md`).
- Rejected: a framework with static generation (a runtime and a build model far above what four
  pages need); TypeScript (types for a few hundred lines of DOM code); a Sass or utility-CSS
  layer (native nesting and custom properties already cover the need).
