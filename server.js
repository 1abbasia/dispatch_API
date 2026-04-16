require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const Instructor = require('./models/Instructor');
const instructorRoutes = require('./routes/instructorRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');


const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Allows us to parse JSON data
app.use('/api', instructorRoutes);
app.use('/api', assignmentRoutes);
// Connect to MongoDB
mongoose.connect(process.env.MongoURI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

  const PORT = process.env.PORT || 3000;

  // We add '0.0.0.0' to tell it to listen to EVERYTHING on this machine
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 API IS LIVE: http://127.0.0.1:${PORT}/api/stats`);
  });