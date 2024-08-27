const Admin = require("../models/admin"); // Adjust the path as necessary
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config(); // Import dotenv to use environment variables

// Create a Nodemailer transporter
const transporter = require("../mailer");

// Register Admin
exports.registerAdmin = async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      if (!existingAdmin.isVerified) {
        // If the admin exists but is not verified, resend OTP
        const otp = existingAdmin.generateOtp();
        await existingAdmin.save();

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: existingAdmin.email,
          subject: "Resend OTP for account verification",
          text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
            return res
              .status(500)
              .json({ message: "Error sending OTP email." });
          }
        });

        return res.status(200).json({
          message:
            "Admin already exists but is not verified. OTP resent to email.",
        });
      } else {
        return res
          .status(400)
          .json({ message: "Admin already exists with this email." });
      }
    }

    // Create new admin if not existing
    const admin = new Admin({ email, name, password });

    // Hash password before saving
    admin.password = await bcrypt.hash(password, 10);

    // Generate OTP and save it to the admin
    const otp = admin.generateOtp();
    await admin.save();

    // Send OTP to the admin's email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: admin.email,
      subject: "Your account verification OTP",
      text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Error sending email." });
      }
    });

    res.status(201).json({
      message:
        "Admin registered successfully. OTP sent to email for verification.",
    });
  } catch (error) {
    console.error("Error registering admin:", error);
    res
      .status(500)
      .json({ message: "Error registering admin.", error: error.message });
  }
};

// Verify OTP
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required." });
  }

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid email." });
    }

    if (admin.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

    if (admin.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP has expired." });
    }

    admin.isVerified = true;
    admin.otp = undefined;
    admin.otpExpires = undefined;
    await admin.save();

    res.status(200).json({ message: "OTP verified successfully." });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Error verifying OTP." });
  }
};

// Login Admin
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Check if admin is verified
    if (!admin.isVerified) {
      return res.status(403).json({ message: "Admin is not verified." });
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Admin authenticated successfully, generate a JWT token
    const token = jwt.sign(
      { adminId: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    res.status(200).json({ message: "Login successful", token: token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
