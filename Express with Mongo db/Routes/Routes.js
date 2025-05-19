const express = require("express");
const Routes = express.Router();
const controllers = require("../Controllers/Controllers");


Routes.get("/", controllers.homePage);
Routes.get("/insert", controllers.insertPage);
Routes.post("/insert",controllers.insertStudent);


Routes.get("/display", controllers.displayPage);
Routes.get("/about", controllers.aboutPage);
Routes.get("/contact", controllers.contactPage);

Routes.get("/search", controllers.searchPage);
Routes.get("/update", controllers.updatePage);

Routes.get("/delete", controllers.deleteData);


module.exports = Routes;
