const Contact = require("../models/Contact");
const User = require("../models/User");
const { logger } = require("../utils/logger");
const nodemailer = require("nodemailer");

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: process.env.SMTP_PORT || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER || "your-email@gmail.com",
    pass: process.env.SMTP_PASSWORD || "your-app-password",
  },
});

/**
 * Create a new contact submission
 * POST /api/v1/contacts
 */
exports.createContact = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message, contactType } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Name, email, subject, and message are required",
        },
      });
    }

    // Create contact record
    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
      contactType,
    });

    logger.info(`New contact submission from ${email}`, {
      contactId: contact._id,
      contactType,
    });

    // Send auto-reply email asynchronously
    sendAutoReplyEmail(contact).catch((err) => {
      logger.error("Failed to send auto-reply email", { error: err.message });
    });

    // Send notifications to admins, doctors, clinics asynchronously
    notifyStakeholders(contact).catch((err) => {
      logger.error("Failed to send stakeholder notifications", {
        error: err.message,
      });
    });

    res.status(201).json({
      success: true,
      data: {
        contactId: contact._id,
        message: "Your message has been received. We'll get back to you soon.",
      },
    });
  } catch (error) {
    logger.error("Error creating contact", { error: error.message });
    next(error);
  }
};

/**
 * Get all contacts (Admin only)
 * GET /api/v1/contacts
 */
exports.getAllContacts = async (req, res, next) => {
  try {
    const { status, contactType, page = 1, limit = 10 } = req.query;

    let filter = {};
    if (status) filter.status = status;
    if (contactType) filter.contactType = contactType;

    const skip = (page - 1) * limit;

    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate("assignedTo", "name email")
      .populate("respondedBy", "name email");

    const total = await Contact.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: {
        contacts,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    logger.error("Error fetching contacts", { error: error.message });
    next(error);
  }
};

/**
 * Get single contact by ID
 * GET /api/v1/contacts/:id
 */
exports.getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id)
      .populate("assignedTo", "name email")
      .populate("respondedBy", "name email");

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: {
          code: "NOT_FOUND",
          message: "Contact not found",
        },
      });
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    logger.error("Error fetching contact", { error: error.message });
    next(error);
  }
};

/**
 * Update contact status and assign
 * PUT /api/v1/contacts/:id
 */
exports.updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, assignedTo, response } = req.body;

    let updateData = {};
    if (status) updateData.status = status;
    if (assignedTo) updateData.assignedTo = assignedTo;

    if (response) {
      updateData.response = response;
      updateData.respondedAt = new Date();
      updateData.respondedBy = req.user._id;
      updateData.status = "resolved";
    }

    const contact = await Contact.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: {
          code: "NOT_FOUND",
          message: "Contact not found",
        },
      });
    }

    // Send response email if response provided
    if (response) {
      sendResponseEmail(contact).catch((err) => {
        logger.error("Failed to send response email", { error: err.message });
      });
    }

    logger.info(`Contact ${id} updated`, { status, assignedTo });

    res.status(200).json({
      success: true,
      data: contact,
      message: "Contact updated successfully",
    });
  } catch (error) {
    logger.error("Error updating contact", { error: error.message });
    next(error);
  }
};

/**
 * Delete contact
 * DELETE /api/v1/contacts/:id
 */
exports.deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: {
          code: "NOT_FOUND",
          message: "Contact not found",
        },
      });
    }

    logger.info(`Contact ${id} deleted`);

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    logger.error("Error deleting contact", { error: error.message });
    next(error);
  }
};

/**
 * Get contact statistics
 * GET /api/v1/contacts/stats/summary
 */
exports.getContactStats = async (req, res, next) => {
  try {
    const totalContacts = await Contact.countDocuments();
    const pendingContacts = await Contact.countDocuments({ status: "pending" });
    const resolvedContacts = await Contact.countDocuments({
      status: "resolved",
    });
    const complaints = await Contact.countDocuments({
      contactType: "complaint",
    });

    const stats = {
      totalContacts,
      pendingContacts,
      resolvedContacts,
      inProgressContacts: await Contact.countDocuments({
        status: "in_progress",
      }),
      complaints,
      suggestions: await Contact.countDocuments({
        contactType: "suggestion",
      }),
      generalInquiries: await Contact.countDocuments({
        contactType: "general",
      }),
      appointmentIssues: await Contact.countDocuments({
        contactType: "appointment",
      }),
    };

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    logger.error("Error fetching contact stats", { error: error.message });
    next(error);
  }
};

