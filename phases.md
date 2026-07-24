# Roadmap — Phases

Ordered by return-on-time relative to the assignment's stated grading criteria (not by visual impact).

## Phase 1 — Delay/Postpone Task ✅ COMPLETE
*Highest priority: explicitly required by assignment, previously missing entirely.*

- [x] Add `status` enum (`active/completed/cancelled/delayed`) + `delayedUntil` to `Task` schema
- [x] Add DELAY/POSTPONE detection to `parseVoiceCommand` action detection
- [x] Add `delay`/`postpone`/`until`/`to` to title-cleanup `removeWords` list (fixed task-matching bug)
- [x] Accept `status`/`delayedUntil` in backend `updateTask` controller (backward-compatible, `!== undefined` guards)
- [x] Preserve `status`/`delayedUntil` through `normalizeTask` on the frontend
- [x] Add "Delay" branch to `handleConfirmTask` — finds task, calls PUT with new status/date
- [x] Add visual "Delayed" badge to `TaskCard.jsx`
- [x] Committed & pushed (`b6f4119`)

## Phase 2 — Analytics 🔄 IN PROGRESS
*Second priority: assignment explicitly evaluates "how useful the KPIs you have chosen would be in practice."*

Decision: replace vague/decorative KPIs ("Productivity Velocity," "Audio Feeds Captured") with the 3 KPIs the assignment explicitly names, keeping Completion Ratio as a summary card.

- [x] Add `getOnTimeCount` helper (completed before/at due date)
- [x] Add `getDelayedCount` helper (status === "delayed")
- [x] Add `updatedAt` passthrough in `normalizeTask` (dependency for on-time calc)
- [ ] Wire 4 final KPI cards into `DashboardAnalyticsView.jsx`: Completion Ratio, Completed On Time, Pending Tasks, Delayed Tasks
- [ ] Verify chart/visual component (if any) reflects real data, not placeholders

## Phase 3 — Voice Assistant Polish ⬜ NOT STARTED
*Make the feature feel like a convincing AI assistant, not empty boxes.*

- [ ] Replace "No transcript" empty state with a structured "Last Voice Command" summary (parsed action, status, priority, due date)
- [ ] Surface parse confidence / fallback messaging when a command can't be matched to a task

## Phase 4 — Dashboard Polish ⬜ NOT STARTED
*Minor — most of header/stats/cards are already in good shape.*

- [ ] Small visual QA pass only, no major redesign

## Phase 5 — Settings Page ⬜ NOT STARTED
*Currently just a placeholder ("Settings Console").*

- [ ] Voice Enabled toggle
- [ ] Speech Rate control
- [ ] Default Priority
- [ ] Theme toggle
- [ ] Notification toggle
(Pure frontend state is acceptable — no backend persistence required for assignment scope.)

## Phase 6 — README ⬜ NOT STARTED
*Required for submission.*

Must include: Architecture, Screenshots, Voice Commands list, Tech Stack, Installation steps, Features, Folder Structure, Future Scope.

## Phase 7 — Deployment ⬜ NOT STARTED (Optional)
- [ ] Frontend → Vercel
- [ ] Backend → Render
- [ ] Update README with live link

## Explicitly Out of Scope
- Fancy animations, particle backgrounds, 3D effects, large redesigns — deprioritized; do not add without explicit user request.
