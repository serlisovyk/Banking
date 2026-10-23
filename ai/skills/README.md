# Skills

Repo-local skill playbooks. Tool-agnostic Markdown — any AI agent (Claude, Codex, others) reads
them directly. Each file has `name` + `description` frontmatter so it maps to a matching skill
entry when a tool supports one. A skill is a recipe; what must hold is in `ai/rules/`. The other
docs are listed in `AGENTS.md`.

- [section](section.md) — how a page section or a repeated element goes through data, partial,
  styles, an optional controller class, wiring on the page and in `main.js`, and docs.
- [review](review.md) — self-review of a diff: regressions, scope creep, accessibility, responsive
  layout, docs drift.
