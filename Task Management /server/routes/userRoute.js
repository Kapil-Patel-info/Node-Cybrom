const express = require("express");
const route = express.Router();
const UserController= require("../controllers/UserController");

route.post("/userlogin", UserController.loginCheck);
route.get("/mytask", UserController.myTaskList);
route.get("/completetask", UserController.taskComplete);

route.post("/changepassword",UserController.changepassword);
module.exports=route;