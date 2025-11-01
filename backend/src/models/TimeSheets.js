const mongoose = require("mongoose");

const TimeSheetsSchema = new mongoose.Schema(
  {
    // employeeId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Employee", // reference employees collection
    //   required: true,
    // },
    // projectId: {
    //   type: String,
    //    required: true,
    // },
    
    employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",   // name of the Employee model
    required: true
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",    // name of the Project model
    required: true
  },
  hoursWorked: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("timesheets", TimeSheetsSchema);
