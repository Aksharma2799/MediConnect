const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      enum: [
        "cardiology",
        "neurology",
        "orthopedics",
        "pediatrics",
        "gynecology",
        "dermatology",
        "dentistry",
        "psychiatry",
        "general_medicine",
      ],
      required: true,
    },
    qualifications: [String],
    experience: Number,
    licensingNumber: String,
    bio: String,
    image: String,
    fee: {
      type: Number,
      default: 500,
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    languages: [String],
    isOnline: {
      type: Boolean,
      default: true,
    },
    availableSlots: [
      {
        date: Date,
        time: String,
        isBooked: { type: Boolean, default: false },
      },
    ],
    clinicIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clinic",
      },
    ],
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        default: [77.5, 12.9],
      },
    },
    distance: {
      type: Number,
      default: 5,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

doctorSchema.index({ location: "2dsphere" });
doctorSchema.index({ specialization: 1 });
doctorSchema.index({ rating: -1 });

module.exports = mongoose.model("Doctor", doctorSchema);
