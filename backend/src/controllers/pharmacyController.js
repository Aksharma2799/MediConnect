const Pharmacy = require("../models/Pharmacy");
const { logger } = require("../utils/logger");

// Get nearby pharmacies
exports.getNearbyPharmacies = async (req, res) => {
  try {
    const { distance = 25, limit = 3 } = req.query;

    const pharmacies = await Pharmacy.find({ active: true })
      .select("name phone address distance open rating")
      .limit(parseInt(limit));

    logger.info("Nearby pharmacies fetched", { count: pharmacies.length });

    res.json({
      success: true,
      data: pharmacies,
      count: pharmacies.length,
    });
  } catch (error) {
    logger.error("Error fetching pharmacies", { error: error.message });
    res.status(500).json({
      success: false,
      error: { code: "FETCH_ERROR", message: error.message },
    });
  }
};

// Get pharmacy by ID
exports.getPharmacyById = async (req, res) => {
  try {
    const pharmacy = await Pharmacy.findById(req.params.id);

    if (!pharmacy) {
      return res.status(404).json({
        success: false,
        error: { code: "NOT_FOUND", message: "Pharmacy not found" },
      });
    }

    res.json({ success: true, data: pharmacy });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: "FETCH_ERROR", message: error.message },
    });
  }
};

// Create pharmacy profile
exports.createPharmacy = async (req, res) => {
  try {
    const { name, email, phone, address, city, state, pincode } = req.body;

    const pharmacy = new Pharmacy({
      userId: req.user.id,
      name,
      email,
      phone,
      address,
      city,
      state,
      pincode,
    });

    await pharmacy.save();
    logger.info("Pharmacy created", { pharmacyId: pharmacy._id });

    res.status(201).json({ success: true, data: pharmacy });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: { code: "CREATE_ERROR", message: error.message },
    });
  }
};

// Update pharmacy
exports.updatePharmacy = async (req, res) => {
  try {
    const pharmacy = await Pharmacy.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!pharmacy) {
      return res.status(404).json({
        success: false,
        error: { code: "NOT_FOUND", message: "Pharmacy not found" },
      });
    }

    logger.info("Pharmacy updated", { pharmacyId: pharmacy._id });
    res.json({ success: true, data: pharmacy });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: { code: "UPDATE_ERROR", message: error.message },
    });
  }
};
