const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();


function generateUserId(email) {
  return crypto.createHash("sha256").update(email).digest("hex").slice(0, 6).toUpperCase();
}


function generateRandomString(length) {
  return crypto.randomBytes(Math.ceil(length / 2)).toString("hex").slice(0, length);
}


function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}


const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS,
  },
});


const registerUser = async (req, res) => {
  const { email } = req.body;

  try {
   
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }

   
    const userId = generateUserId(email);
    const rawPassword = generateRandomString(8);
    const otp = generateOtp();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); 

 
    const hashedPassword = await bcrypt.hash(rawPassword, 10);


    const newUser = new User({
      email,
      userName: userId,
      password: hashedPassword,
      otp,
      otpExpires,
    });

    await newUser.save();

  
    const mailOptions = {
      from: process.env.EMAIL_USER, 
      to: email,
      subject: "Your Account Details and OTP for Verification",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; border: 1px solid #ddd; border-radius: 5px; max-width: 600px; margin: auto;">
          <h2 style="color: #4CAF50;">Welcome to Our Service!</h2>
          <p>Your account has been successfully created.</p>
          <p><strong>User ID:</strong> ${userId}</p>
          <p><strong>Password:</strong> ${rawPassword}</p>
          <p><strong>OTP for verification:</strong> ${otp}</p>
          <p>Please use the OTP above to verify your account. Make sure to change your password after logging in for security purposes.</p>
          <p>If you have any questions, feel free to reach out to our support team.</p>
          <hr style="border-top: 1px solid #ddd; margin-top: 20px;">
          <footer style="font-size: 12px; color: #777;">
            <p>Thank you for choosing our service!</p>
            <p>Best Regards,<br>Your Company Name</p>
          </footer>
        </div>
      `,
    };

 
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Error sending email", error: error.message });
      }
      res.status(201).json({ message: "Registration successful. User ID, password, and OTP sent to email." });
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login user function
const loginUser = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    
    const user = await User.findOne({ $or: [{ email: identifier }, { userName: identifier }] });
    if (!user) {
      return res.status(400).json({ message: "Invalid email/User ID or password" });
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email/User ID or password" });
    }


    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { registerUser, loginUser };
