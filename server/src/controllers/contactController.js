const Contact = require('../models/Contact');
const emailService = require('../services/emailService');
const { catchAsync, AppError, successResponse } = require('../utils/helpers');

const submitContact = catchAsync(async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    throw AppError('Name, email, and message are required', 400);
  }

  const contact = await Contact.create({ name, email, message });

  if (process.env.CONTACT_EMAIL) {
    emailService.sendContactEmail({ name, email, message });
  }

  successResponse(res, { message: 'Message sent successfully', contact }, 201);
});

module.exports = { submitContact };
