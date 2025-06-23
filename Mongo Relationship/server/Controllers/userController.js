const profileModel = require("../Models/profileModel");
const userModel = require("../Models/userModel");


const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({ msg: "Email not found" });
    }

    if (user.password !== password) {
      return res.status(400).send({ msg: "Incorrect password" });
    }

    res.status(200).send({ BackendData: user, msg: "Login successful from backend" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Server error" });
  }
};


const registration = async (req, res) => {
  let { name, age, email, password } = req.body;
  try {
    const user = await userModel.create({
      email,
      password,
    });

    const profile = await profileModel.create({
      name,
      age,
      user: user._id,
    });

    res;
    res.status(201).send({
      msg: "Registration successful!",
      user: user,
      profile: profile,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  Login,
  registration,
};
