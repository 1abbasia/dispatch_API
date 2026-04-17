const express = require('express');
const router = express.Router(); // Ensure this is express.Router()
const assignmentController = require('../controllers/assignmentController');
const auth = require('../middleware/authMiddleware');

// @route   GET /api/assignments/open
router.get('/open', assignmentController.getOpenJobs);

// @route   PATCH /api/assignments/claim/:id
router.patch('/claim/:id', auth, assignmentController.claimJob);

module.exports = router;