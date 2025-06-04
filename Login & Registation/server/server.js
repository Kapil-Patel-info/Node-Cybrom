const express = require("express");
const app = express();
require('dotenv').config();
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");


const port = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use("/user", userRoute);




mongoose.connect(process.env.DBCON, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err));



app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});



// app third party error path 
// can mmiddleware run agter path 
// can also modufy req obj 