const express = require("express");
const app = express();
require('dotenv').config();
const mongoose = require("mongoose");
const port = process.env.PORT;
const route = require("./Routes/route");


app.use("/users",route);


main().then(()=>{
    console.log("Connecting to mongo Atlas");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGOATLAS);
}




app.listen(port ,()=>{
    console.log(`app is listening on port ${port}`);
});






