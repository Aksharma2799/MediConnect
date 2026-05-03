const router = require("express").Router();
const pharmacyController = require("../controllers/pharmacyController");
const { authenticate, authorize } = require("../middleware/auth");

// Public routes
router.get("/nearby", pharmacyController.getNearbyPharmacies);
router.get("/:id", pharmacyController.getPharmacyById);

// Protected routes
router.post("/", authenticate, pharmacyController.createPharmacy);
router.put(
  "/:id",
  authenticate,
  authorize("pharmacist"),
  pharmacyController.updatePharmacy,
);

module.exports = router;
