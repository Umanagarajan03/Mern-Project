const express = require('express');
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');

const router = express.Router();

// Email Configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Contact Form Route
router.post('/contact', async (req, res) => {
  const { name, email, mobile, message } = req.body;

  const newContact = new Contact({
    name,
    email,
    mobile,
    message,
  });

  try {
    await newContact.save();

    // Send email notification
    const mailOptions = {
      from: process.env.EMAIL_USER, // Company's email address
      to: process.env.EMAIL_USER, // Company's email address from environment variables
      replyTo: email, // User's email address from input box
      subject: 'New Contact Form Submission',
      text: `You have a new contact form submission:\n\nName: ${name}\nEmail: ${email}\nMobile: ${mobile}\nMessage: ${message}` // Use backticks for template literals
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error occurred: ', error.message);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
