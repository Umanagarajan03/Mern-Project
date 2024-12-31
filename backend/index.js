require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const signInRoutes = require('./routes/SignIn');
const feedbackRoutes = require('./routes/FeedbackForm'); // Correctly reference Feedback.js
const contactRoutes = require('./routes/Contact'); // Reference Contact.js

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Routes
app.use('/api/auth', signInRoutes);
app.use('/api/feedback', feedbackRoutes); // Use Feedback routes
app.use('/api', contactRoutes); // Use Contact routes

// Default Route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
