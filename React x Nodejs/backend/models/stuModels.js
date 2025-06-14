
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  rollno: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  fees: {
    type: Number,
    required: true
  },
  image: { type: String }

});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;


// ,
//   imageUrl:{
//     type:String
//   }

