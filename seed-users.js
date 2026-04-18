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
    specialty: 'Administration',
    bio: 'Oversees all STEM program operations and instructor placement across the five boroughs.',
  },
  {
    name: 'Jordan Lee',
    email: 'teacher@test.com',
    password: 'password123',
    role: 'instructor',
    isFingerprinted: true,
    hasInsurance: true,
    specialty: 'Robotics',
    bio: 'Experienced robotics educator with 5 years teaching LEGO Mindstorms and Arduino to K-8 students across Brooklyn and Queens.',
    skills: ['Robotics', 'Arduino', 'LEGO Mindstorms'],
    boroughs: ['Brooklyn', 'Queens'],
    availability: {
      monday: [{ start: 900, end: 1500 }],
      wednesday: [{ start: 900, end: 1500 }],
      friday: [{ start: 900, end: 1300 }],
    },
  },
  {
    name: 'Maya Patel',
    email: 'maya@test.com',
    password: 'password123',
    role: 'instructor',
    isFingerprinted: true,
    hasInsurance: true,
    specialty: 'Coding',
    bio: 'Full-stack developer turned educator. Teaches Scratch, Python, and web development to middle schoolers in the Bronx and Manhattan.',
    skills: ['Python', 'Scratch', 'Web Dev'],
    boroughs: ['Bronx', 'Manhattan'],
    availability: {
      tuesday: [{ start: 1000, end: 1600 }],
      thursday: [{ start: 1000, end: 1600 }],
    },
  },
  {
    name: 'Carlos Rivera',
    email: 'carlos@test.com',
    password: 'password123',
    role: 'instructor',
    isFingerprinted: true,
    hasInsurance: false,
    specialty: 'Engineering',
    bio: 'Civil engineer with a passion for hands-on STEM. Runs bridge-building and structures workshops for high school students in Staten Island.',
    skills: ['Engineering', 'Physics', 'Math'],
    boroughs: ['Staten Island'],
    availability: {
      monday: [{ start: 1300, end: 1700 }],
      friday: [{ start: 1300, end: 1700 }],
    },
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
    console.log(`✅ Created ${u.role}: ${u.email} (${u.specialty})`);
  }

  await mongoose.disconnect();
  console.log('Done.');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
