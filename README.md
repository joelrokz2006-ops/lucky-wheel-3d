# 🎡 Lucky Wheel 3D

A modern full-stack 3D Lucky Wheel game built with **React**, **Three.js / React Three Fiber**, **Node.js**, **Express**, and **MongoDB**. Features server-authoritative cryptographic randomness, authentic casino physics, and virtual credit wagering.

---

## 🌟 Features

- **🎮 Real 3D Canvas Scene**: Dynamic lighting, 8 distinct color-coded sectors, outer gold rim with physical pegs, top pointer with spring wobble physics, and particle stars.
- **🔒 Server-Authoritative RNG**: Results are securely generated on the Node.js backend using `crypto.randomInt()`.
- **🪙 Virtual Credits Only**: Players start with 1,000 free virtual credits and can refill credits anytime. No real-money wagering.
- **🔊 Web Audio Synthesizer**: In-browser audio effects for spinning clicks, winning fanfares, 10x jackpot chimes, and button feedback.
- **🔐 JWT Authentication**: Complete registration, login, and token-protected endpoints with bcrypt password hashing.
- **📜 Live Game History**: HUD table recording spins, wagers, multipliers, and net profits in real-time.
- **⚡ Resilient Storage**: Supports MongoDB database connections and automatically falls back to in-memory store for instant zero-config testing.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Three.js, `@react-three/fiber`, `@react-three/drei`, React Router v6, Axios, Plain CSS.
- **Backend**: Node.js, Express.js, MongoDB / Mongoose, JWT, bcryptjs, crypto, cors, dotenv.

---

## 🚀 Quick Start (Push & Pull Ready)

### 1. Clone or Pull the Repository
```bash
git clone <your-repository-url>
cd "spin game"
```

### 2. Install All Dependencies (Single Command)
```bash
npm run install:all
```
*(Or install individually: `cd backend && npm install`, then `cd frontend && npm install`)*

### 3. Setup Backend Environment (Optional)
The backend works out-of-the-box in auto-storage mode. To connect to MongoDB Atlas or local MongoDB:
```bash
cp backend/.env.example backend/.env
```
*(Configure `MONGO_URI` in `backend/.env` if desired)*

### 4. Run Both Frontend & Backend Concurrently
```bash
npm run dev
```

- **Frontend App**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`
- **Health Check**: `http://localhost:5000/api/health`

---

## 🧪 Testing & Build

- **Run Backend Unit Tests**:
  ```bash
  npm test
  ```
- **Build Frontend for Production**:
  ```bash
  npm run build
  ```

---

## 📡 API Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/health` | Backend Health Check | No |
| `POST` | `/api/auth/register` | Create user & claim 1,000 credits | No |
| `POST` | `/api/auth/login` | Login user & get JWT token | No |
| `GET` | `/api/auth/me` | Get current user profile | Yes (Bearer token) |
| `GET` | `/api/user/balance` | Get current virtual balance | Yes (Bearer token) |
| `POST` | `/api/game/spin` | Place bet (10 - 100) & spin wheel | Yes (Bearer token) |
| `GET` | `/api/game/history` | Get recent spin logs | Yes (Bearer token) |
| `GET` | `/api/game/stats` | Get aggregated stats & win rate | Yes (Bearer token) |

---

## 📄 License
ISC
