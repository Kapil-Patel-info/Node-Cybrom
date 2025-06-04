
const express = require("express");          
const mongoose = require("mongoose");    
const cors = require("cors");         
const stuRoutes = require("./routes/stuRoutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect(process.env.DBCON)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.log("MongoDB connection error:", err));


app.use("/", stuRoutes);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
