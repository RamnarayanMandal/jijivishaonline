const express = require("express");
const userController = require("../controllers/adminController"); // Adjust the path as necessary

const router = express.Router();

// Register route
router.post("/register", userController.registerAdmin);

module.exports = router;
