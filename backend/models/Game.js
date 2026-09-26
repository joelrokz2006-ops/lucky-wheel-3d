const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  betAmount: {
    type: Number,
    required: true,
    min: [1, 'Bet amount must be positive']
  },
  resultIndex: {
    type: Number,
    required: true
  },
  multiplier: {
    type: Number,
    required: true
  },
  reward: {
    type: Number,
    required: true
  },
  balanceBefore: {
    type: Number,
    required: true
  },
  balanceAfter: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
});

module.exports = mongoose.model('Game', gameSchema);
