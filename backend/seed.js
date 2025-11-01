// seed.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const EmployeeLogin = require('./src/models/LoginSchema/LoginSchema'); //  model path may need to be adjusted
const Project = require('./src/models/Project');                  // model path may need to be adjusted
const Timesheet = require('./src/models/TimeSheets');            // model path may need to be adjusted




async function seed() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/tts", {
    //   useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected");

    // 1. Create a Project
    const project = await Project.create({
      projectName: "Website Redesign",
      description: "Redesigning the company website",
      startDate: new Date("2025-09-01"),
      endDate: new Date("2025-12-31")
    });

    // 2. Create Employees and assign them to the project
    const emp1 = await EmployeeLogin.create({
      username: "john12354",
      password: "hashedpassword1", // hash in real use
      role: "employee",
      projects: [project._id]
    });

    const emp2 = await EmployeeLogin.create({
      username: "jane4567",
      password: "hashedpassword2",
      role: "employee",
      projects: [project._id]
    });

    // 3. Add timesheet entries
    await Timesheet.create([
      { employeeId: emp1._id, projectId: project._id, hoursWorked: 5, date: new Date("2025-09-18") },
      { employeeId: emp2._id, projectId: project._id, hoursWorked: 7, date: new Date("2025-09-18") }
    ]);

    console.log("✅ Database seeded successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding database:", err);
    process.exit(1);
  }
}

seed();
