const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const User = require("../models/User");
const { generateTokens } = require("../utils/jwt");
const { logger } = require("../utils/logger");

// @route   POST /api/v1/auth/register
// @desc    Register a new user
// @access  Public
router.post("/register", async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, phone, role } = req.body;

    // Validation
    if (!email || !password || !firstName || !lastName || !phone) {
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_REQUEST",
          message: "Missing required fields",
        },
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: {
          code: "CONFLICT",
          message: "Email or phone already exists",
        },
      });
    }

    // Create user
    const user = new User({
      userId: uuidv4(),
      email,
      password,
      firstName,
      lastName,
      phone,
      role: role || "patient",
    });

    await user.save();

    // Generate tokens
    const { token, refreshToken } = generateTokens(user.userId);

    logger.info(`User registered: ${user.email}`);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      refreshToken,
      user: user.toJSON(),
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/v1/auth/login
// @desc    Login user
// @access  Public
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_REQUEST",
          message: "Email and password required",
        },
      });
    }

    // Find user
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        error: {
          code: "UNAUTHORIZED",
          message: "Invalid credentials",
        },
      });
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: {
          code: "UNAUTHORIZED",
          message: "Invalid credentials",
        },
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate tokens
    const { token, refreshToken } = generateTokens(user.userId);

    logger.info(`User logged in: ${user.email}`);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      refreshToken,
      user: user.toJSON(),
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/v1/auth/logout
// @desc    Logout user
// @access  Private
router.post("/logout", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

module.exports = router;
