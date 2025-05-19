const express = require("express");
const app = express();
const path = require("path");
const Routes = require("./Routes/Routes");
const mongoose = require('mongoose');
const { log } = require("console");

main().then(()=>console.log("mongo db Connected...")).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/students');

}
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use("/", Routes);

app.listen(8080, () => console.log("App is listening on port 8080"));
