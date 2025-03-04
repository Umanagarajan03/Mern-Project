const express = require('express');
const Feedback = require('../models/FeedbackForm'); // Ensure the correct model path
const nodemailer = require('nodemailer');
require('dotenv').config();

const router = express.Router();

// Email Configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Route to submit feedback
router.post('/submit', async (req, res) => {
  const { rating, feedback } = req.body;

  const newFeedback = new Feedback({ rating, feedback });

  try {
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });

    // Send email notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'contactqualidash@gmail.com',
      subject: 'New Feedback Received',
      text: `Rating: ${rating}\nFeedback: ${feedback}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting feedback' });
  }
});

module.exports = router;
