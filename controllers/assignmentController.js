/**
 * FILE: controllers/assignmentController.js
 * DESCRIPTION: Logic for fetching open jobs and claiming them.
 */

const Assignment = require('../models/Assignment');
const Instructor = require('../models/Instructor');

/**
 * @route   GET /api/assignments/open
 * @desc    Fetch all assignments with a status of 'Open'
 */
exports.getOpenJobs = async (req, res) => {
  try {
    const jobs = await Assignment.find({ status: 'Open' });
    res.json(jobs);
  } catch (err) {
    console.error('Error fetching open jobs:', err.message);
    res.status(500).json({ error: 'Server error while fetching jobs.' });
  }
};

/**
 * @route   PATCH /api/assignments/claim/:id
 * @desc    Allow a logged-in instructor to claim a specific job
 * @access  Private (Requires JWT via authMiddleware)
 */
exports.claimJob = async (req, res) => {
  try {
    // 1. Find the instructor in the database using the ID from the JWT token
    const instructor = await Instructor.findById(req.instructorId);
    
    if (!instructor) {
      return res.status(404).json({ msg: 'Instructor not found.' });
    }

    // 2. COMPLIANCE CHECK: Only fingerprinted instructors can claim jobs
    if (!instructor.isFingerprinted) {
      return res.status(403).json({ 
        msg: 'Compliance Block: You must be fingerprinted to claim assignments.' 
      });
    }

    // 3. UPDATE THE JOB: Change status to 'Staffed' and link to the instructor
    const job = await Assignment.findByIdAndUpdate(
      req.params.id,
      { 
        status: 'Staffed', 
        assignedInstructor: req.instructorId 
      },
      { new: true } // Returns the updated document
    );

    if (!job) {
      return res.status(404).json({ msg: 'Assignment not found.' });
    }

    res.json({
      msg: 'Assignment successfully claimed!',
      job
    });

  } catch (err) {
    console.error('Error claiming job:', err.message);
    res.status(500).json({ error: 'Server error during the claim process.' });
  }
};