const express = require("express");
const route = express.Router();
const userController = require("../Controllers/userController");


route.post("/login",userController.Login);
route.post('/registration',userController.registration);


module.exports = route;