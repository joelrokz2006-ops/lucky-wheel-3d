const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// In-memory data structures
const memoryUsers = new Map();
const memoryGames = [];

const memoryStore = {
  // User operations
  async findUserByEmail(email) {
    const normalized = email.toLowerCase().trim();
    for (const u of memoryUsers.values()) {
      if (u.email === normalized) return u;
    }
    return null;
  },

  async findUserById(id) {
    return memoryUsers.get(String(id)) || null;
  },

  async createUser({ name, email, password, balance = 1000 }) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const id = crypto.randomUUID();

    const user = {
      _id: id,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      balance: balance,
      createdAt: new Date(),
      async matchPassword(enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
      }
    };

    memoryUsers.set(id, user);
    return user;
  },

  async updateUserBalance(id, newBalance) {
    const user = memoryUsers.get(String(id));
    if (user) {
      user.balance = newBalance;
      return user;
    }
    return null;
  },

  // Game operations
  async createGame(gameData) {
    const game = {
      _id: crypto.randomUUID(),
      ...gameData,
      createdAt: new Date()
    };
    memoryGames.unshift(game);
    return game;
  },

  async getGamesByUserId(userId, limit = 20) {
    return memoryGames
      .filter((g) => String(g.user) === String(userId))
      .slice(0, limit);
  },

  async getAllGamesByUserId(userId) {
    return memoryGames.filter((g) => String(g.user) === String(userId));
  }
};

module.exports = memoryStore;
