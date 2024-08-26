const Admin = require("../models/admin"); // Adjust the path as necessary
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerAdmin = async (req, res) => {
  const { email, name, password } = req.body;

  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists with this email." });
    }

    // Create new admin
    const admin = new Admin({ email, name, password });

    // Hash password and save admin
    await admin.save();

    // Generate OTP and save it to the admin
    const otp = admin.generateOtp();
    await admin.save();

    // Send OTP to the admin email (Implementation required)
    // Example: await sendOtpToEmail(admin.email, otp);

    res.status(201).json({ message: "Admin registered successfully. OTP sent to email for verification." });
  } catch (error) {
    res.status(500).json({ message: "Error registering admin.", error: error.message });
  }
};


