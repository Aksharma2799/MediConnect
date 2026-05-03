const { verifyToken } = require("../utils/jwt");
const { logger } = require("../utils/logger");

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: {
          code: "UNAUTHORIZED",
          message: "No authentication token provided",
        },
      });
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        error: {
          code: "UNAUTHORIZED",
          message: "Invalid or expired token",
        },
      });
    }

    req.userId = decoded.userId;
    req.user = { id: decoded.userId };
    next();
  } catch (error) {
    logger.error("Auth middleware error:", error);
    res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_ERROR",
        message: "Authentication failed",
      },
    });
  }
};

const authenticate = auth;

const authorize = (...roles) => {
  return async (req, res, next) => {
    try {
      const User = require("../models/User");
      const user = await User.findOne({ userId: req.userId });

      if (!user || !roles.includes(user.role)) {
        return res.status(403).json({
          success: false,
          error: {
            code: "FORBIDDEN",
            message: "Insufficient permissions",
          },
        });
      }

      req.user = user;
      next();
    } catch (error) {
      logger.error("Role middleware error:", error);
      res.status(500).json({
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Authorization failed",
        },
      });
    }
  };
};

const requireRole = (...roles) => {
  return authorize(...roles);
};

module.exports = { auth, authenticate, authorize, requireRole };
