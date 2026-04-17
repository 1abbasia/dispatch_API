const Instructor = require('../models/Instructor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let instructor = await Instructor.findOne({ email });
    if (instructor) return res.status(400).json({ msg: 'User already exists' });

    instructor = new Instructor({ name, email, password });
    await instructor.save();

    const token = jwt.sign({ id: instructor._id }, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const instructor = await Instructor.findOne({ email });
    if (!instructor) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, instructor.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: instructor._id }, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};