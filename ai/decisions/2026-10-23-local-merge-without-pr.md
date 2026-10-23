# Merge locally into `main`, no pull requests

Date: 2026-10-23 · Status: accepted

## Context

The repo has a single author. Pull requests were considered as the merge path, and the author
chose to merge locally instead: the approval is given in the chat, and a pull request would
only repeat it.

## Decision

- Each task is developed on a `my-<n>-<slug>` branch (in its own worktree when tasks run in
  parallel).
- After the author approves, the branch is rebased onto `main`, fast-forward merged locally,
  checked again, and `main` is pushed. No pull requests.
- The gate before the merge is the local checks (`AGENTS.md`, "Verification"); CI and a
  pre-commit hook, once they exist, are a signal, not a merge condition.
- The orchestrator merges one branch at a time and only after the author approved that branch.

## Consequences

- A broken Vercel build or a live site that no longer opens means `main` is broken: fix it right
  away with a follow-up commit.
- History stays linear (rebase and `--ff-only`); `main` is never force-pushed.
- Pull requests only come from bots, if any, and are merged deliberately, never blindly.
- Rejected: pull requests with required checks (the checks would reject direct pushes and add a
  step with no second reviewer); merge commits (a history that is not linear).
