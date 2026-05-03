const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    type: {
      type: String,
      enum: ["online", "in_clinic", "home_visit"],
      default: "in_clinic",
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "rejected", "completed", "cancelled"],
      default: "pending",
    },
    fee: Number,
    notes: String,
    prescriptions: [
      {
        medicineName: String,
        dosage: String,
        duration: String,
        instructions: String,
      },
    ],
    reasonForCancellation: String,
    completedAt: Date,
    cancelledAt: Date,
  },
  { timestamps: true },
);

appointmentSchema.index({ patientId: 1, status: 1 });
appointmentSchema.index({ doctorId: 1, date: 1 });

module.exports = mongoose.model("Appointment", appointmentSchema);
