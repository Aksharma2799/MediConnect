const router = require("express").Router();
const doctorController = require("../controllers/doctorController");
const { authenticate, authorize } = require("../middleware/auth");

// Public routes
router.get("/nearby", doctorController.getNearbyDoctors);
router.get("/:id", doctorController.getDoctorById);

// Protected routes
router.post("/", authenticate, doctorController.createDoctor);
router.put(
  "/:id",
  authenticate,
  authorize("doctor"),
  doctorController.updateDoctor,
);
router.post(
  "/:id/slots",
  authenticate,
  authorize("doctor"),
  doctorController.setAvailableSlots,
);

module.exports = router;
