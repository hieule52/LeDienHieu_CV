/**
 * Contact Controller
 * Handles contact form submission with validation
 */

const { validationResult } = require('express-validator');

const contactController = {
  /**
   * POST /api/contact
   * Process contact form submission
   */
  send: async (req, res) => {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          success: false,
          message: 'Please fix the errors below.',
          errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
        });
      }

      const { name, email, subject, message } = req.body;

      // Log the contact submission (in production, send an email here)
      console.log('[Contact Form] New submission:', {
        name,
        email,
        subject,
        timestamp: new Date().toISOString(),
      });

      // TODO: Integrate email service (e.g., Nodemailer + Gmail / Resend / SendGrid)
      // For now, we acknowledge receipt without sending email
      return res.status(200).json({
        success: true,
        message:
          "Thank you for reaching out! I'll get back to you as soon as possible.",
      });
    } catch (err) {
      console.error('[Contact] Error:', err);
      return res.status(500).json({
        success: false,
        message: 'Something went wrong. Please try again later.',
      });
    }
  },
};

module.exports = contactController;
