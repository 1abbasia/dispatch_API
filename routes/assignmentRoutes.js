const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');

/**
 * @route   GET /api/assignments/open
 * @desc    Get all jobs that haven't been claimed yet (The Job Board)
 */
router.get('/open', async (req, res) => {
  try {
    const openJobs = await Assignment.find({ status: 'Open' });
    res.json(openJobs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching job board" });
  }
});

/**
 * @route   PATCH /api/assignments/claim/:id
 * @desc    Instructor claims a specific job
 */
router.patch('/claim/:id', async (req, res) => {
  try {
    const { instructorId } = req.body; // The frontend will send the ID of the logged-in teacher

    const updatedJob = await Assignment.findByIdAndUpdate(
      req.params.id, 
      { 
        status: 'Staffed', 
        assignedInstructor: instructorId 
      },
      { new: true } // Return the updated document
    );

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({ message: "Job claimed successfully!", job: updatedJob });
  } catch (err) {
    res.status(500).json({ message: "Claim failed", error: err.message });
  }
});

module.exports = router;