const mongoose = require('mongoose');

const InstructorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  skills: [String],
  boroughs: [String],
  isFingerprinted: { type: Boolean, default: false },
  hasInsurance: { type: Boolean, default: false },
  availability: {
    monday:    [{ start: Number, end: Number }],
    tuesday:   [{ start: Number, end: Number }],
    wednesday: [{ start: Number, end: Number }],
    thursday:  [{ start: Number, end: Number }],
    friday:    [{ start: Number, end: Number }],
    saturday:  [{ start: Number, end: Number }],
    sunday:    [{ start: Number, end: Number }]
  },
  isActive: { type: Boolean, default: true }
});

// CRITICAL: Export the MODEL, not the SCHEMA
module.exports = mongoose.model('Instructor', InstructorSchema);