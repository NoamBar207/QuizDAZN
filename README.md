# Ancient Rome Quiz

A full-stack multiple-choice quiz about Ancient Rome. Five random questions per round, twenty seconds per question, with hints, scoring, and a correct-answer timing bonus.

| Layer    | Stack                          |
|----------|--------------------------------|
| Frontend | React 19, TypeScript, Vite 5   |
| Backend  | Node.js, Express, TypeScript   |
| Database | MongoDB (Mongoose)             |

The backend serves questions only — it does **not** collect or store user scores or sessions.

---

## Prerequisites

- **Node.js** 20.18+ (tested on 20.18.1)
- **MongoDB** — local instance or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) URI

---

## Quick start

```bash
# 1. Install dependencies (root, client, and server)
npm run install:all

# 2. Configure the server
cp server/.env.example server/.env
# Edit server/.env — set MONGODB_URI (local or Atlas)

# 3. Seed questions into MongoDB (once)
cd server && npm run seed

# 4. Run both apps
cd .. && npm start
```

- **Client:** http://localhost:5173  
- **Server:** http://localhost:5000  

`npm start` runs the Express API and Vite dev server together via `concurrently`. `npm run dev` is an alias.

---

## Scripts

| Command | Location | Description |
|---------|----------|-------------|
| `npm start` | root | Run server + client in dev mode |
| `npm run dev:server` | root | Express API only (`:5000`) |
| `npm run dev:client` | root | Vite dev server only (`:5173`) |
| `npm run install:all` | root | Install root, client, and server deps |
| `npm run seed` | server | Load `server/data/questions.json` into MongoDB |
| `npm run build` | client | Production build → `client/dist/` |
| `npm run build` | server | Compile TypeScript → `server/dist/` |
| `npm start` | server | Run compiled server (`node dist/index.js`) |

---

## Seeding questions

Question data lives in `server/data/questions.json` (20 questions). Each entry:

```json
{
  "question": "Who was the first Roman emperor?",
  "options": ["Julius Caesar", "Augustus", "Nero", "Trajan"],
  "correctIndex": 1,
  "hint": "He was adopted by Julius Caesar."
}
```

- `options`: 2–4 strings  
- `correctIndex`: 0-based index into `options`  
- `hint`: shown automatically after 10 seconds per question  

To reload the database after editing the file:

```bash
cd server && npm run seed
```

---

## Environment variables

Copy `server/.env.example` to `server/.env`:

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `5000` | Express listen port |
| `MONGODB_URI` | `mongodb://localhost:27017/ancient-rome-quiz` | MongoDB connection string |

Never commit `.env` — it is gitignored.

---

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Server status and DB connectivity |
| `GET` | `/api/quiz` | Five random questions |

**Health response:**

```json
{ "status": "ok", "db": "connected" }
```

**Quiz response:**

```json
{
  "questions": [
    {
      "id": "...",
      "question": "...",
      "options": ["...", "..."],
      "correctIndex": 0,
      "hint": "..."
    }
  ]
}
```

**Errors:** `503` if the database is empty (run seed) · `500` on server error  

In development, the Vite client proxies `/api/*` to `http://localhost:5000`.

Verify manually:

```bash
curl http://localhost:5000/api/health
curl http://localhost:5000/api/quiz
```

---

## How the quiz works

1. **Start** — fetch 5 random questions from the API  
2. **Per question (20s)** — countdown timer; hint appears at 10s; user selects an answer (visual only until timer ends)  
3. **Reveal (1s)** — correct answer highlighted; score updated  
4. **Results** — final score and total time spent on correct answers (React state only)  
5. **Play again** — resets all client state  

Client state machine: `idle → loading → questionActive → revealing → results`

---

## Project structure

```
Quiz/
├── client/                 # React frontend
│   └── src/
│       ├── api/            # fetchQuiz()
│       ├── components/     # Timer, QuestionCard, OptionsList
│       ├── helpers/        # UI helpers (e.g. optionsListHelpers)
│       ├── hooks/          # useQuiz, useQuizEffects
│       ├── pages/          # StartScreen, QuizScreen, ResultsScreen
│       ├── state/          # useReducer + domain modules (no React)
│       ├── styles/         # SCSS (base/, pages/, components/)
│       └── types/
├── server/
│   ├── data/questions.json # Static question bank
│   ├── scripts/seed.ts     # Seed script
│   └── src/
│       ├── config/db.ts
│       ├── models/Question.ts
│       └── routes/quiz.ts
└── package.json            # Root scripts (npm start, install:all)
```

---

## Production build

```bash
# Client
cd client && npm run build
# Static files in client/dist/

# Server
cd server && npm run build && npm start
# Requires MONGODB_URI in server/.env
```

Serve `client/dist` with any static host. Point API requests to the Express server (configure proxy or CORS as needed for your deployment).

---

## Known limitations

- `correctIndex` is included in the API response so the client can reveal answers after the timer (acceptable for this assignment; no server-side sessions).  
- Some `correctIndex` values in `questions.json` may be historically debatable — content issue, not a schema bug.  
- No automated test suite included.
