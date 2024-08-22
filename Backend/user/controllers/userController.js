const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const User = require("../models/User"); // Adjust the path as necessary
require('dotenv').config();


// Generate a 6-character user ID based on the email
function generateUserId(email) {
  return crypto.createHash('sha256').update(email).digest('hex').slice(0, 6).toUpperCase();
}

// Generate a random string of a specific length
function generateRandomString(length) {
  return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App Password here
  },
});

const registerUser = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    // Generate a user ID based on the email
    const userId = generateUserId(email);

    // Generate a random password
    const rawPassword = generateRandomString(8); // 8-character password

    // Hash the password
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    // Create a new user
    const newUser = new User({
      email,
      userName: userId,
      password: hashedPassword,
    });

    await newUser.save();

    // Send the user ID and password to the user's email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Account Details",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; border: 1px solid #ddd; border-radius: 5px; max-width: 600px; margin: auto;">
          <h2 style="color: #4CAF50;">Welcome to Our Service!</h2>
          <p>Your account has been successfully created.</p>
          <p><strong>User ID:</strong> ${userId}</p>
          <p><strong>Password:</strong> ${rawPassword}</p>
          <p>Please make sure to change your password after logging in for security purposes.</p>
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
        return res.status(500).json({ message: "Error sending email", error });
      }
      res.status(201).json({ message: "Registration successful. User ID and password sent to email." });
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


const loginUser = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    // Check if the user exists with the provided email or userId
    const user = await User.findOne({ $or: [{ email: identifier }, { userName: identifier }] });
    if (!user) {
      return res.status(400).json({ message: "Invalid email/User ID or password" });
    }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email/User ID or password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      "your-secret-key", // Use a secure secret key from environment variables in production
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
module.exports = {registerUser,loginUser};
