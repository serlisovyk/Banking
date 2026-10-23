# JavaScript in OOP style: a class per component and per section

Date: 2026-10-23 · Status: accepted (not implemented)

## Context

The scripts are procedural: one module per section, each finding its own root and keeping state
in a closure. The author writes in OOP style and wants every new section to land in an obvious
place with one shape, not as another loose module.

## Decision

- All JavaScript is ES classes with encapsulated state (`#private` fields and methods), one class
  per file, named exports.
- `scripts/components/` holds reusable widgets (tabs, disclosure, menu); `scripts/controllers/`
  holds one controller per section; `main.js` is the composition root that creates instances and
  calls `start()`.
- One constructor shape, `constructor(root, options)`; `start()` attaches the listeners; one
  method vocabulary (`render*`, `show*` / `hide*`, `open` / `close`).
- Composition over inheritance: no base classes, factories or DI containers.
- The details are `ai/rules/oop.md`.

## Consequences

- New JavaScript is a class or a method in the right folder, never a loose function or
  module-level state.
- The existing procedural modules stay until a planned task migrates them; that task sets this
  record to `accepted`.
- The `review` skill and the Definition of Done check the OOP conventions.
- Rejected: keeping a function per section (it repeats root lookup, state and listener code in
  every module and gives no place for a shared widget); a custom-elements layer (a second
  lifecycle on top of a handful of widgets).
