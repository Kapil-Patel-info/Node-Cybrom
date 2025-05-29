const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/user", userRoute);


mongoose.connect("mongodb://localhost:27017/userLogin", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err));


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
