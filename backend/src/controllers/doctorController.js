const Doctor = require("../models/Doctor");
const { logger } = require("../utils/logger");

// Get nearby doctors with filters
exports.getNearbyDoctors = async (req, res) => {
  try {
    const {
      distance = 25,
      maxFee = 2000,
      specialization,
      gender,
      minRating = "any",
      availableToday,
      onlineConsult,
      languages,
      search,
      sort = "nearest",
    } = req.query;

    let query = { active: true };

    // Filter by specialization
    if (specialization) {
      query.specialization = specialization;
    }

    // Filter by gender
    if (gender && gender !== "any") {
      query.gender = gender;
    }

    // Filter by fee
    query.fee = { $lte: parseInt(maxFee) };

    // Filter by rating
    if (minRating !== "any") {
      const ratingValue = parseFloat(minRating);
      query.rating = { $gte: ratingValue };
    }

    // Filter by availability
    if (availableToday === "true") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      query.availableSlots = {
        $elemMatch: {
          date: { $gte: today },
          isBooked: false,
        },
      };
    }

    // Filter by online consultation
    if (onlineConsult === "true") {
      query.isOnline = true;
    }

    // Filter by languages
    if (languages) {
      const langArray = languages.split(",");
      query.languages = { $in: langArray };
    }

    // Search by name or specialization
    let doctors;
    if (search) {
      doctors = await Doctor.find({
        ...query,
        $or: [
          { name: { $regex: search, $options: "i" } },
          { specialization: { $regex: search, $options: "i" } },
        ],
      })
        .select(
          "name specialization fee rating reviews distance gender languages isOnline availableSlots",
        )
        .limit(20);
    } else {
      doctors = await Doctor.find(query)
        .select(
          "name specialization fee rating reviews distance gender languages isOnline availableSlots",
        )
        .limit(20);
    }

    // Sort doctors
    if (sort === "toprated") {
      doctors.sort((a, b) => b.rating - a.rating);
    } else if (sort === "fee_low") {
      doctors.sort((a, b) => a.fee - b.fee);
    } else if (sort === "fee_high") {
      doctors.sort((a, b) => b.fee - a.fee);
    } else if (sort === "nearest") {
      doctors.sort((a, b) => a.distance - b.distance);
    }

    // Add next available slot
    const doctorsWithSlots = doctors.map((doc) => {
      const nextSlot =
        doc.availableSlots && doc.availableSlots.length > 0
          ? doc.availableSlots[0].time
          : "Tomorrow";

      return {
        ...doc.toObject(),
        nextSlot,
      };
    });

    logger.info("Nearby doctors fetched", {
      count: doctorsWithSlots.length,
      filters: { specialization, gender, minRating },
    });

    res.json({
      success: true,
      data: doctorsWithSlots,
      count: doctorsWithSlots.length,
    });
  } catch (error) {
    logger.error("Error fetching nearby doctors", { error: error.message });
    res.status(500).json({
      success: false,
      error: { code: "FETCH_ERROR", message: error.message },
    });
  }
};

// Get doctor by ID
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate("clinicIds");

    if (!doctor) {
      return res.status(404).json({
        success: false,
        error: { code: "NOT_FOUND", message: "Doctor not found" },
      });
    }

    res.json({ success: true, data: doctor });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: "FETCH_ERROR", message: error.message },
    });
  }
};

// Create doctor profile (for doctor registration)
exports.createDoctor = async (req, res) => {
  try {
    const {
      name,
      specialization,
      qualifications,
      experience,
      licensingNumber,
      fee,
      gender,
      languages,
    } = req.body;

    const doctor = new Doctor({
      userId: req.user.id,
      name,
      specialization,
      qualifications,
      experience,
      licensingNumber,
      fee,
      gender,
      languages,
    });

    await doctor.save();
    logger.info("Doctor profile created", { doctorId: doctor._id });

    res.status(201).json({ success: true, data: doctor });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: { code: "CREATE_ERROR", message: error.message },
    });
  }
};

// Update doctor profile
exports.updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        error: { code: "NOT_FOUND", message: "Doctor not found" },
      });
    }

    logger.info("Doctor profile updated", { doctorId: doctor._id });
    res.json({ success: true, data: doctor });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: { code: "UPDATE_ERROR", message: error.message },
    });
  }
};

// Set availability slots
exports.setAvailableSlots = async (req, res) => {
  try {
    const { date, time } = req.body;
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        error: { code: "NOT_FOUND", message: "Doctor not found" },
      });
    }

    doctor.availableSlots.push({ date: new Date(date), time, isBooked: false });
    await doctor.save();

    res.json({ success: true, data: doctor });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: { code: "ERROR", message: error.message },
    });
  }
};
