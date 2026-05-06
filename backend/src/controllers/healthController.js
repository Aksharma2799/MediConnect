const HealthRecord = require("../models/HealthRecord");
const { logger } = require("../utils/logger");

// Get health snapshot
exports.getHealthSnapshot = async (req, res) => {
  try {
    // Return default health snapshot for demo
    res.json({
      success: true,
      data: {
        bloodPressure: "120/80",
        bloodSugar: 95,
        weight: 70,
        height: 175,
        lastCheckup: 15,
        activeMedicines: 1,
      },
    });
  } catch (error) {
    logger.error("Error fetching health snapshot", { error: error.message });
    res.status(500).json({
      success: false,
      error: { code: "FETCH_ERROR", message: error.message },
    });
  }
};

// Create health record
exports.createHealthRecord = async (req, res) => {
  try {
    const healthRecord = new HealthRecord({
      userId: req.user.id,
      ...req.body,
    });

    await healthRecord.save();
    logger.info("Health record created", { userId: req.user.id });

    res.status(201).json({ success: true, data: healthRecord });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: { code: "CREATE_ERROR", message: error.message },
    });
  }
};

// Update health record
exports.updateHealthRecord = async (req, res) => {
  try {
    const healthRecord = await HealthRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    if (!healthRecord) {
      return res.status(404).json({
        success: false,
        error: { code: "NOT_FOUND", message: "Health record not found" },
      });
    }

    res.json({ success: true, data: healthRecord });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: { code: "UPDATE_ERROR", message: error.message },
    });
  }
};

// Get health records
exports.getHealthRecords = async (req, res) => {
  try {
    const records = await HealthRecord.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    res.json({ success: true, data: records });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: "FETCH_ERROR", message: error.message },
    });
  }
};
