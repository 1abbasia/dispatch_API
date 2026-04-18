const express = require('express');
const router = express.Router();
const instructorController = require('../controllers/instructorController');

router.get('/', instructorController.getAllInstructors);
router.get('/stats', instructorController.getStats);

module.exports = router;