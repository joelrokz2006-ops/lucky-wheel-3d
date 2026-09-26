# GAME PROJECT INSTRUCTIONS
# ============================================================
# PURPOSE
# ============================================================
# This file is the master instruction/configuration document for
# building a React + Three.js + Node.js + MongoDB game.
#
# IMPORTANT:
# - Edit the sections marked [EDIT HERE].
# - Keep the overall structure unless you intentionally want
#   to change the architecture.
# - This project is designed for VIRTUAL CREDITS ONLY.
# - Do not add real-money deposits, withdrawals, cash prizes,
#   payment gateways, or real-money wagering to this version.
#
# Recommended use:
# - Feed this file to your CLI coding agent / AI coding assistant.
# - Ask it to follow this file as the source of truth.
# - Update this file whenever the project requirements change.


# ============================================================
# 1. PROJECT IDENTITY
# ============================================================

PROJECT_NAME = "Lucky Wheel 3D"

PROJECT_TYPE = "Luck-based virtual-credit game"

PROJECT_DESCRIPTION = """
[EDIT HERE]

Write a simple description of the game.

Example:
A 3D lucky wheel game where the player spends virtual credits,
spins a wheel, receives a randomly selected result from the
backend, and sees the result through a Three.js animation.
"""

PROJECT_GOAL = """
[EDIT HERE]

Example:
Build a simple, attractive, beginner-friendly full-stack game
that demonstrates React, Three.js, Node.js, Express, MongoDB,
authentication, server-side game logic, and game history.
"""

PROJECT_TARGET = """
[EDIT HERE]

Example:
The first version should be simple enough for one developer to
finish quickly, understand completely, and extend later.
"""


# ============================================================
# 2. CORE GAME RULES
# ============================================================

# Define the rules here.

GAME_RULES = """
[EDIT HERE]

Example:

1. Every new user receives 1,000 virtual credits.
2. The player selects a virtual bet amount.
3. The player clicks SPIN.
4. The backend generates the game result.
5. The frontend must never decide the authoritative result.
6. The wheel animates to the backend-selected result.
7. The reward is calculated from the selected multiplier.
8. The virtual balance is updated.
9. The game result is saved in MongoDB.
10. The player can view previous game results.
"""

INITIAL_BALANCE = 1000

CURRENCY_NAME = "Virtual Credits"

MIN_BET = 10
MAX_BET = 100


# ============================================================
# 3. WHEEL / GAME DATA
# ============================================================

# [EDIT HERE]
# Change the number of sectors and their multipliers.

WHEEL_SECTORS = [
    {
        "index": 0,
        "label": "0x",
        "multiplier": 0
    },
    {
        "index": 1,
        "label": "1x",
        "multiplier": 1
    },
    {
        "index": 2,
        "label": "0x",
        "multiplier": 0
    },
    {
        "index": 3,
        "label": "2x",
        "multiplier": 2
    },
    {
        "index": 4,
        "label": "0x",
        "multiplier": 0
    },
    {
        "index": 5,
        "label": "3x",
        "multiplier": 3
    },
    {
        "index": 6,
        "label": "0x",
        "multiplier": 0
    },
    {
        "index": 7,
        "label": "10x",
        "multiplier": 10
    }
]

# [EDIT HERE]
# Use only if your game requires weighted probability.
#
# Example format:
#
# RESULT_PROBABILITIES = [
#     { "result": 0, "probability": 50 },
#     { "result": 1, "probability": 20 },
#     { "result": 2, "probability": 15 },
#     { "result": 3, "probability": 10 },
#     { "result": 4, "probability": 5 }
# ]
#
# Total probability should equal 100.

RESULT_PROBABILITIES = "UNDEFINED"


# ============================================================
# 4. GAME FLOW
# ============================================================

