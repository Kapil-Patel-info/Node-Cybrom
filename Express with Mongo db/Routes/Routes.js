const express = require("express");
const Routes = express.Router();
const controllers = require("../Controllers/Controllers");
const { collection } = require("../Models/Model");


Routes.get("/", controllers.homePage);
Routes.get("/insert", controllers.insertPage);
Routes.post("/insert",controllers.insertStudent);


Routes.get("/display", controllers.displayPage);
Routes.get("/about", controllers.aboutPage);
Routes.get("/contact", controllers.contactPage);

Routes.get("/search", controllers.searchPage);
Routes.get("/update", controllers.updatePage);

Routes.get("/delete", controllers.deleteData);

Routes.get("/editData",controllers.editPage);
Routes.post("/editSave",controllers.editSave);

Routes.post("/searchData",controllers.searchData);

module.exports = Routes;
