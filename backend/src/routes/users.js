const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');

// @route   GET /api/v1/users/:userId
// @desc    Get user profile
// @access  Private
router.get('/:userId', auth, async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'User endpoint - Coming soon'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: error.message }
    });
  }
});

module.exports = router;