GAME_FLOW = """
The complete game flow must be:

1. User opens the frontend.
2. User registers or logs in.
3. Frontend receives authentication token.
4. User enters the game screen.
5. Frontend loads the user's virtual balance.
6. User chooses a bet.
7. User presses the SPIN button.
8. Frontend sends the bet to the backend.
9. Backend authenticates the user.
10. Backend validates the bet.
11. Backend checks the user's balance.
12. Backend generates the authoritative result.
13. Backend calculates the reward.
14. Backend updates the virtual balance.
15. Backend stores the game result.
16. Backend returns the result to the frontend.
17. Frontend receives the result.
18. Three.js animates the wheel toward the correct sector.
19. Frontend displays win/loss information.
20. Frontend displays the updated balance.
21. Frontend enables another spin.
"""


# ============================================================
# 5. TECHNOLOGY STACK
# ============================================================

FRONTEND_STACK = """
[EDIT HERE]

- React
- Vite
- Three.js
- @react-three/fiber
- @react-three/drei
- Axios
- React Router
- Plain CSS
"""

BACKEND_STACK = """
[EDIT HERE]

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- dotenv
- cors
- Node.js crypto
"""

DO_NOT_USE = """
[EDIT HERE]

Unless explicitly added later, do not introduce:

- Tailwind CSS
- Prisma
- PostgreSQL
- Redis
- WebSockets
- Microservices
- Payment gateways
- Real-money wagering
- Unnecessary third-party services
"""

FRONTEND_API_BASE_URL = "http://localhost:5000/api"


# ============================================================
# 6. PROJECT STRUCTURE
# ============================================================

PROJECT_STRUCTURE = r"""
project-root/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Wallet.jsx
│   │   │   ├── BetSelector.jsx
│   │   │   ├── LuckyWheel.jsx
│   │   │   ├── SpinButton.jsx
│   │   │   ├── ResultModal.jsx
│   │   │   └── GameHistory.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Home.jsx
│   │   │   └── Game.jsx
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── GameContext.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── styles/
│   │   │   ├── Navbar.css
│   │   │   ├── Wallet.css
│   │   │   ├── BetSelector.css
│   │   │   ├── LuckyWheel.css
│   │   │   ├── SpinButton.css
│   │   │   ├── ResultModal.css
│   │   │   └── GameHistory.css
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── backend/
    ├── config/
    │   └── db.js
    │
    ├── controllers/
    │   ├── authController.js
    │   ├── gameController.js
    │   └── userController.js
    │
    ├── middleware/
    │   ├── authMiddleware.js
    │   └── errorMiddleware.js
    │
    ├── models/
    │   ├── User.js
    │   └── Game.js
    │
    ├── routes/
    │   ├── authRoutes.js
    │   ├── gameRoutes.js
    │   └── userRoutes.js
    │
    ├── utils/
    │   └── generateResult.js
    │
    ├── .env
    ├── server.js
    └── package.json
"""


# ============================================================
# 7. FRONTEND RESPONSIBILITIES
# ============================================================

FRONTEND_RESPONSIBILITIES = """
The frontend is responsible for:

- Rendering the game UI.
- Rendering the Three.js scene.
- Showing the wheel.
- Showing the pointer.
- Showing the selected bet.
- Showing loading and spinning states.
- Sending API requests.
- Receiving the authoritative game result.
- Animating the wheel to the returned result.
- Showing the result.
- Showing the current virtual balance.
- Showing game history.
- Handling normal UI errors.

The frontend must NOT:

- Decide the authoritative winning result.
- Directly modify the user's real database balance.
- Trust a client-provided balance.
- Assume that a local random result is the official result.
"""


# ============================================================
# 8. THREE.JS REQUIREMENTS
# ============================================================

THREE_JS_REQUIREMENTS = """
[EDIT HERE]

The Three.js scene should contain:

- Perspective camera
- Basic lighting
- Wheel
- Wheel sectors
- Center decoration
- Pointer
- Optional floor/background
- Optional glow/particles

The wheel must:

1. Start in an idle position.
2. Spin only after a successful backend result.
3. Rotate smoothly.
4. Accelerate at the start.
5. Rotate quickly in the middle.
6. Decelerate near the final position.
7. Stop on the exact sector received from the backend.
8. Prevent multiple simultaneous spins.
"""

