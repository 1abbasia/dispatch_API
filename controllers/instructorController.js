const Assignment = require('../models/Assignment');
const Instructor = require('../models/Instructor');

exports.getStats = async (req, res) => {
  try {
    const [unstaffedJobs, activeInstructorCount] = await Promise.all([
      Assignment.find({ status: 'Open' }),
      Instructor.countDocuments({ isActive: true }),
    ]);
    const totalRisk = unstaffedJobs.reduce((sum, job) => sum + (job.revenueValue || 0), 0);
    res.json({ unstaffedCount: unstaffedJobs.length, revenueAtRisk: totalRisk, activeInstructorCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};