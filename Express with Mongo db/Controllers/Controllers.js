// Controllers/Controllers.js

const Student = require("../Models/Model");

const homePage = (req, res) => {
  res.render("Home");
};

const insertPage = (req, res) => {
  res.render("insert");
};

const insertStudent = (req, res) => {
  let { name, age, rollno, subject, fees } = req.body;
  let newStudent = new Student({ name, age, rollno, subject, fees });
  newStudent.save();

  res.redirect("/display");
};

const displayPage = async (req, res) => {
  const students = await Student.find();
  res.render("display", { students });
};

const aboutPage = (req, res) => {
  res.render("about");
};

const contactPage = (req, res) => {
  res.render("contact");
};

const updatePage = async (req, res) => {
  const students = await Student.find();

  res.render("update", { students });
};

const editPage = async (req, res) => {
  const { id } = req.query;

  const data = await Student.findById(id);
  console.log(data);
  
  res.render("edit",{data});
};


const editSave = async(req,res)=>{

   let { id, name, age, rollno, subject, fees } = req.body;
  
await Student.findByIdAndUpdate(id,{
  name, age, rollno, subject, fees 
});

  res.redirect("/display");
}

const deleteData = async (req, res) => {
  const { id } = req.query;

  await Student.findByIdAndDelete(id);
  res.redirect("/update");
};

const searchPage = (req, res) => {
  res.render("search");
};

module.exports = {
  homePage,
  insertPage,
  insertStudent,
  displayPage,
  aboutPage,
  contactPage,
  updatePage,
  searchPage,
  deleteData,
  editPage,
  editSave
};
