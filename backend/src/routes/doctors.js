const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');

// @route   GET /api/v1/doctors
// @desc    Get nearby doctors
// @access  Public
router.get('/', async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Doctors endpoint - Coming soon'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: error.message }
    });
  }
});

module.exports = router;
