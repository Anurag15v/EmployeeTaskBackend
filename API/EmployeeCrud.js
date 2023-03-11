const express = require("express");
const router = express.Router();
var jwt_decode = require("jwt-decode");
const Employee = require("../model/EmployeeSchema");
require("../db/conn");

router.post("/employee/create", async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    var decoded = jwt_decode(token);
    const { Name, Email, Phone, HireDate, Position } = req.body;
    if (!Name || !Email || !Phone || !HireDate || !Position || !token) {
      res.json({ error: "Invalid Data" });
    } 
    const EmployeeExist=await Employee.findOne({ Email:decoded.Email});
    if(EmployeeExist)
    {
      res.json({ message: "This Employee already exist" });
      return;
    }
    else {
      const GotEmployee = await Employee({ Name,Email,Phone,HireDate,Position });
      await GotEmployee.save();
      res.status(201).send("Successfully Employee Details Added");
    }
  }  
  catch (err) {
    console.log(err);
  }
});
router.route("/employee/read").get((req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;
  const startindex = (page - 1) * limit;
  if (page > 0) {
    Employee.find()
      .limit(parseInt(limit))
      .skip(startindex)
      .then((found) => {
        res.json(found);
      });
  } else {
    res.send("No Such Page Exists");
  }
});
router.put("/employee/edit/:id", async (req, res) => {
  const token = req.headers["x-access-token"];
  const { id } = req.params;
  const newData = req.body;
  try {
    if (!token) {
      res.status(400).send("Token Missing");
    }
    var decoded = jwt_decode(token);
    const GotEmployee = await Employee.findOne({ Email: decoded.Email });
    if(GotEmployee)
    {
      Employee.findOneAndUpdate(
        { _id: id },
        { "$set": newData},
        { upsert: true },
        function (err, doc) {
          console.log(err);
        }
      );
      res.status(200).json({ Instruction: "Employee details got updated" });
    }
    else{
      res.json({ error: "Employee ID doesn't exist" });
    }
  }
    catch (err) {
    console.log(err);
  }
});
router.route("/employee/delete/:id").delete(async (req, res) => {
  const token = req.headers["x-access-token"];
  const { id } = req.params;
  try {
    if (!token) {
      res.status(400).send("Token Missing");
    } else {
      var decoded = jwt_decode(token);
      const GotEmployee = await Employee.findOne({ Email: decoded.Email });
      if(GotEmployee)
      {
      await Employee.deleteOne({ _id: id });
      res.status(200).json({ messsage: "Successful Deleted This Employee Detail" });
      }
      else
      {
        res.json({ error: "Employee ID doesn't exist" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