WHEEL_ANIMATION_REQUIREMENTS = """
The target result is determined by the backend first.

Then:

backend result
    ->
frontend calculates target angle
    ->
frontend adds several full rotations
    ->
Three.js animates rotation
    ->
wheel stops on the target sector
"""


# ============================================================
# 9. BACKEND RESPONSIBILITIES
# ============================================================

BACKEND_RESPONSIBILITIES = """
The backend is authoritative for all game logic.

The backend must:

- Authenticate users.
- Validate requests.
- Validate bet amounts.
- Read the user's current balance from MongoDB.
- Reject insufficient balance.
- Generate the authoritative result.
- Calculate multiplier.
- Calculate reward.
- Update balance.
- Save game history.
- Return a consistent JSON response.

Never allow the frontend to determine the official outcome.
"""


# ============================================================
# 10. RANDOM RESULT RULE
# ============================================================

RANDOM_RESULT_RULE = """
[EDIT HERE]

Default rule:

Use Node.js crypto.randomInt() or another appropriate
server-side secure randomness mechanism.

Do not use Math.random() as the authoritative backend
result generator.

The server chooses the result first.
The client only visualizes that result.
"""


# ============================================================
# 11. DATABASE MODELS
# ============================================================

USER_MODEL = r"""
User:
{
    name: String,
    email: String,
    password: String,
    balance: Number,
    createdAt: Date
}
"""

GAME_MODEL = r"""
Game:
{
    user: ObjectId,
    betAmount: Number,
    resultIndex: Number,
    multiplier: Number,
    reward: Number,
    balanceBefore: Number,
    balanceAfter: Number,
    createdAt: Date
}
"""


# ============================================================
# 12. AUTHENTICATION
# ============================================================

AUTH_REQUIREMENTS = """
Required endpoints:

POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me

Requirements:

- Hash passwords before storing.
- Never store plain-text passwords.
- Use JWT for authenticated requests.
- Protect game routes.
- Store JWT on the frontend according to the project design.
- Attach the token as:

Authorization: Bearer <token>
"""


# ============================================================
# 13. API CONTRACT
# ============================================================

API_ENDPOINTS = """
AUTH

POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me


USER

GET /api/user/profile
GET /api/user/balance


GAME

POST /api/game/spin
GET  /api/game/history
GET  /api/game/stats
"""


# ============================================================
# 14. SPIN API
# ============================================================

SPIN_REQUEST = r"""
POST /api/game/spin

Request:

{
    "betAmount": 50
}
"""

SPIN_RESPONSE = r"""
Success:

{
    "success": true,
    "resultIndex": 5,
    "multiplier": 3,
    "reward": 150,
    "balance": 1100
}
"""

SPIN_SERVER_FLOW = """
1. Authenticate user.
2. Validate betAmount.
3. Read user from database.
4. Validate minimum/maximum bet.
5. Validate sufficient balance.
6. Save balanceBefore.
7. Generate resultIndex.
8. Find multiplier.
9. Calculate reward.
10. Calculate balanceAfter.
11. Update user balance.
12. Save game record.
13. Return result.
"""


# ============================================================
# 15. ERROR HANDLING
# ============================================================

ERROR_STATES = """
Frontend should support:

- Loading
- Spinning
- Success
- Invalid bet
- Insufficient balance
- Unauthorized
- Server error
- Network error
- Game already in progress

Backend should return predictable error responses.

Example:

{
    "success": false,
    "message": "Insufficient balance"
}
"""


# ============================================================
# 16. REACT GAME STATES
# ============================================================

GAME_STATES = """
Recommended state flow:

IDLE
  ->
REQUESTING_RESULT
  ->
SPINNING
  ->
RESULT
  ->
IDLE

Error path:

IDLE
  ->
REQUESTING_RESULT
  ->
ERROR
  ->
IDLE
"""


# ============================================================
# 17. UI REQUIREMENTS
# ============================================================

