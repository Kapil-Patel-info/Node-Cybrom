const express = require("express");
const router = express.Router();
const controller = require("../Controllers/controllers");



router.get("/insert",controller.insertController);








module.exports = router;


