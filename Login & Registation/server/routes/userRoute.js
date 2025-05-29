const userController = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.post("/registration", userController.registrationPage);

router.post("/login",userController.loginPage)

module.exports = router;