/**
 * Helper function to send auto-reply email
 */
async function sendAutoReplyEmail(contact) {
  try {
    const emailContent = `
      <h2>Thank you for contacting MediConnect</h2>
      <p>Hi ${contact.name},</p>
      <p>We have received your ${contact.contactType} regarding "${contact.subject}".</p>
      <p>Our team will review your message and get back to you within 24 hours.</p>
      <p><strong>Reference ID:</strong> ${contact._id}</p>
      <hr />
      <p><strong>Your Message:</strong></p>
      <p>${contact.message}</p>
      <hr />
      <p>Best regards,<br/>MediConnect Support Team</p>
    `;

    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL || "noreply@mediconnect.com",
      to: contact.email,
      subject: `Auto-Reply: We received your ${contact.contactType} - Reference ID: ${contact._id}`,
      html: emailContent,
    };

    await transporter.sendMail(mailOptions);

    // Update contact with auto-reply tracking
    contact.autoReplyEmail = contact.email;
    contact.autoReplySentAt = new Date();
    await contact.save();

    logger.info(`Auto-reply sent to ${contact.email}`, {
      contactId: contact._id,
    });
  } catch (error) {
    logger.error("Failed to send auto-reply", { error: error.message });
    throw error;
  }
}

/**
 * Helper function to notify stakeholders
 */
async function notifyStakeholders(contact) {
  try {
    const admins = await User.find({ role: "admin" }).select("email");
    const doctors = await User.find({ role: "doctor" }).select("email");
    const clinics = await User.find({ role: "clinic_owner" }).select("email");

    const recipients = [
      ...admins.map((u) => u.email),
      ...doctors.map((u) => u.email),
      ...clinics.map((u) => u.email),
    ];

    if (recipients.length === 0) {
      logger.warn("No stakeholders found for notification");
      return;
    }

    const notificationContent = `
      <h2>New Contact Submission - ${contact.contactType}</h2>
      <p><strong>From:</strong> ${contact.name} (${contact.email})</p>
      <p><strong>Phone:</strong> ${contact.phone || "N/A"}</p>
      <p><strong>Subject:</strong> ${contact.subject}</p>
      <p><strong>Type:</strong> ${contact.contactType}</p>
      <p><strong>Reference ID:</strong> ${contact._id}</p>
      <hr />
      <p><strong>Message:</strong></p>
      <p>${contact.message}</p>
      <hr />
      <p>Please log in to the admin panel to respond to this contact.</p>
    `;

    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL || "noreply@mediconnect.com",
      bcc: recipients.join(", "),
      subject: `[${contact.contactType.toUpperCase()}] New Contact: ${contact.subject}`,
      html: notificationContent,
    };

    await transporter.sendMail(mailOptions);

    // Update notification tracking
    contact.notificationsSent.admin = true;
    contact.notificationsSent.clinic = true;
    contact.notificationsSent.doctor = true;
    await contact.save();

    logger.info(`Notifications sent to ${recipients.length} stakeholders`, {
      contactId: contact._id,
    });
  } catch (error) {
    logger.error("Failed to notify stakeholders", { error: error.message });
    throw error;
  }
}

/**
 * Helper function to send response email
 */
async function sendResponseEmail(contact) {
  try {
    const emailContent = `
      <h2>Response to Your Contact</h2>
      <p>Hi ${contact.name},</p>
      <p>Thank you for your ${contact.contactType}. Here is our response:</p>
      <hr />
      <p>${contact.response}</p>
      <hr />
      <p><strong>Reference ID:</strong> ${contact._id}</p>
      <p>If you have any further questions, please don't hesitate to contact us.</p>
      <p>Best regards,<br/>MediConnect Support Team</p>
    `;

    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL || "noreply@mediconnect.com",
      to: contact.email,
      subject: `Response to Your Contact - Reference ID: ${contact._id}`,
      html: emailContent,
    };

    await transporter.sendMail(mailOptions);

    logger.info(`Response email sent to ${contact.email}`, {
      contactId: contact._id,
    });
  } catch (error) {
    logger.error("Failed to send response email", { error: error.message });
    throw error;
  }
};
