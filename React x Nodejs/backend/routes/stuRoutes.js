const express = require("express");
const router = express.Router();
const stuControllers = require("../controllers/stuControllers");
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});
const upload = multer({ storage });


router.post("/add-student", upload.single("image"), stuControllers.addStudent);
router.get("/display", stuControllers.DisplayPage);
router.delete("/delete/:id", stuControllers.deleteData);
router.get("/student/:id", stuControllers.getStudentById);
router.put("/student/:id", stuControllers.updateStudentById);
router.get("/search", stuControllers.searchData);

module.exports = router;
