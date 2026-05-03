const router = require("express").Router();
const appointmentController = require("../controllers/appointmentController");
const { authenticate } = require("../middleware/auth");

// All appointment routes require authentication
router.post("/", authenticate, appointmentController.createAppointment);
router.get(
  "/my-appointments",
  authenticate,
  appointmentController.getMyAppointments,
);
router.get("/:id", authenticate, appointmentController.getAppointmentById);
router.put("/:id", authenticate, appointmentController.updateAppointmentStatus);
router.post(
  "/:id/reschedule",
  authenticate,
  appointmentController.rescheduleAppointment,
);
router.post(
  "/:id/cancel",
  authenticate,
  appointmentController.cancelAppointment,
);

module.exports = router;
