require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const { logger } = require("./utils/logger");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Security Middleware
app.use(helmet());

// CORS Configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  }),
);

// Body Parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Logging
app.use(morgan("combined", { stream: logger.stream }));

// Rate Limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW) * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS),
  message: "Too many requests, please try again later.",
});
app.use("/api/", limiter);

// Health Check Route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP", message: "API is running" });
});

// API Routes
app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/users", require("./routes/users"));
app.use("/api/v1/doctors", require("./routes/doctors"));
app.use("/api/v1/appointments", require("./routes/appointments"));
app.use("/api/v1/payments", require("./routes/payments"));

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: "NOT_FOUND",
      message: `Route ${req.originalUrl} not found`,
    },
  });
});

// Error Handler Middleware
app.use(errorHandler);

module.exports = app;
