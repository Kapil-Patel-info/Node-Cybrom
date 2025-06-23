const express = require("express");
const app = express();
const route = require("./Routes/userRoute");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

let port = process.env.PORT;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", route);

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

app.listen(port, () => {
  console.log(`The App is running on Server ${port}`);
});
