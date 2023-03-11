const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({
  Name: {
    type: String,
    require: true,
  },
  Email: {
    type: String,
    require: true,
  },
  Phone: {
    type: String,
    require: true,
  },
  HireDate:{
    type:String,
    require:true,
  },
  Position:{
    type:String,
    require:true,
  }
});
const Employee = mongoose.model("EMPLOYEE", employeeSchema);
module.exports = Employee;
