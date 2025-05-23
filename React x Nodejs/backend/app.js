
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const stuRoutes = require("./routes/stuRoutes");

const app = express();
const port = 8080;


app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect("mongodb://localhost:27017/stuDB")
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.log("MongoDB connection error:", err));


app.use("/", stuRoutes);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
