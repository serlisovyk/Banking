# License declared in `package.json` only, no `LICENSE` file

Date: 2026-10-23 · Status: accepted

## Context

The repo needs a stated license. A separate `LICENSE` file was considered and the author found it
redundant next to the `package.json` field.

## Decision

- The project's license is MIT, declared only through `"license": "MIT"` in `package.json`.
- There is no `LICENSE` file in the repo.

## Consequences

- GitHub detects licenses from a `LICENSE` file only, so the repo's About box shows no license.
  This is accepted.
- Do not add a `LICENSE` file unless the author asks; a new dated record is needed if that changes.
- Rejected: a `LICENSE` file alongside the field (duplicates the same fact in two places).
