const mongoose = require("mongoose");
require("dotenv").config();

const Doctor = require("../src/models/Doctor");
const Pharmacy = require("../src/models/Pharmacy");

const sampleDoctors = [
  {
    name: "Dr. Rajesh Kumar",
    specialization: "cardiology",
    qualifications: ["MBBS", "MD Cardiology"],
    experience: 15,
    licensingNumber: "MED2015001",
    fee: 500,
    rating: 4.8,
    reviews: 342,
    gender: "male",
    languages: ["English", "Hindi", "Tamil"],
    isOnline: true,
    distance: 2.5,
    active: true,
  },
  {
    name: "Dr. Priya Singh",
    specialization: "dermatology",
    qualifications: ["MBBS", "MD Dermatology"],
    experience: 10,
    licensingNumber: "MED2016002",
    fee: 400,
    rating: 4.6,
    reviews: 289,
    gender: "female",
    languages: ["English", "Hindi"],
    isOnline: true,
    distance: 3.2,
    active: true,
  },
  {
    name: "Dr. Amit Patel",
    specialization: "orthopedics",
    qualifications: ["MBBS", "MS Orthopedics"],
    experience: 12,
    licensingNumber: "MED2017003",
    fee: 600,
    rating: 4.7,
    reviews: 215,
    gender: "male",
    languages: ["English", "Hindi", "Tamil", "Telugu"],
    isOnline: false,
    distance: 4.1,
    active: true,
  },
  {
    name: "Dr. Neha Gupta",
    specialization: "pediatrics",
    qualifications: ["MBBS", "MD Pediatrics"],
    experience: 8,
    licensingNumber: "MED2018004",
    fee: 350,
    rating: 4.9,
    reviews: 456,
    gender: "female",
    languages: ["English", "Hindi"],
    isOnline: true,
    distance: 1.8,
    active: true,
  },
  {
    name: "Dr. Vikram Desai",
    specialization: "general_medicine",
    qualifications: ["MBBS"],
    experience: 20,
    licensingNumber: "MED2014005",
    fee: 300,
    rating: 4.5,
    reviews: 512,
    gender: "male",
    languages: ["English", "Hindi", "Marathi"],
    isOnline: true,
    distance: 5.3,
    active: true,
  },
  {
    name: "Dr. Anjali Sharma",
    specialization: "psychiatry",
    qualifications: ["MBBS", "MD Psychiatry"],
    experience: 11,
    licensingNumber: "MED2016006",
    fee: 450,
    rating: 4.4,
    reviews: 178,
    gender: "female",
    languages: ["English", "Hindi", "Tamil"],
    isOnline: true,
    distance: 6.2,
    active: true,
  },
  {
    name: "Dr. Suresh Iyer",
    specialization: "neurology",
    qualifications: ["MBBS", "MD Neurology"],
    experience: 16,
    licensingNumber: "MED2015007",
    fee: 700,
    rating: 4.7,
    reviews: 234,
    gender: "male",
    languages: ["English", "Tamil", "Telugu"],
    isOnline: true,
    distance: 7.5,
    active: true,
  },
  {
    name: "Dr. Meera Nair",
    specialization: "dentistry",
    qualifications: ["BDS", "MDS Prosthodontics"],
    experience: 9,
    licensingNumber: "DENT2017008",
    fee: 400,
    rating: 4.6,
    reviews: 267,
    gender: "female",
    languages: ["English", "Hindi", "Tamil"],
    isOnline: false,
    distance: 2.9,
    active: true,
  },
];

const samplePharmacies = [
  {
    name: "MediCare Pharmacy",
    email: "care@medicarepharm.com",
    phone: "+91-98765-43210",
    address: "123 Main Street, Medical Complex",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560001",
    distance: 1.2,
    open: true,
    rating: 4.7,
    reviews: 234,
    active: true,
  },
  {
    name: "HealthPlus Pharmacy",
    email: "info@healthplus.com",
    phone: "+91-98765-43211",
    address: "456 Park Avenue, Near Hospital",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560002",
    distance: 2.5,
    open: true,
    rating: 4.5,
    reviews: 189,
    active: true,
  },
  {
    name: "Apollo Pharmacy",
    email: "apollo@pharmacy.com",
    phone: "+91-98765-43212",
    address: "789 Health Street, Downtown",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560003",
    distance: 3.8,
    open: false,
    rating: 4.8,
    reviews: 312,
    active: true,
  },
];

const seedDatabase = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/mediconnect");
    console.log("✓ Connected to MongoDB");

    // Clear existing data
    console.log("\nClearing existing data...");
    await Doctor.deleteMany({});
    await Pharmacy.deleteMany({});
    console.log("✓ Data cleared");

    // Create dummy userId for seeding
    const dummyUserId = new mongoose.Types.ObjectId();

    // Add userId to all doctors
    const doctorsWithUserId = sampleDoctors.map(doc => ({
      ...doc,
      userId: dummyUserId,
    }));

    // Seed doctors
    console.log("\nSeeding doctors...");
    const doctors = await Doctor.insertMany(doctorsWithUserId);
    console.log(`✓ ${doctors.length} doctors added`);

    // Add userId to all pharmacies
    const pharmaciesWithUserId = samplePharmacies.map(pharm => ({
      ...pharm,
      userId: dummyUserId,
    }));

    // Seed pharmacies
    console.log("\nSeeding pharmacies...");
    const pharmacies = await Pharmacy.insertMany(pharmaciesWithUserId);
    console.log(`✓ ${pharmacies.length} pharmacies added`);

    console.log("\n✅ Seed data successfully added to database!");
    console.log(`
    Summary:
    - Doctors: ${doctors.length}
    - Pharmacies: ${pharmacies.length}
    `);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
    process.exit(1);
  }
};

seedDatabase();
