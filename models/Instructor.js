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
  isActive: { type: Boolean, default: true },
  role: { type: String, enum: ['instructor', 'admin'], default: 'instructor' },
  specialty: { type: String, default: '' },
  bio: { type: String, default: '' }
});

InstructorSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('Instructor', InstructorSchema);