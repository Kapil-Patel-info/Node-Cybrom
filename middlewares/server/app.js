

const express = require("express");
const app = express();

const port = 8080;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.get("/home", (req, res) => {
  console.log("/home route was called");
  res.send("home h");
});




app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
