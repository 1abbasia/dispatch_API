const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const InstructorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  skills: [String],
  boroughs: [String],
  isFingerprinted: { type: Boolean, default: false },
  hasInsurance: { type: Boolean, default: false },
  availability: {
    monday: [{ start: Number, end: Number }],
    tuesday: [{ start: Number, end: Number }],
    wednesday: [{ start: Number, end: Number }],
    thursday: [{ start: Number, end: Number }],
    friday: [{ start: Number, end: Number }],
    saturday: [{ start: Number, end: Number }],
    sunday: [{ start: Number, end: Number }]
  },
  isActive: { type: Boolean, default: true }
});

InstructorSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('Instructor', InstructorSchema);