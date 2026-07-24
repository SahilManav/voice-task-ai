# Voice Task AI — Voice-First AI Task Manager

A MERN-stack task manager where the primary input method is natural language voice. Speak a command like *"Remind me to submit the quarterly report by next Friday"* and the app extracts structured task data automatically — no forms required.

Built for the Senpiper Engineering Assignment (Option A: Voice-First Task App).

---

## ✨ Features

- **Voice-to-task extraction** — speak naturally, the app parses title, priority, and due date automatically using the browser's native Speech Recognition API
- **Full task lifecycle** — create, complete, delete, and **delay/postpone** tasks, all controllable by voice or manually
- **Spoken feedback** — the assistant confirms actions out loud via text-to-speech
- **Structured voice command summary** — see exactly what was parsed (action, priority, due date) before confirming
- **JWT authentication** — secure per-user task data
- **Analytics dashboard** — real KPIs computed from your actual tasks:
  - Completion Ratio
  - Tasks Completed On Time
  - Pending Tasks
  - Delayed Tasks
  - Weekly Productivity Graph (real completions per day, last 7 days)
- **Modern dark-mode UI** — built with Tailwind CSS and Framer Motion

## 🖼️ Screenshots

<!-- Add screenshots here, e.g.: -->
<!-- ![Dashboard](./screenshots/dashboard.png) -->
<!-- ![Voice Assistant Panel](./screenshots/voice-panel.png) -->
<!-- ![Analytics](./screenshots/analytics.png) -->

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), Tailwind CSS, Framer Motion, lucide-react, react-hot-toast, react-router-dom, axios |
| Backend | Node.js, Express, MongoDB, Mongoose |
| Auth | JSON Web Tokens (JWT) |
| Voice | Browser-native Web Speech API (`SpeechRecognition` + `SpeechSynthesisUtterance`) — no external voice API required |
| Command Parsing | Custom rule-based natural language parser (client-side) |

## 🗣️ Voice Commands You Can Try

| Say this | What happens |
|---|---|
| "Create task submit assignment tomorrow high priority" | Creates a new task with the extracted title, due date, and priority |
| "Complete grocery run" | Marks the matching task as completed |
| "Delete old task" | Removes the matching task |
| "Delay grocery task to tomorrow" | Postpones the matching task, sets a new target date |
| "Remind me to call the dentist next Monday" | Creates a task due next Monday |

The parser understands relative dates (`today`, `tomorrow`, `next week`), weekdays (`Friday`, `next Monday`), and priority keywords (`urgent`, `high priority`, `low priority`).

## 📂 Project Structure

```
voice-task-ai/
├── client/          # React frontend (Vite)
│   └── src/
│       ├── components/   # UI components (dashboard, tasks, voice, common)
│       ├── pages/         # Route-level pages (Dashboard, Login, Register, Landing)
│       ├── context/       # Auth context
│       └── services/      # Axios API client
└── server/          # Express backend
    ├── controllers/  # Route handlers (auth, tasks)
    ├── models/       # Mongoose schemas (User, Task)
    ├── routes/       # Express routes
    └── middleware/   # JWT auth middleware
```

Full architecture notes are in [`Architecture.md`](./Architecture.md).

## 🚀 Getting Started (Windows / PowerShell)

### Prerequisites
- Node.js (v18+ recommended)
- A MongoDB connection string (local MongoDB or [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. Clone the repository
```powershell
git clone https://github.com/SahilManav/voice-task-ai.git
cd voice-task-ai
```

### 2. Set up the backend
```powershell
cd server
npm install
```

Create a `.env` file inside `server/`:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=your_random_secret_key_here
NODE_ENV=development
```

> ⚠️ Never commit your `.env` file or share real credentials. Generate a strong random string for `JWT_SECRET` (e.g. `openssl rand -base64 32` or any password generator).

Start the backend:
```powershell
npm run dev
```
You should see `MongoDB Connected` and `Server running on http://localhost:5000` in the terminal.

### 3. Set up the frontend
Open a **new** PowerShell terminal:
```powershell
cd voice-task-ai\client
npm install
```

Create a `.env` file inside `client/`:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:
```powershell
npm run dev
```
The app will be available at `http://localhost:5173`.

### 4. Use the app
1. Register a new account at `/register`
2. Log in
3. Click the microphone icon and start speaking a task command
4. Explore the Analytics tab to see your task metrics

## 🎙️ Browser Support Note
Voice input relies on the Web Speech API, which has the best support in **Chrome** and **Edge**. Firefox and Safari have limited or no support for `SpeechRecognition`.

## 🧭 Design Decisions Under Ambiguity

The assignment intentionally left some requirements open to interpretation. Key decisions made, with reasoning, are documented in [`rules.md`](./rules.md). Highlights:

- **Task status model**: added a dedicated `status` field (`active/completed/cancelled/delayed`) alongside the existing `completed` boolean, rather than replacing it — this kept all existing functionality working while adding support for the full lifecycle the assignment requires.
- **Task matching for voice actions** (complete/delete/delay): since users don't speak a task ID, matching is done via word-overlap against existing task titles. This is simple and effective for the assignment's scope, with a known limitation for tasks with very similar titles.

## 🗺️ Future Scope

- Smarter task matching (fuzzy matching / ranking instead of strict word-overlap)
- Distinguish "Cancelled" from "Deleted" as separate states
- Configurable voice settings (speech rate, language)
- Push/email reminders for upcoming due dates
- Deploy to Vercel (frontend) + Render (backend) for a live demo link

## 📄 License
This project was built as part of a technical assessment and is not currently licensed for reuse.

## 👤 Author
Sahil Manav — [GitHub](https://github.com/SahilManav)
