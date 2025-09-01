# 🎨 Tone Picker App

An interactive text-rewriting tool powered by **Mistral AI** that lets you adjust the formality, warmth, and directness of your text by selecting a point on a 3×3 tone grid.

---

## 🚀 Features

- ✍️ Rewrite text while preserving meaning  
- 🎚️ Adjust style with tone dimensions (**Formality, Warmth, Directness**)  
- ⚡ API caching for instant repeated results  
- 🌐 CORS-safe for local & deployed setups  
- 🛡️ Error handling + retry logic  

---

## 🛠️ Tech Stack

- **Frontend:** React + Vite + Tailwind  
- **Backend:** Node.js + Express + Axios  
- **AI:** Mistral Chat API  
- **Other:** dotenv, cors, crypto  

---

## ⚙️ Setup Instructions

### 1. Clone
```bash
git clone https://github.com/your-username/tone-picker.git
cd tone-picker4
```

### 2. Install
```bash
cd server && npm install
cd ../client && npm install
```

### 3. Configure
Inside server/.env:

```
MISTRAL_API_KEY=your_mistral_api_key_here
PORT=8787
CORS_ORIGINS=http://localhost:5173
```

### 4. Run
```bash
# Start backend
cd server
npm run dev

# Start frontend
cd ../client
npm run dev
```

Backend → http://localhost:8787

Frontend → http://localhost:5173

## 📡 API Endpoints
GET /api/health
Health check.

Response:
```json

{ "ok": true, "service": "tone-picker-server" }
```

POST /api/tone
Rewrite with chosen tone.
Request:

```json
{
  "text": "Can we reschedule our meeting?",
  "row": 2,
  "col": 1
}
```
Response:

```json
{
  "ok": true,
  "text": "Hey! Can we move our meeting to another time?",
  "cached": false
}
```


## 🧩 Deployment Guide
### 🔹 Backend (Server)
You can host the Express API on:
Render (free tier)
Heroku (Dyno / Hobby plan)

Example: Deploy to Render
Push your repo to GitHub.
On Render, create a New Web Service.
Select the server/ folder as root.
Add environment variables:
```env

MISTRAL_API_KEY=your_key_here
CORS_ORIGINS=https://your-frontend-domain.com
```

Build Command:

```bash

npm install && npm run build
```

Start Command:

```bash

npm start
```

Render gives you a live API URL → e.g. https://tone-picker-backend.onrender.com

🔹 Frontend (Client)
You can host the React client on:

Vercel
Netlify

Example: Deploy to Vercel
Push your repo to GitHub.
On Vercel, import the client/ folder.

Add env variable in Vercel dashboard:

```ini

VITE_API_URL=https://tone-picker-backend.onrender.com/api
```

Deploy → you’ll get https://tone-picker.vercel.app

🔹 Update Client API
In client/src/utils/api.ts, set:

```ts
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8787/api";
```

On Vercel → VITE_API_URL is used

Locally → defaults to http://localhost:8787/api

## 🔧 Development Notes
Retry logic: 3 attempts w/ exponential backoff for Mistral API

Cached responses via SHA256 (text+row+col)

Tone styles defined dynamically in index.ts

## 📜 License
MIT License © 2025 Kundanaa

## 🙌 Acknowledgements

Mistral AI for powering tone rewriting
OpenAI ecosystem inspiration for project design
TailwindCSS for rapid UI styling



