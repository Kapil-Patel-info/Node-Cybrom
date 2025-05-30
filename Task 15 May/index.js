const express = require("express");
const app = express();
const path = require("path");
const StudentData = require("./routes/StudentData");

app.set("view engine","ejs");
app.use("/students",StudentData);

app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(8080,()=>{
    console.log("app is listening on server 8080");    
});
