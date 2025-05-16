const express = require("express");
const route = express.Router();
const studentObj = require("../controllers/StudentObj");


route.get("/home",studentObj.homePage);
route.get("/about",studentObj.aboutPage);
route.get("/contact",studentObj.contactPage);
route.get("/gallery",studentObj.galleryPage);
route.get("/join",studentObj.joinPage);
route.get("/services",studentObj.servicesPage);
route.get("/placement",studentObj.placementPage);

module.exports = route;
