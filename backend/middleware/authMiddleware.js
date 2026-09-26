const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { isDbConnected } = require('../config/db');
const memoryStore = require('../utils/memoryStore');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretjwtkey_luckywheel3d_2026');

      let user;
      if (isDbConnected()) {
        user = await User.findById(decoded.id).select('-password');
      } else {
        const memUser = await memoryStore.findUserById(decoded.id);
        if (memUser) {
          user = {
            _id: memUser._id,
            name: memUser.name,
            email: memUser.email,
            balance: memUser.balance
          };
        }
      }

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User no longer exists'
        });
      }

      req.user = user;
      return next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired authorization token'
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.'
    });
  }
};

module.exports = { protect };
