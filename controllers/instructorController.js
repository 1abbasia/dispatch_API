const Assignment = require('../models/Assignment');
const Instructor = require('../models/Instructor');

exports.getAllInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find({ isActive: true })
      .select('name email specialty bio skills boroughs availability isFingerprinted hasInsurance')
      .lean();
    res.json(instructors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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