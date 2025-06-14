const stuModel = require("../models/stuModels");

const HomePage = (req, res) => {
  console.log("Home is running");
  res.send("Home is running");
};





const addStudent = async (req, res) => {
  try {
    const { rollno, name, subject, fees } = req.body;
    const image = req.file ? req.file.path : null;

    console.log("Form Data:", req.body);
    console.log("File Info:", req.file);

    const newStudent = new stuModel({
      rollno,
      name,
      subject,
      fees: parseFloat(fees),
      image
    });

    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Failed to save student", error });
  }
};







const getStudentById = async (req, res) => {
  try {
    const student = await stuModel.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.status(200).json(student);
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ message: "Error fetching student", error });
  }
};


const updateStudentById = async (req, res) => {
  try {
    const updatedStudent = await stuModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStudent) return res.status(404).json({ message: "Student not found" });
    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ message: "Error updating student", error });
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
  searchData,
  getStudentById,
  updateStudentById

};