UI_REQUIREMENTS = """
[EDIT HERE]

Main game screen should include:

1. Game title
2. Virtual balance
3. Bet selector
4. Three.js wheel
5. Pointer
6. Spin button
7. Current selected bet
8. Result message
9. Game history

Style:

- Clean
- Modern
- Responsive
- Mobile-friendly
- Easy to understand
- Clear typography
- Smooth animations
- No unnecessary visual clutter
"""

COLOR_THEME = """
[EDIT HERE]

Primary:
Secondary:
Background:
Card:
Text:
Accent:
Success:
Danger:
"""


# ============================================================
# 18. COMPONENT RESPONSIBILITIES
# ============================================================

COMPONENT_RESPONSIBILITIES = """

Navbar.jsx
- Navigation
- User status
- Logout

Wallet.jsx
- Show virtual balance

BetSelector.jsx
- Select allowed bet

LuckyWheel.jsx
- Three.js scene
- Wheel rendering
- Wheel animation
- Stop at backend-selected result

SpinButton.jsx
- Start spin request
- Disabled during spin

ResultModal.jsx
- Show result
- Show multiplier
- Show reward
- Show updated balance

GameHistory.jsx
- Fetch history
- Display previous games
"""


# ============================================================
# 19. SECURITY / TRUST RULES
# ============================================================

SECURITY_RULES = """
1. Treat the frontend as untrusted.
2. Never trust client-provided balances.
3. Never trust client-provided rewards.
4. Never trust client-provided result indexes.
5. Validate bet amounts on the server.
6. Authenticate protected endpoints.
7. Hash passwords.
8. Keep JWT secret in .env.
9. Keep MongoDB URI in .env.
10. Keep server secrets out of source control.
11. Validate MongoDB IDs and request bodies.
12. Prevent repeated spin requests while a spin is active.
13. Add sensible API rate limiting before production.
14. Use atomic/transaction-safe balance updates where needed.
15. Keep the game virtual-credit-only.
"""


# ============================================================
# 20. ENVIRONMENT VARIABLES
# ============================================================

ENVIRONMENT_VARIABLES = """
Backend .env example:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret
CLIENT_URL=http://localhost:5173
"""


# ============================================================
# 21. DEVELOPMENT PHASES
# ============================================================

DEVELOPMENT_PHASES = """

PHASE 1 - PROJECT SETUP
-----------------------
- Create frontend
- Create backend
- Install dependencies
- Configure Vite
- Configure Express
- Configure MongoDB
- Verify both servers run


PHASE 2 - FRONTEND UI
---------------------
- Create layout
- Create navbar
- Create wallet
- Create bet selector
- Create spin button
- Create result area
- Create history area


PHASE 3 - THREE.JS
------------------
- Create scene
- Add camera
- Add lights
- Create wheel
- Create sectors
- Add pointer
- Add rotation
- Add smooth spin animation


PHASE 4 - AUTH
--------------
- User model
- Register
- Login
- JWT
- Protected route
- Current user


PHASE 5 - GAME BACKEND
----------------------
- Game model
- Spin controller
- Random result
- Reward calculation
- Balance update
- Game history


PHASE 6 - FRONTEND/BACKEND INTEGRATION
---------------------------------------
- Axios service
- JWT interceptor
- Spin API
- Loading state
- Result handling
- Balance refresh
- History refresh


PHASE 7 - POLISH
----------------
- Better wheel model
- Sound
- Particles
- Confetti
- Better result modal
- Responsive design
- Empty/error states


PHASE 8 - TESTING
-----------------
- Register test
- Login test
- Invalid bet test
- Insufficient balance test
- Spin test
- Result consistency test
- Balance update test
- History test
- Multiple-click protection test
- Refresh/re-login test
"""


# ============================================================
# 22. CLI / AI CODING AGENT RULES
# ============================================================

