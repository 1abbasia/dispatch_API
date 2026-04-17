const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

// Destructure the functions directly from the controller
const { getOpenJobs, claimJob } = require('../controllers/assignmentController');

// @route   GET /api/assignments/open
router.get('/open', getOpenJobs);

// @route   PATCH /api/assignments/claim/:id
router.patch('/claim/:id', auth, claimJob);

module.exports = router;