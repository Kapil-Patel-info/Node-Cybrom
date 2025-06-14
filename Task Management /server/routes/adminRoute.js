const express = require("express");
const route = express.Router();
const AdminController= require("../controllers/AdminController"); 
route.post("/logincheck", AdminController.adminLogin);
route.post("/usercreation", AdminController.createUser);
route.get("/showuserdata", AdminController.showUserData);
route.post("/assigntask", AdminController.assignTask);

module.exports=route;