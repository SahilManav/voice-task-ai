# Architecture — Voice-Task-AI

## Stack
- **Frontend:** React + Vite, Tailwind CSS, Framer Motion, lucide-react icons, react-hot-toast, react-router-dom, axios
- **Backend:** Node.js + Express, MongoDB + Mongoose, JWT auth
- **Voice:** Browser-native Web Speech API (`SpeechRecognition` / `webkitSpeechRecognition`) for input, `SpeechSynthesisUtterance` for spoken feedback — no external voice API used
- **Command parsing:** Custom rule-based parser (`parseVoiceCommand` in `Dashboard.jsx`) — regex/keyword matching, not an LLM call

## Folder Structure

```
voice-task-ai/
├── client/
│   └── src/
│       ├── components/
│       │   ├── analytics/
│       │   ├── common/          # shared components e.g. Button
│       │   ├── dashboard/       # main dashboard UI pieces
│       │   │   ├── AnalyticsCard.jsx
│       │   │   ├── CreateTaskModal.jsx
│       │   │   ├── DashboardAnalyticsView.jsx
│       │   │   ├── DashboardHeader.jsx
│       │   │   ├── DashboardOverview.jsx
│       │   │   ├── DashboardSettingsView.jsx
│       │   │   ├── DashboardStats.jsx
│       │   │   ├── DashboardTasks.jsx
│       │   │   ├── DashboardVoiceView.jsx   # voice tab wrapper (presentational)
│       │   │   ├── Navbar.jsx
│       │   │   ├── ProductivityChart.jsx
│       │   │   ├── RecentCommands.jsx
│       │   │   ├── Sidebar.jsx
│       │   │   ├── TaskCard.jsx
│       │   │   ├── VoiceAssistantPanel.jsx  # voice modal UI (presentational)
│       │   │   └── VoicePromptsCard.jsx
│       │   ├── landing/
│       │   └── tasks/
│       ├── context/              # AuthContext (JWT/user state)
│       ├── pages/
│       │   ├── Dashboard.jsx     # ⭐ owns ALL state: tasks, voice recognition,
│       │   │                       command parsing, API calls
│       │   ├── Landing.jsx
│       │   ├── Login.jsx
│       │   └── Register.jsx
│       ├── services/
│       │   └── api.js            # axios instance, baseURL from VITE_API_URL
│       ├── routes/                # react-router route definitions
│       ├── hooks/                 # currently empty
│       ├── utils/                 # currently empty
│       ├── constants/
│       └── styles/
│
└── server/
    ├── config/                    # DB connection etc.
    ├── controllers/
    │   ├── authController.js
    │   └── taskController.js      # createTask, getTasks, updateTask, deleteTask
    ├── middleware/
    │   └── authMiddleware.js      # `protect` — JWT verification
    ├── models/
    │   ├── Task.js                # title, description, dueDate, priority,
    │   │                            completed, status, delayedUntil, user, timestamps
    │   └── User.js
    ├── routes/
    │   ├── authRoutes.js
    │   └── taskRoutes.js          # all protected by `protect` middleware
    ├── services/                  # currently empty
    ├── utils/
    ├── validations/
    │   └── taskValidation.js
    ├── .env
    └── server.js
```

## Key Architectural Fact: Where Voice Logic Actually Lives

Despite folder names like `components/voice/`, `hooks/`, `services/` on the client and `services/` on the server suggesting a dedicated voice/NLP module, **all voice logic is centralized in `client/src/pages/Dashboard.jsx`**:

- `handleMicToggle()` — initializes `SpeechRecognition`, manages listening state
- `parseVoiceCommand(text)` — the entire NLP parsing logic (action detection, priority, due date extraction, title cleanup) — pure client-side, no AI/LLM API call
- `handleConfirmTask()` — routes parsed action (`create`/`complete`/`delete`/`delay`) to the correct API call
- `speak(message)` — text-to-speech feedback via `SpeechSynthesisUtterance`

`VoiceAssistantPanel.jsx` and `DashboardVoiceView.jsx` are **pure presentational components** — they receive `transcript`, `aiResponse`, `isListening` etc. as props and render UI only. They contain zero logic.

This matters for anyone (human or AI) picking up this codebase: **do not look for voice logic in `services/`, `hooks/`, or `components/voice/` — those are currently empty placeholders.**

## Data Flow (Voice Command → Task Update)

```
User speaks
  → SpeechRecognition (browser API) captures transcript
  → onend handler calls parseVoiceCommand(transcript)
  → returns { action, title, priority, dueDate, preview }
  → preview shown in VoiceAssistantPanel via aiResponse state
  → user clicks "Confirm Task"
  → handleConfirmTask() re-parses transcript, branches on `action`:
      - "complete" → finds matching task by title-word overlap → PUT /tasks/:id
      - "delete"   → finds matching task → DELETE /tasks/:id
      - "delay"    → finds matching task → PUT /tasks/:id { status: "delayed", delayedUntil }
      - default    → POST /tasks (create)
  → local `tasks` state updated optimistically/on response
  → toast + speak() confirms to user
```

## Task Matching Strategy (for complete/delete/delay)
There is no task ID spoken by the user — matching is done by **word-overlap**: every word in the parsed (cleaned) title must appear as a substring somewhere in an existing task's title. This is intentionally simple (see `rules.md` for the reasoning) and works for the assignment's demo scope, but is a known fragility point for tasks with similar/overlapping titles.

## Auth Flow
JWT issued on `/api/auth/login`, stored client-side (check `AuthContext.jsx` for exact storage mechanism — localStorage vs memory), sent as `Authorization: Bearer <token>` on all `/api/tasks/*` requests via `protect` middleware.
