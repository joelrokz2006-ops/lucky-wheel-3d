const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const { protect } = require('../middleware/authMiddleware');

router.post('/spin', protect, gameController.spin);
router.get('/history', protect, gameController.getHistory);
router.get('/stats', protect, gameController.getStats);

module.exports = router;
