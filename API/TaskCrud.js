const express = require("express");
const router = express.Router();
const Task = require("../model/TaskSchema");
require("../db/conn");

router.post("/task/create", async (req, res) => {
    try {
      const { Title, Description, DueDate, EmployeeID } = req.body;
      if (!Title || !Description || !DueDate || !EmployeeID ) {
        res.json({ error: "Invalid Entery" });
      } 
        const task = await Task({ Title, Description, DueDate, EmployeeID });
        await task.save();
        res.status(201).send(" Successfully Added Task");
    }  
    catch (err) {
      console.log(err);
    }
  });
  //paginated 
  router.route("/task/read").get((req, res) => {
    const page = req.query.page;
    const limit = req.query.limit;
    const startindex = (page - 1) * limit;
    if (page > 0) {
      Task.find()
        .limit(parseInt(limit))
        .skip(startindex)
        .then((found) => {
          res.json(found);
        });
    } else {
      res.send("No Such Page Exists");
    }
  });
  router.put("/task/edit/:id", async (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    try {
        Task.findOneAndUpdate(
          { _id: id },
          { "$set": newData},
          { upsert: true },
          function (err, doc) {
            console.log(err);
          }
        );
        res.status(200).json({ Instruction: "Task details got updated" });
      }
      catch (err) {
      console.log(err);
    }
  });
  router.route("/task/delete/:id").delete(async (req, res) => {
    const { id } = req.params;
    try { 
        const task = await Task.findOne({ _id:id });
        await task.deleteOne({ _id: id });
        res.status(200).json({ messsage: "Successful Deleted This Task Detail" });
    } catch (err) {
      console.log(err);
    }
  });
  
  module.exports = router;
  