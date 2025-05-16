const express = require("express");
const route = express.Router();
const stuController = require("../controllers/stuController");

route.get("/home", stuController.homePage);
route.get("/about", stuController.aboutPage);

route.get("/courses", stuController.coursesPage);
route.get("/contact", stuController.contactPage);
route.get("/faculty", stuController.facultyPage);


module.exports = route;
