# Memory Log — Voice-Task-AI

Read this first in any new session. It records what's been done, what's next, and why — so work resumes without re-deriving context.

---

## Last Updated
Session date: 2026-07-24 (per conversation; verify against actual commit timestamps)
Last commit: `b6f4119` — "Add delay/postpone task support (voice command, backend, UI badge)"

## Current State

### Phase 1 — Delay/Postpone: ✅ COMPLETE (committed & pushed)
Full chain verified working end-to-end via Thunder Client + live UI test:
- `Task.js` schema: added `status` (enum: active/completed/cancelled/delayed, default active) and `delayedUntil` (Date, default null) — additive, `completed` boolean untouched
- `taskController.js` `updateTask`: now accepts `status`/`delayedUntil` in PUT body, guarded with `!== undefined` so old requests are unaffected
- `Dashboard.jsx`:
  - `parseVoiceCommand`: added `delay`/`postpone` → `action = "delay"` detection
  - `removeWords` list: added `"delay"`, `"postpone"`, `"until"`, `"to"` — **this fix was necessary** because without it, parsed titles retained these words (e.g. "Delay Grocery To") and broke task-matching, causing false "Task not found" errors
  - `normalizeTask`: now preserves `status`, `delayedUntil` (previously these were being silently dropped after every API round-trip — this was the second bug found, blocking the UI badge from ever showing)
  - `handleConfirmTask`: added full "Voice Delay" branch — finds task via word-match, PUTs `status: "delayed"` + `delayedUntil: parsed.dueDate`, updates local state, toasts, speaks confirmation
- `TaskCard.jsx`: added amber "Delayed · <date>" badge, rendered conditionally when `status === "delayed"`. **Bug encountered & fixed:** initial edit left the `voiceCommand` conditional block unclosed (missing `)}`) which broke the whole file — fixed by closing that block before the new delayed block opens.

**Verified via live test:** "delay grocery task to tomorrow" → confirmed → task shows "DELAYED · JUL 25" badge on dashboard, no console errors.

### Phase 2 — Analytics: 🔄 IN PROGRESS
Decision made (Option 1, confirmed by user): replace "Productivity Velocity" and "Audio Feeds Captured" cards entirely with the 3 KPIs the assignment explicitly names. Final 4-card layout: **Completion Ratio, Completed On Time, Pending Tasks, Delayed Tasks.**

Done so far:
- `DashboardAnalyticsView.jsx`: added `getOnTimeCount` and `getDelayedCount` helper functions (not yet wired into UI — no visible change yet, confirmed no errors)
- `Dashboard.jsx` `normalizeTask`: added `updatedAt: task.updatedAt ?? null` — required because `getOnTimeCount` compares `updatedAt` (when a task was actually completed) against `dueDate`; without this the field was missing client-side even though the backend already returns it via Mongoose `timestamps: true`

**NOT yet done (next step when resuming):**
- Wire the 4 `AnalyticsCard` components into the JSX return of `DashboardAnalyticsView.jsx`, replacing the old "Productivity Velocity" / "Audio Feeds Captured" cards
- Verify the on-time calculation is actually correct in a live test (create a task, complete it before/after its due date, confirm the count reflects reality)
- Check whether there's a chart component (`ProductivityChart.jsx` was seen in the file tree but not yet opened/reviewed) that also needs updating to reflect real KPI data

### Known Bugs Fixed This Session (don't reintroduce)
1. Title-cleanup missing delay-related words → false "Task not found" on delay commands
2. `normalizeTask` dropping `status`/`delayedUntil` → backend data correct but invisible in UI
3. Unclosed JSX conditional in `TaskCard.jsx` → full component crash (caught via Vite error overlay + PROBLEMS tab)

### Known Limitations (documented, not yet fixed — see `rules.md` decision log)
- Task matching for voice complete/delete/delay uses word-overlap substring matching, not IDs — fragile with similar task titles
- "Cancel" (assignment term) vs "Delete" (implemented) distinction not yet addressed — flagged, not prioritized

## Environment Notes
- Local dev: `npm run dev` in both `client/` and `server/` (separate terminals)
- Backend: `http://localhost:5000`, MongoDB connects on boot (confirmed via terminal logs)
- Frontend: Vite dev server, typically `http://localhost:5173`
- Auth testing done via Thunder Client (VS Code extension) — register → login → copy JWT → use as Bearer token for `/api/tasks` requests
- Test user used this session: `test@example.com` / `password123`

## Next Session Should Start By
1. Reading this file + `phases.md` to confirm current phase
2. Resuming Phase 2 at "wire the 4 KPI cards into DashboardAnalyticsView.jsx JSX"
3. Following `rules.md` format strictly: one file, one step, wait for confirmation
