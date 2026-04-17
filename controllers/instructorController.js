const Assignment = require('../models/Assignment');

exports.getStats = async (req, res) => {
  try {
    const unstaffedJobs = await Assignment.find({ status: 'Open' });
    const totalRisk = unstaffedJobs.reduce((sum, job) => sum + (job.revenueValue || 0), 0);
    res.json({ unstaffedCount: unstaffedJobs.length, revenueAtRisk: totalRisk });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};