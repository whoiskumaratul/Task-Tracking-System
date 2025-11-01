const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  description: String,
  employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "EmployeeLogin" }], // many employees
});

module.exports = mongoose.model("Project", projectSchema);
