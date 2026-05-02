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
const { verifyToken, authorize } = require("../middleware/auth");

/**
 * Public route - no authentication required
 * POST /api/v1/contacts - Create new contact
 */
router.post("/", createContact);

/**
 * Protected routes - admin only
 */
// Get all contacts
router.get("/", authorize("admin"), getAllContacts);

// Get contact statistics
router.get("/stats/summary", authorize("admin"), getContactStats);

// Get single contact
router.get("/:id", verifyToken, getContactById);

// Update contact (admin, clinic_owner, doctor can respond)
router.put(
  "/:id",
  verifyToken,
  authorize("admin", "clinic_owner", "doctor"),
  updateContact,
);

// Delete contact (admin only)
router.delete("/:id", verifyToken, authorize("admin"), deleteContact);

module.exports = router;
