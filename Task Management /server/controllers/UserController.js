const UserModel = require("../models/userModel");
const TaskModel = require("../models/taskModel");

const loginCheck = async (req, res) => {
  const { email, password } = req.body;

  try {
    const User = await UserModel.findOne({ email });
    if (!User) {
      return res.status(400).send({ msg: "Invalid Email Id!" });
    }
    if (User.password !== password) {
      return res.status(400).send({ msg: "Invalid Password!" });
    }
    res.status(200).send({ msg: "Login Successfully!", User });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server error" });
  }
};

const myTaskList = async (req, res) => {
  const { id } = req.query;
  try {
    const Task = await TaskModel.find({ userid: id });
    console.log(Task);
    res.status(200).send(Task);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server error" });
  }
};

const taskComplete = async (req, res) => {
  const { id } = req.query;
  try {
    const response = await TaskModel.findByIdAndUpdate(id, { taskstatus: true });
    res.status(201).send({ response, msg: "Task submitted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server error" });
  }
};



module.exports = {
  loginCheck,
  myTaskList,
  taskComplete
  
};
