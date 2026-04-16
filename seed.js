require('dotenv').config();
const mongoose = require('mongoose');
const Instructor = require('./models/Instructor');
const Assignment = require('./models/Assignment');

const instructors = [
  {
    name: "Alex Rivers",
    email: "alex@stemkids.com",
    skills: ["Robotics", "Python"],
    boroughs: ["Brooklyn", "Manhattan"],
    isFingerprinted: true,
    hasInsurance: true,
    availability: {
      monday: [{ start: 900, end: 1200 }, { start: 1400, end: 1700 }],
      tuesday: [{ start: 900, end: 1700 }]
    }
  },
  {
    name: "Sam Chen",
    email: "sam@stemkids.com",
    skills: ["Chess", "Math"],
    boroughs: ["Queens", "Brooklyn"],
    isFingerprinted: true,
    hasInsurance: false,
    availability: {
      wednesday: [{ start: 1300, end: 1800 }],
      friday: [{ start: 900, end: 1500 }]
    }
  },
  {
    name: "Jordan Smith",
    email: "jordan@stemkids.com",
    skills: ["Python", "Web Development"],
    boroughs: ["The Bronx", "Manhattan"],
    isFingerprinted: false,
    hasInsurance: true,
    availability: {
      monday: [{ start: 1000, end: 1600 }],
      thursday: [{ start: 1000, end: 1600 }]
    }
  },
  {
    name: "Taylor Vance",
    email: "taylor@stemkids.com",
    skills: ["Robotics", "Math"],
    boroughs: ["Brooklyn", "Queens"],
    isFingerprinted: true,
    hasInsurance: true,
    availability: {
      tuesday: [{ start: 900, end: 1500 }],
      thursday: [{ start: 900, end: 1500 }]
    }
  },
  {
    name: "Morgan Lee",
    email: "morgan@stemkids.com",
    skills: ["Chess", "Web Development"],
    boroughs: ["Manhattan", "The Bronx"],
    isFingerprinted: true,
    hasInsurance: true,
    availability: {
      monday: [{ start: 1200, end: 1800 }],
      wednesday: [{ start: 1200, end: 1800 }]
    }
  },
  {
    name: "Casey Zhang",
    email: "casey@stemkids.com",
    skills: ["Python", "Robotics"],
    boroughs: ["Staten Island", "Brooklyn"],
    isFingerprinted: false,
    hasInsurance: false,
    availability: {
      friday: [{ start: 900, end: 1700 }],
      saturday: [{ start: 1000, end: 1400 }]
    }
  },
  {
    name: "Riley Cooper",
    email: "riley@stemkids.com",
    skills: ["Math", "Chess"],
    boroughs: ["Queens", "Manhattan"],
    isFingerprinted: true,
    hasInsurance: true,
    availability: {
      tuesday: [{ start: 1400, end: 1800 }],
      thursday: [{ start: 1400, end: 1800 }]
    }
  },
  {
    name: "Jamie Lopez",
    email: "jamie@stemkids.com",
    skills: ["Web Development", "Python"],
    boroughs: ["The Bronx", "Queens"],
    isFingerprinted: true,
    hasInsurance: true,
    availability: {
      monday: [{ start: 800, end: 1200 }],
      wednesday: [{ start: 800, end: 1200 }]
    }
  },
  {
    name: "Skyler Bell",
    email: "skyler@stemkids.com",
    skills: ["Robotics"],
    boroughs: ["Brooklyn", "Manhattan", "Queens"],
    isFingerprinted: true,
    hasInsurance: false,
    availability: {
      friday: [{ start: 1300, end: 1800 }]
    }
  },
  {
    name: "Quinn Moore",
    email: "quinn@stemkids.com",
    skills: ["Math", "Python"],
    boroughs: ["Manhattan"],
    isFingerprinted: false,
    hasInsurance: true,
    availability: {
      tuesday: [{ start: 900, end: 1200 }],
      friday: [{ start: 900, end: 1200 }]
    }
  }
  

  
];
//ffa
const assignments = [
    { schoolName: "P.S. 123", borough: "Brooklyn", dayOfWeek: "monday", startTime: 1500, endTime: 1700, revenueValue: 200, status: "Open" },
    { schoolName: "P.S. 505", borough: "Manhattan", dayOfWeek: "tuesday", startTime: 1400, endTime: 1600, revenueValue: 250, status: "Open" },
    { schoolName: "Bronx Science Acad", borough: "The Bronx", dayOfWeek: "monday", startTime: 1000, endTime: 1200, revenueValue: 180, status: "Open" },
    { schoolName: "Queens STEM Prep", borough: "Queens", dayOfWeek: "wednesday", startTime: 1530, endTime: 1730, revenueValue: 220, status: "Open" },
    { schoolName: "Harbor School", borough: "Manhattan", dayOfWeek: "friday", startTime: 1300, endTime: 1500, revenueValue: 300, status: "Open" },
    { schoolName: "Brooklyn Tech High", borough: "Brooklyn", dayOfWeek: "thursday", startTime: 1500, endTime: 1700, revenueValue: 200, status: "Open" },
    { schoolName: "Eagle Academy", borough: "The Bronx", dayOfWeek: "tuesday", startTime: 1500, endTime: 1700, revenueValue: 180, status: "Open" },
    { schoolName: "P.S. 88", borough: "Queens", dayOfWeek: "friday", startTime: 900, endTime: 1100, revenueValue: 250, status: "Open" },
    { schoolName: "Gateway School", borough: "Staten Island", dayOfWeek: "friday", startTime: 1400, endTime: 1600, revenueValue: 400, status: "Open" },
    { schoolName: "MS 442", borough: "Brooklyn", dayOfWeek: "wednesday", startTime: 1430, endTime: 1630, revenueValue: 210, status: "Open" }
  ];

const seedDB = async () => {
    try {
      // 1. Connect
      await mongoose.connect(process.env.MongoURI);
      console.log("Connected to Atlas for seeding... ✅");
  
      // 2. Clear Old Data
    //   await Instructor.deleteMany({});
    //   await Assignment.deleteMany({});
    //   console.log("Old data cleared. 🧹");
  
      // 3. Seed Instructors
      await Instructor.insertMany(instructors);
      console.log("10 Instructors seeded successfully! 🚀");
  
      // 4. Seed Assignments
      await Assignment.insertMany(assignments);
      console.log("10 Assignments seeded successfully! 💰");
  
      console.log("Seeding Complete. Press Ctrl+C to exit.");
      process.exit();
    } catch (err) {
      console.error("❌ Seeding Error:", err);
      process.exit(1);
    }
  };
  
  seedDB();