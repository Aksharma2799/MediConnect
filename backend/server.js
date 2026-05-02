require("dotenv").config();
const app = require("./src/app");
const { connectDB } = require("./src/config/database");
const { logger } = require("./src/utils/logger");

const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB()
  .then(() => {
    logger.info("✅ Database connected");

    // Start Server
    const server = app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
    });

    // Graceful Shutdown
    process.on("SIGTERM", () => {
      logger.info("SIGTERM received. Shutting down gracefully...");
      server.close(() => {
        logger.info("Server closed");
        process.exit(0);
      });
    });
  })
  .catch((err) => {
    logger.error("❌ Database connection failed:", err);
    process.exit(1);
  });
