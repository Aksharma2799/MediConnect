const express = require("express");
const router = express.Router();
const {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
  getContactStats,
} = require("../controllers/contactController");
const { authenticate, authorize } = require("../middleware/auth");

/**
 * Public route - no authentication required
 * POST /api/v1/contacts - Create new contact
 */
router.post("/", createContact);

/**
 * Protected routes - admin only
 */
// Get all contacts
router.get("/", authenticate, authorize("admin"), getAllContacts);

// Get contact statistics
router.get("/stats/summary", authenticate, authorize("admin"), getContactStats);

// Get single contact
router.get("/:id", authenticate, getContactById);

// Update contact (admin, clinic_owner, doctor can respond)
router.put(
  "/:id",
  authenticate,
  authorize("admin", "clinic_owner", "doctor"),
  updateContact
);

// Delete contact (admin only)
router.delete("/:id", authenticate, authorize("admin"), deleteContact);

module.exports = router;
