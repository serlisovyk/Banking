# Docs Rules

Every task starts by reading the docs, so they stay short. The code is the source of **how**;
docs answer **where** (`ai/map.md`), **what must hold** (`ai/rules/`, `ai/skills/`) and
**why** (`ai/decisions/`).

- **One fact, one home.** Grep before adding a fact; link instead of copying. A doc does not
  retell the code (parameters, data shapes, constants) or another doc.
- **No history in current docs.** No task numbers, "since MY-…", measurements or check logs:
  they belong to commits, plans and reports. A rule says what holds now; a decision says why.
  The one exception is a short note on a change a later task will make (a planned migration):
  it may name that task (`MY-<n>`), and the task that lands the change deletes the note.
- **No other projects.** A doc never cites or compares with another of the author's projects;
  a rule or a decision stands on its own reasons.
- **Name folders, partials and classes, not file paths,** where that is enough: paths change,
  names last.
- **Limits.** `ai/map.md`: at most 150 lines and 12 KB, a list item at most about 150
  characters, a table cell at most 80. A rules file: about 150 lines. A skill: about 12 KB.
  A decision record: about 30 lines. `ai/design-system.md`: about 350 lines. README: Features at most 10 one-line items. A plan or a
  spec cites decisions, it does not retell them.
- **A task adds a line or two per doc, and cuts when a limit is crossed** — in the same
  change, from the doc that went over.
- **Update only what the change made wrong:** a page, partial, stylesheet, script, data file or
  asset folder added, renamed or removed → the map; a pattern reshaped → the rule or skill; a
  durable decision → a record (criteria in `ai/decisions/README.md`); what a user sees, the
  scripts or the structure → a short line in `README.md`, if the repo has one.
- **Language.** Everything in `ai/`, `AGENTS.md` and `CLAUDE.md` is English; Linear issues are
  Russian.
