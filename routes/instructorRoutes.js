const express = require('express');
const router = express.Router();
const Instructor = require('../models/Instructor');
const Assignment = require('../models/Assignment');

// STORY: "The Morning Audit"
// Get total revenue at risk and unstaffed job count
router.get('/stats', async (req, res) => {
  try {
    const unstaffedJobs = await Assignment.find({ status: 'Open' });
    
    const totalRisk = unstaffedJobs.reduce((sum, job) => sum + job.revenueValue, 0);
    
    res.json({
      revenueAtRisk: totalRisk,
      unstaffedCount: unstaffedJobs.length
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// STORY: "Browse Talent"
// Get all instructors
router.get('/instructors', async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.json(instructors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/instructors/search', async (req, res) => {
    try {
      const { borough, day, skill } = req.query;
  
      const query = {
        isActive: true,
        boroughs: borough, // Mongoose is smart enough to check if borough is in the array
        skills: skill,
        // This checks if they have any availability on that specific day
        [`availability.${day.toLowerCase()}`]: { $exists: true, $not: { $size: 0 } }
      };
  
      const matches = await Instructor.find(query);
      res.json(matches);
    } catch (err) {
      res.status(500).json({ message: "Search failed", error: err.message });
    }
  });

module.exports = router;