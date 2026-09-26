const Game = require('../models/Game');
const User = require('../models/User');
const { isDbConnected } = require('../config/db');
const memoryStore = require('../utils/memoryStore');
const { generateResult, MIN_BET, MAX_BET } = require('../utils/generateResult');

// @desc    Execute a spin with a given bet amount
// @route   POST /api/game/spin
// @access  Private
exports.spin = async (req, res, next) => {
  try {
    const { betAmount } = req.body;

    // 1. Validate betAmount format
    const bet = Number(betAmount);
    if (!bet || !Number.isInteger(bet) || bet <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid bet amount. Please specify a valid integer.'
      });
    }

    // 2. Validate MIN/MAX bet range
    if (bet < MIN_BET || bet > MAX_BET) {
      return res.status(400).json({
        success: false,
        message: `Bet amount must be between ${MIN_BET} and ${MAX_BET} credits.`
      });
    }

    // 3. Fetch latest user balance
    let user;
    if (isDbConnected()) {
      user = await User.findById(req.user._id);
    } else {
      user = await memoryStore.findUserById(req.user._id);
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    // 4. Validate sufficient balance
    if (user.balance < bet) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient balance to place this bet.'
      });
    }

    // 5. Generate authoritative result from backend
    const balanceBefore = user.balance;
    const selectedSector = generateResult();
    const multiplier = selectedSector.multiplier;
    const reward = bet * multiplier;
    const balanceAfter = balanceBefore - bet + reward;

    // 6. Update user balance
    let gameRecordId;
    if (isDbConnected()) {
      user.balance = balanceAfter;
      await user.save();

      const gameRecord = await Game.create({
        user: user._id,
        betAmount: bet,
        resultIndex: selectedSector.index,
        multiplier: multiplier,
        reward: reward,
        balanceBefore: balanceBefore,
        balanceAfter: balanceAfter
      });
      gameRecordId = gameRecord._id;
    } else {
      await memoryStore.updateUserBalance(user._id, balanceAfter);
      const gameRecord = await memoryStore.createGame({
        user: user._id,
        betAmount: bet,
        resultIndex: selectedSector.index,
        multiplier: multiplier,
        reward: reward,
        balanceBefore: balanceBefore,
        balanceAfter: balanceAfter
      });
      gameRecordId = gameRecord._id;
    }

    // 7. Return official result to frontend
    return res.status(200).json({
      success: true,
      resultIndex: selectedSector.index,
      multiplier: multiplier,
      reward: reward,
      balance: balanceAfter,
      balanceBefore: balanceBefore,
      betAmount: bet,
      gameId: gameRecordId
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get user's game spin history
// @route   GET /api/game/history
// @access  Private
exports.getHistory = async (req, res, next) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);
    let history;

    if (isDbConnected()) {
      history = await Game.find({ user: req.user._id })
        .sort({ createdAt: -1 })
        .limit(limit);
    } else {
      history = await memoryStore.getGamesByUserId(req.user._id, limit);
    }

    return res.status(200).json({
      success: true,
      count: history.length,
      history
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get aggregated game statistics for user
// @route   GET /api/game/stats
// @access  Private
exports.getStats = async (req, res, next) => {
  try {
    let games;
    if (isDbConnected()) {
      games = await Game.find({ user: req.user._id });
    } else {
      games = await memoryStore.getAllGamesByUserId(req.user._id);
    }

    const totalSpins = games.length;
    let totalBet = 0;
    let totalWon = 0;
    let winsCount = 0;
    let highestWin = 0;

    for (const g of games) {
      totalBet += g.betAmount;
      totalWon += g.reward;
      if (g.reward > 0) winsCount++;
      if (g.reward > highestWin) highestWin = g.reward;
    }

    return res.status(200).json({
      success: true,
      stats: {
        totalSpins,
        totalBet,
        totalWon,
        netProfit: totalWon - totalBet,
        winsCount,
        lossesCount: totalSpins - winsCount,
        winRate: totalSpins > 0 ? ((winsCount / totalSpins) * 100).toFixed(1) + '%' : '0%',
        highestWin
      }
    });
  } catch (err) {
    next(err);
  }
};
