# Working Rules — AI Collaboration on Voice-Task-AI

These rules govern how any AI assistant (Claude, Gemini, or otherwise) should work on this codebase. They exist because AI assistants tend to over-rewrite code if left unconstrained, which risks silently breaking working features.

## Hard Rules

1. **Do NOT rewrite the architecture.** The current structure (see `Architecture.md`) stays as-is unless the user explicitly asks for a restructure.
2. **Do NOT refactor files** unless explicitly asked to.
3. **Do NOT output code for more than one file at a time.**
4. **Work exactly ONE STEP AT A TIME.** No multi-step plans executed in a single turn without checking in.
5. **Never guess the file structure.** Always ask the user to paste the relevant file first if it hasn't been shared yet — never assume a function/component exists or looks a certain way.
6. **Always name the exact file to open.** Never tell the user to "search around" for something.
7. **Wait for user confirmation after every step** before proposing the next change.

## Required Format for Every Code Change

```
📂 File: <exact path>
📍 Location: <exact place in the file — function name, line context, or surrounding code>
✍️ Code: <exact code to add/replace — smallest necessary diff>
✅ Test: <exact steps to verify the change works>
⛔ Stop and wait for confirmation
```

## Backward Compatibility Requirements
- Every schema/field addition must be **additive only** — existing fields (e.g. `completed` boolean) must keep working exactly as before. New fields (e.g. `status`, `delayedUntil`) are added alongside, never replacing, until the user explicitly asks to migrate away from the old field.
- Every backend update handler must use `!== undefined` checks for new optional fields, so requests that don't send them leave existing data untouched.

## Decision Log (assumptions made under ambiguity)

These are documented per the assignment's own evaluation criterion: *"Your design decisions in case of ambiguous requirements."*

| Ambiguity | Decision made | Reasoning |
|---|---|---|
| Assignment says tasks should be "cancelled," codebase has "delete" | Kept as hard delete for now; flagged as a possible future Cancel-vs-Delete distinction (separate status value, not yet implemented) | Avoided scope creep on a already-working feature until user prioritizes it |
| Task status model was previously a single `completed` boolean, can't represent 4 states | Added a new `status` enum field (`active/completed/cancelled/delayed`) *alongside* the existing `completed` boolean, rather than migrating/removing `completed` | Zero-risk to existing working CRUD and analytics that already read `completed` |
| How does a voice "delay" command specify a new date | Reused the existing `dueDate`-extraction logic (today/tomorrow/next week/weekday) already present in `parseVoiceCommand`, applied to populate `delayedUntil` | Consistent parsing behavior across all actions; no new NLP logic needed |
| How to match a spoken task title to an existing task (no ID spoken) | Word-overlap substring match against existing task titles | Simple, works for demo scope; documented as a known limitation rather than over-engineered |

## Session Continuity
At the start of any new AI session working on this project, read `memory.md` first — it contains the current state, last completed step, and next planned step, so work can resume without re-deriving context from scratch.
