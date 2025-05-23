const stuModel = require("../models/stuModels");

const HomePage = (req, res) => {
  console.log("home is running");
  res.send("home is running");
};

const DisplayPage = async (req, res) => {
  const data = await stuModel.find();

  res.send(data);
};

module.exports = {
  HomePage,
  DisplayPage,
};
