const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
  schoolName: { type: String, required: true },
  borough: { type: String, required: true },
  dayOfWeek: { type: String, required: true },
  startTime: { type: Number, required: true },
  endTime: { type: Number, required: true },
  revenueValue: { type: Number, default: 0 },
  status: { type: String, default: 'Open' },
  assignedInstructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor', default: null }
});

module.exports = mongoose.model('Assignment', AssignmentSchema);