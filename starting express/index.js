const express = require("express");
const app = express();
const StuRoute = require("./routes/stuRoute");

app.set("view engine", "ejs");  // Set EJS as the template engine

app.use("/student", StuRoute); // Mount routes at /student

app.listen(8000, () => {
    console.log("App is listening on server 8000");
});



