const express = require("express");
const adminController = require("../controllers/adminController"); // Adjust the path as necessary

const router = express.Router();

// Register route
router.post("/register", adminController.registerAdmin);
router.post("/verify-otp", adminController.verifyOtp);
router.post("/login", adminController.loginAdmin);

module.exports = router;
