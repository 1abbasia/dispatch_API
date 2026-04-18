require('dotenv').config();
const mongoose = require('mongoose');
const Instructor = require('./models/Instructor');

const users = [
  {
    name: 'Admin User',
    email: 'admin@test.com',
    password: 'admin123',
    role: 'admin',
    isFingerprinted: true,
    hasInsurance: true,
  },
  {
    name: 'Teacher User',
    email: 'teacher@test.com',
    password: 'password123',
    role: 'instructor',
    isFingerprinted: true,
    hasInsurance: true,
  },
];

async function seed() {
  await mongoose.connect(process.env.MongoURI);
  console.log('✅ Connected to MongoDB');

  for (const u of users) {
    const existing = await Instructor.findOne({ email: u.email });
    if (existing) {
      await Instructor.deleteOne({ email: u.email });
      console.log(`🗑  Removed existing: ${u.email}`);
    }
    const doc = new Instructor(u);
    await doc.save();
    console.log(`✅ Created ${u.role}: ${u.email}`);
  }

  await mongoose.disconnect();
  console.log('Done. Users seeded successfully.');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
