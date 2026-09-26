const User = require('../models/User');
const { isDbConnected } = require('../config/db');
const memoryStore = require('../utils/memoryStore');

// @desc    Get logged in user profile
// @route   GET /api/user/profile
// @access  Private
exports.getProfile = async (req, res, next) => {
  try {
    let user;
    if (isDbConnected()) {
      user = await User.findById(req.user._id).select('-password');
    } else {
      user = await memoryStore.findUserById(req.user._id);
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        balance: user.balance,
        createdAt: user.createdAt
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get logged in user's current balance
// @route   GET /api/user/balance
// @access  Private
exports.getBalance = async (req, res, next) => {
  try {
    let balance;
    if (isDbConnected()) {
      const user = await User.findById(req.user._id).select('balance');
      balance = user ? user.balance : null;
    } else {
      const user = await memoryStore.findUserById(req.user._id);
      balance = user ? user.balance : null;
    }

    if (balance === null || balance === undefined) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    return res.status(200).json({
      success: true,
      balance
    });
  } catch (err) {
    next(err);
  }
};
