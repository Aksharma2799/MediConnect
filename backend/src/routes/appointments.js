const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Appointments endpoint - Coming soon'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: error.message }
    });
  }
});

module.exports = router;