CLI_AGENT_RULES = r"""
You are working as the coding agent for this project.

Follow these rules:

1. Read this file before making changes.
2. Treat the editable sections as the source of truth.
3. Do not silently change the project architecture.
4. Do not add libraries unless necessary.
5. Do not replace the chosen stack without permission.
6. Do not use Tailwind CSS unless explicitly requested.
7. Use separate CSS files for components/pages.
8. Keep frontend and backend clearly separated.
9. Keep game authority on the backend.
10. Keep the game virtual-credit-only.
11. Explain important architectural changes.
12. Do not generate fake API responses when a real API should exist.
13. Do not hide errors.
14. Validate all backend input.
15. Keep functions small and understandable.
16. Use meaningful variable names.
17. Add comments only where they improve understanding.
18. Do not over-engineer.
19. Finish one milestone before moving to the next.
20. Run tests/build checks after major changes.
21. If a requirement is ambiguous, use the simplest reasonable
    implementation and document the assumption.
22. Before deleting or replacing existing project files, inspect them.
23. Preserve working code unless the change requires modification.
24. After each milestone, summarize:
    - what was changed
    - files changed
    - how to run it
    - how to test it
    - known issues
"""


# ============================================================
# 23. HOW THE CLI AGENT SHOULD WORK
# ============================================================

CLI_WORKFLOW = """
For every task:

STEP A
Read GAME_PROJECT_INSTRUCTIONS.md.

STEP B
Inspect the current project files.

STEP C
Identify what already exists.

STEP D
Implement only the requested milestone.

STEP E
Run the relevant commands.

STEP F
Fix errors.

STEP G
Report the completed files and verification steps.

Never skip directly to a complicated phase when an earlier phase
is incomplete.
"""


# ============================================================
# 24. DEFINITION OF DONE
# ============================================================

DEFINITION_OF_DONE = """
The project is considered complete when:

[ ] Frontend starts successfully.
[ ] Backend starts successfully.
[ ] MongoDB connection works.
[ ] Registration works.
[ ] Login works.
[ ] JWT protection works.
[ ] User balance loads.
[ ] Bet selector works.
[ ] Spin request works.
[ ] Backend generates the official result.
[ ] Reward calculation works.
[ ] Balance updates correctly.
[ ] Game history is saved.
[ ] Three.js wheel spins.
[ ] Wheel stops on the server-selected result.
[ ] Result popup works.
[ ] Multiple spin clicks are prevented.
[ ] Errors are displayed properly.
[ ] Responsive UI works.
[ ] Production-sensitive secrets are stored in .env.
[ ] No real-money functionality exists.
"""


# ============================================================
# 25. FUTURE FEATURES
# ============================================================

FUTURE_FEATURES = """
[EDIT HERE]

Possible later features:

- User profile
- Leaderboard
- Daily virtual-credit bonus
- Multiple wheel themes
- Different game modes
- Sound settings
- Theme settings
- Statistics dashboard
- Admin configuration for virtual game settings
- More Three.js effects
"""


# ============================================================
# 26. CURRENT MILESTONE
# ============================================================

CURRENT_MILESTONE = """
[EDIT HERE]

Example:

MILESTONE 1:
Create the frontend and backend project structure.

Requirements:
- Vite React frontend
- Express backend
- MongoDB connection
- Basic home page
- Health-check endpoint

Do not implement authentication or game logic yet.
"""


# ============================================================
# 27. CHANGE LOG
# ============================================================

CHANGE_LOG = """
[EDIT HERE]

2026-09-26
- Initial project instruction created.
- Base game: Lucky Wheel 3D.
- Virtual credits only.
"""


# ============================================================
# 28. CUSTOM NOTES
# ============================================================

CUSTOM_NOTES = """
[EDIT HERE]

Write any personal project rules here.

Examples:

- I prefer CommonJS in the Node.js backend.
- I want JavaScript, not TypeScript.
- I want separate CSS files.
- I want beginner-friendly code.
- I do not want unnecessary abstractions.
- I want each milestone implemented step by step.
"""


# ============================================================
# END OF MASTER INSTRUCTION FILE
# ============================================================
