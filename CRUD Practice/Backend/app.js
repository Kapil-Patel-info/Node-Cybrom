const express = require("express");
const app = express();
require('dotenv').config();
const userRoute = require("./Routes/userRoute");
const bodyParser = require('body-parser');
const ConnectDB = require("./DbConnection");
const cors = require('cors');

let Port = process.env.PORT;





app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/user",userRoute);
ConnectDB();
app.use(cors());






app.listen(Port,()=>{
    console.log(`The App is running on Port ${Port}`);
});


