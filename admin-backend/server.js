
const express = require('express')
const { dbConnect } = require('./mongodb/mongodb')

const app = express()
const port = 8001
require('./mongodb/config')
const cors = require('cors')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const verifyToken = require('./middleware/verifytoken')
const Admin = require('./src/models/AdminLoginSchema/AdminLoginSchema.js')
const TimeSheets = require('./src/models/TimeSheet.js')


app.use(express.json())    //data get from postman
app.use(cors({
     origin: 'http://localhost:5174',
     credentials: true
}))


app.get('/', async (req, resp) => {
    let data = await TimeSheets.find();
    console.log(data);
    resp.send(data)
})


app.post("/adminlogin", async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1. Check if admin exists
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ msg: "Invalid credentials" });

    // 2. Compare password with bcrypt
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // 3. Generate JWT
    const token = jwt.sign(
      { employeeId: admin._id, 
        username: admin.username
       },
      "SECRET_KEY", // use env variable in real apps
      { expiresIn: "1h" }
    );

    //for sending admin data to frontend (username, employeeId, projectId- then in frontend user?.username, user?.employeeId, user?.projectId, user?.role)
  res.cookie("jwt", token, {
  httpOnly: true,
  secure: false, // true if using https
  sameSite: "strict",
  maxAge: 60 * 60 * 1000 // 1 hour
});
   
   
    res.json({
  token,
  user: {
    username: admin.username,
    password: admin.password,
    adminId: admin._id
  }
});

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

app.get("/employeehoursreport", verifyToken, async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ status: false, error: "Unauthorized" });
  }

  try {
    jwt.verify(token, "SECRET_KEY", (err, decoded) => {
      if (err) return res.status(403).json({ status: false, error: "Invalid token" });
      req.user = decoded; // store decoded payload
    });

    const timesheets = await TimeSheets.find();
    res.status(200).json(timesheets);
  } catch (err) {
    console.error("Error fetching timesheets:", err);
    res.status(500).json({ status: false, error: "Server error" });
  }
});






app.post("/assignProject", async (req, res) => {
  const { employeeId, projectId } = req.body;

  try {
    await Project.findByIdAndUpdate(projectId, { $addToSet: { employees: employeeId } });
    await Admin.findByIdAndUpdate(employeeId, { $addToSet: { projects: projectId } });

    res.json({ msg: "Employee assigned to project" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});



app.get("/employeehoursreport/:projectId", verifyToken, async (req, res) => {
  try {
    const timesheets = await TimeSheets.find({ projectId: req.params.projectId })
      .populate("employeeId", "username name")
      .populate("projectId", "projectName");

    res.json(timesheets);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

