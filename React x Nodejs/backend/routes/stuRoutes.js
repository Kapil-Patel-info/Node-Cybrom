const express = require("express");
const router = express.Router();
const stuControllers = require("../controllers/stuControllers");
const Student = require("../models/stuModels");

router.post("/add-student", async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(500).json({ message: "Failed to save student", error });
  }
});

router.get("/display", stuControllers.DisplayPage);

module.exports = router;
