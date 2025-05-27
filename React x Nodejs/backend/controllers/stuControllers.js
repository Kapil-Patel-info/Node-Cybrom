const stuModel = require("../models/stuModels");

const HomePage = (req, res) => {
  console.log("Home is running");
  res.send("Home is running");
};

const addStudent = async (req, res) => {
  try {
    const newStudent = new stuModel(req.body);
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(500).json({ message: "Failed to save student", error });
  }
};

const DisplayPage = async (req, res) => {
  try {
    const data = await stuModel.find();
    res.send(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch students", error });
  }
};

const deleteData = async (req, res) => {
const { id } = req.params;


    await stuModel.findByIdAndDelete(id);
    
  
};


const searchData = async (req, res) => {
  const { rollno } = req.query;
  const Data = await stuModel.find({ "rollno": rollno });
  res.send(Data);
};

module.exports = {
  HomePage,
  addStudent,
  DisplayPage,
  deleteData,
  searchData
};
