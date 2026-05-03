const mongoose = require("mongoose");

const healthRecordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bloodPressure: String,
    bloodSugar: Number,
    weight: Number,
    height: Number,
    temperature: Number,
    heartRate: Number,
    allergies: [String],
    chronicConditions: [String],
    activeMedicines: Number,
    lastCheckupDate: Date,
    notes: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("HealthRecord", healthRecordSchema);
