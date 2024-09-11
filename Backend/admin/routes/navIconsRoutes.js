const express = require("express");
const router = express.Router();
const {
  uploadNavIcons,
  getFileById,
  updateFileById,
  getFileAll,
} = require("../controllers/navbarIconsController");

// Route for file upload
router.post("/upload", uploadNavIcons);

router.get("/getAll", getFileAll);

// Route to get file by ID
router.get("/getfiles/:id", getFileById);

// Route to update file by ID
router.put("/update-files/:id", updateFileById);

module.exports = router;
