const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const { logger } = require("../utils/logger");

// Create appointment
exports.createAppointment = async (req, res) => {
  try {
    const { doctorId, type, date, time, notes } = req.body;

    // Get doctor fee
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        error: { code: "NOT_FOUND", message: "Doctor not found" },
      });
    }

    const appointment = new Appointment({
      patientId: req.user.id,
      doctorId,
      type,
      date: new Date(date),
      time,
      notes,
      fee: doctor.fee,
      status: "pending",
    });

    await appointment.save();

    logger.info("Appointment created", { appointmentId: appointment._id });

    res.status(201).json({
      success: true,
      data: appointment,
      message: "Appointment request sent to doctor",
    });
  } catch (error) {
    logger.error("Error creating appointment", { error: error.message });
    res.status(400).json({
      success: false,
      error: { code: "CREATE_ERROR", message: error.message },
    });
  }
};

// Get patient's appointments
exports.getMyAppointments = async (req, res) => {
  try {
    const { status } = req.query;
    let query = { patientId: req.user.id };

    if (status) {
      query.status = status;
    }

    const appointments = await Appointment.find(query)
      .populate("doctorId", "name specialization fee")
      .sort({ date: -1 });

    // Format for frontend
    const formatted = appointments.map((apt) => ({
      _id: apt._id,
      doctorName: apt.doctorId?.name || "Unknown Doctor",
      specialization: apt.doctorId?.specialization || "N/A",
      date: apt.date.toLocaleDateString(),
      time: apt.time,
      type: apt.type,
      fee: apt.fee,
      status: apt.status,
    }));

    res.json({ success: true, data: formatted });
  } catch (error) {
    logger.error("Error fetching appointments", { error: error.message });
    res.status(500).json({
      success: false,
      error: { code: "FETCH_ERROR", message: error.message },
    });
  }
};

// Get appointment by ID
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("patientId", "name email phone")
      .populate("doctorId", "name specialization fee");

    if (!appointment) {
      return res.status(404).json({
        success: false,
        error: { code: "NOT_FOUND", message: "Appointment not found" },
      });
    }

    res.json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: "FETCH_ERROR", message: error.message },
    });
  }
};

// Update appointment status (for doctors)
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status, reasonForCancellation } = req.body;

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        error: { code: "NOT_FOUND", message: "Appointment not found" },
      });
    }

    appointment.status = status;
    if (status === "cancelled") {
      appointment.cancelledAt = new Date();
      appointment.reasonForCancellation = reasonForCancellation;
    }

    await appointment.save();

    logger.info("Appointment updated", {
      appointmentId: appointment._id,
      status,
    });

    res.json({ success: true, data: appointment });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: { code: "UPDATE_ERROR", message: error.message },
    });
  }
};

// Reschedule appointment
exports.rescheduleAppointment = async (req, res) => {
  try {
    const { newDate, newTime } = req.body;

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        error: { code: "NOT_FOUND", message: "Appointment not found" },
      });
    }

    appointment.date = new Date(newDate);
    appointment.time = newTime;
    await appointment.save();

    res.json({
      success: true,
      data: appointment,
      message: "Appointment rescheduled successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: { code: "UPDATE_ERROR", message: error.message },
    });
  }
};

// Cancel appointment
exports.cancelAppointment = async (req, res) => {
  try {
    const { reasonForCancellation } = req.body;

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        error: { code: "NOT_FOUND", message: "Appointment not found" },
      });
    }

    appointment.status = "cancelled";
    appointment.cancelledAt = new Date();
    appointment.reasonForCancellation = reasonForCancellation;
    await appointment.save();

    res.json({
      success: true,
      data: appointment,
      message: "Appointment cancelled successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: { code: "CANCEL_ERROR", message: error.message },
    });
  }
};
