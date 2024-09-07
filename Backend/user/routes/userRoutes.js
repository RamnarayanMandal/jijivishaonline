const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register", userController.register);

router.post("/login", userController.login);

// // Route to request OTP for password reset
// router.post("/forgot-password", userController.requestOtpForReset);

// // Route to reset the password using OTP
// router.post("/reset-password", userController.resetPassword);

module.exports = router;
