const mongoose = require("mongoose");

const TimeSheetsSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee", // reference employees collection
      required: true,
    },
    projectId: {
      type: String,
       required: true,
    },
    date: {
      type: Date,
      required: true,
      default: () => new Date(), // auto set today's date
    },
    hoursWorked: {
      type: Number,
      required: true,
      min: 0,
    },
    remarks: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

module.exports = mongoose.model("timesheets", TimeSheetsSchema);
