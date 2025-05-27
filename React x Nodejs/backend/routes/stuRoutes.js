const express = require("express");
const router = express.Router();
const stuControllers = require("../controllers/stuControllers");

// Routes
router.post("/add-student", stuControllers.addStudent);
router.get("/display", stuControllers.DisplayPage);
router.delete("/delete/:id", stuControllers.deleteData); 


//for search 
router.get("/search",stuControllers.searchData);

module.exports = router;
 