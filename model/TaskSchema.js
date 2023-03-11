const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema({
  Title: {
    type: String,
    require: true,
  },
  Description:{
    type:String,
    require:true
  },
  DueDate:{
    type:String,
    require:true
  },
  EmployeeID:{
    type:String,
    require:true
  }
});

const Task = mongoose.model("TASK", TaskSchema);
module.exports = Task;
