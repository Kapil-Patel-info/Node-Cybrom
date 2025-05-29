const userModel = require("../models/userModel");

const registrationPage = async (req, res) => {
  const { name, age, email, password } = req.body;
  try {
    const newUser = new userModel({
      name,
      age,
      email,
      password,
    });
    await newUser.save();
    res.send("New user save Sucessfully");
  } catch (err) {
    console.log`ERROR in  Backend  /registration route =  ${err}`;
  }
};

const loginPage = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      res.status(401).json({ message: "Invalid Email" });
    }
    if (user.password !== password) {
      res.status(401).json({ message: "Invalid password" });
    } else {
      res.status(200).json({ message: "User Login Sucessfully" });
    }
  } catch (err) {
    console.log("Backend Error = ", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  registrationPage,
  loginPage,
};
