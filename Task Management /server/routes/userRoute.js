const express = require("express");
const route = express.Router();
const UserController= require("../controllers/UserController");

route.post("/userlogin", UserController.loginCheck);

module.exports=route;