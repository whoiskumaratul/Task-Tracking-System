
const express = require('express')
const { dbConnect } = require('./mongodb/mongodb')

const app = express()
const port = 8000
require('./mongodb/config')
const cors = require('cors')

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const verifyToken = require('./middleware/verifytoken')

const TimeSheets = require('./src/models/TimeSheets')
const Employee = require('./src/models/LoginSchema/LoginSchema')
const Project = require('./src/models/Project')

app.use(express.json())    //data get from postman
app.use(cors({
     origin: 'http://localhost:5173',
     credentials: true
}))

app.get('/', async (req, resp) => {
    let data = await TimeSheets.find();
    console.log(data);
    resp.send(data)
})

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1. Check if employee exists
    const employee = await Employee.findOne({ username });
    if (!employee) return res.status(400).json({ msg: "Invalid credentials" });

    // 2. Compare password with bcrypt
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // 3. Generate JWT
    const token = jwt.sign(
      { employeeId: employee._id, 
        username: employee.username, 
        projectId: employee.projectId },
      "SECRET_KEY", // use env variable in real apps
      { expiresIn: "1h" }
    );

    //for sending employee data to frontend (username, employeeId, projectId- then in frontend user?.username, user?.employeeId, user?.projectId, user?.role)
   res.json({
  token,
  user: {
    username: employee.username,
    employeeId: employee._id,
    projectId: employee.projectId
  }
});

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});



// app.post("/timesheets", verifyToken, async (req, res) => {
//   try {
//     const timeLog = new TimeSheets({
//       employeeId: req.user.employeeId,    // from JWT
//       username: req.user.username,        // from JWT
//       projectId: req.user.projectId,      // from JWT
//       hoursWorked: req.body.hoursWorked,  // only thing frontend sends
//       remarks: req.body.remarks || ""
//     });

//     const savedTimeData = await timeLog.save();

//     res.status(201).json({
//       result: savedTimeData,
//       message: "TimeSheet Created Successfully",
//     });
//   } catch (error) {
//     console.error("Error", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });





app.post("/assignProject", async (req, res) => {
  const { employeeId, projectId } = req.body;

  try {
    await Project.findByIdAndUpdate(projectId, { $addToSet: { employees: employeeId } });
    await Employee.findByIdAndUpdate(employeeId, { $addToSet: { projects: projectId } });

    res.json({ msg: "Employee assigned to project" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


app.post("/timesheet", verifyToken, async (req, res) => {
  const { projectId, hoursWorked } = req.body;
  const employeeId = req.user.employeeId; // from JWT

  try {
    const employee = await Employee.findById(employeeId);
    if (!employee.projects.includes(projectId)) {
      return res.status(403).json({ msg: "Not assigned to this project" });
    }

    const timesheet = new TimeSheet({ employeeId, projectId, hoursWorked });
    await timesheet.save();

    res.json({ msg: "Timesheet submitted", timesheet });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});





// app.post('/timesheets', async (req, resp) => {
//     try {
//        let data = new TimeSheets(req.body);
//        const savedTimeData = await data.save()

//        resp.status(201).json({
//         result : savedTimeData,
//         message: 'TimeSheet Created Successfully',
//        })
//     }
//     catch(error) {
//         console.log('Error', error)
//         resp.status(500).json({error: 'Internal Server Error'})
//     }       
// })






app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

