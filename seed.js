/**
 * FILE: seed.js
 * DESCRIPTION: Robust seed script for Demo Day. 
 * Includes 15 Instructors and 20 Assignments.
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Instructor = require('./models/Instructor');
const Assignment = require('./models/Assignment');

const instructors = [
  { name: "Alex Rivers", email: "alex@stemkids.com", password: "password123", skills: ["Robotics", "Python"], boroughs: ["Brooklyn", "Manhattan"], isFingerprinted: true, hasInsurance: true },
  { name: "Sam Chen", email: "sam@stemkids.com", password: "password123", skills: ["Chess", "Math"], boroughs: ["Queens", "Brooklyn"], isFingerprinted: true, hasInsurance: false },
  { name: "Jordan Smith", email: "jordan@stemkids.com", password: "password123", skills: ["Python", "Web Development"], boroughs: ["The Bronx", "Manhattan"], isFingerprinted: false, hasInsurance: true },
  { name: "Taylor Vance", email: "taylor@stemkids.com", password: "password123", skills: ["Robotics", "Math"], boroughs: ["Brooklyn", "Queens"], isFingerprinted: true, hasInsurance: true },
  { name: "Morgan Lee", email: "morgan@stemkids.com", password: "password123", skills: ["Chess", "Web Development"], boroughs: ["Manhattan", "The Bronx"], isFingerprinted: true, hasInsurance: true },
  { name: "Casey Zhang", email: "casey@stemkids.com", password: "password123", skills: ["Python", "Robotics"], boroughs: ["Staten Island", "Brooklyn"], isFingerprinted: false, hasInsurance: false },
  { name: "Riley Cooper", email: "riley@stemkids.com", password: "password123", skills: ["Math", "Chess"], boroughs: ["Queens", "Manhattan"], isFingerprinted: true, hasInsurance: true },
  { name: "Jamie Lopez", email: "jamie@stemkids.com", password: "password123", skills: ["Web Development", "Python"], boroughs: ["The Bronx", "Queens"], isFingerprinted: true, hasInsurance: true },
  { name: "Skyler Bell", email: "skyler@stemkids.com", password: "password123", skills: ["Robotics"], boroughs: ["Brooklyn", "Manhattan", "Queens"], isFingerprinted: true, hasInsurance: false },
  { name: "Quinn Moore", email: "quinn@stemkids.com", password: "password123", skills: ["Math", "Python"], boroughs: ["Manhattan"], isFingerprinted: false, hasInsurance: true },
  { name: "Avery Brooks", email: "avery@stemkids.com", password: "password123", skills: ["Lego Engineering"], boroughs: ["Brooklyn"], isFingerprinted: true, hasInsurance: true },
  { name: "Charlie Day", email: "charlie@stemkids.com", password: "password123", skills: ["Python"], boroughs: ["Queens"], isFingerprinted: true, hasInsurance: true },
  { name: "Parker Reed", email: "parker@stemkids.com", password: "password123", skills: ["Math"], boroughs: ["Manhattan"], isFingerprinted: true, hasInsurance: true },
  { name: "Dakota Sky", email: "dakota@stemkids.com", password: "password123", skills: ["Robotics"], boroughs: ["The Bronx"], isFingerprinted: false, hasInsurance: true },
  { name: "Emerson Lake", email: "emerson@stemkids.com", password: "password123", skills: ["Web Development"], boroughs: ["Brooklyn"], isFingerprinted: true, hasInsurance: true }
];

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
    { schoolName: "MS 442", borough: "Brooklyn", dayOfWeek: "wednesday", startTime: 1430, endTime: 1630, revenueValue: 210, status: "Open" },
    { schoolName: "P.S. 11", borough: "Manhattan", dayOfWeek: "monday", startTime: 900, endTime: 1100, revenueValue: 150, status: "Open" },
    { schoolName: "Aviation High", borough: "Queens", dayOfWeek: "thursday", startTime: 1300, endTime: 1500, revenueValue: 350, status: "Open" },
    { schoolName: "Stuyvesant High", borough: "Manhattan", dayOfWeek: "wednesday", startTime: 1500, endTime: 1700, revenueValue: 280, status: "Open" },
    { schoolName: "P.S. 24", borough: "The Bronx", dayOfWeek: "thursday", startTime: 1400, endTime: 1600, revenueValue: 190, status: "Open" },
    { schoolName: "Brooklyn Friends", borough: "Brooklyn", dayOfWeek: "tuesday", startTime: 1530, endTime: 1730, revenueValue: 450, status: "Open" },
    // A few already "Staffed" jobs to make the dashboard look real
    { schoolName: "Metropolitan HS", borough: "Manhattan", dayOfWeek: "monday", startTime: 1300, endTime: 1500, revenueValue: 200, status: "Staffed" },
    { schoolName: "P.S. 9", borough: "Brooklyn", dayOfWeek: "wednesday", startTime: 1400, endTime: 1600, revenueValue: 220, status: "Staffed" },
    { schoolName: "Queens High", borough: "Queens", dayOfWeek: "friday", startTime: 1000, endTime: 1200, revenueValue: 300, status: "Staffed" },
    { schoolName: "Bronx Prep", borough: "The Bronx", dayOfWeek: "tuesday", startTime: 900, endTime: 1100, revenueValue: 180, status: "Staffed" },
    { schoolName: "Island Academy", borough: "Staten Island", dayOfWeek: "monday", startTime: 1400, endTime: 1600, revenueValue: 500, status: "Staffed" }
  ];

const seedDB = async () => {
    try {
      await mongoose.connect(process.env.MongoURI);
      console.log("Connected to Atlas for seeding... ✅");
  
      // Clear Old Data - UNCOMMENTED FOR FRESH START
      await Instructor.deleteMany({});
      await Assignment.deleteMany({});
      console.log("Old data cleared. 🧹");
  
      await Instructor.insertMany(instructors);
      console.log("15 Instructors seeded! 🚀");
  
      await Assignment.insertMany(assignments);
      console.log("20 Assignments seeded! 💰");
  
      console.log("Seeding Complete. Press Ctrl+C to exit.");
      process.exit();
    } catch (err) {
      console.error("❌ Seeding Error:", err);
      process.exit(1);
    }
  };
  
  seedDB();