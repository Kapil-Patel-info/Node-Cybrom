const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  rollno: { type: Number, required: true },
  subject: { type: String, required: true },
  fees: { type: Number, required: true }
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
