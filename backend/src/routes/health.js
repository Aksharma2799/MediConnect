const router = require("express").Router();
const healthController = require("../controllers/healthController");
const { authenticate } = require("../middleware/auth");

// All health routes require authentication
router.get("/snapshot", authenticate, healthController.getHealthSnapshot);
router.post("/", authenticate, healthController.createHealthRecord);
router.put("/:id", authenticate, healthController.updateHealthRecord);
router.get("/records", authenticate, healthController.getHealthRecords);

module.exports = router;
