import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Job from './src/models/Job.js';

dotenv.config();

const jobs = [
  { title: 'Mathematics Faculty (7–10)', description: 'Teach core math curriculum and Olympiad basics.', location: 'Hyderabad', type: 'Full-time' },
  { title: 'Physics Lecturer (Intermediate)', description: 'Conceptual teaching with problem-solving focus.', location: 'Hyderabad', type: 'Full-time' },
  { title: 'Academic Counselor', description: 'Guide students/parents and manage admissions.', location: 'Hyderabad', type: 'Full-time' }
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Job.deleteMany({});
    await Job.insertMany(jobs);
    console.log('✅ Seeded jobs');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
