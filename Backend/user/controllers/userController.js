const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");


// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "amitkumar425863@gmail.com",
    pass: "wqql hbvq udjt erat", // Secure this password by using environment variables
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Helper function to generate a user ID
function generateUserId() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; // Characters to choose from for letters
  const digits = "0123456789"; // Characters to choose from for digits

  let userId = "";
  
  // Generate 3 random letters
  for (let i = 0; i < 3; i++) {
    userId += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  // Generate 2 random digits
  for (let i = 0; i < 2; i++) {
    userId += digits.charAt(Math.floor(Math.random() * digits.length));
  }

  return userId;
}

exports.register = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send("Email is required.");
  }

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).send("User already exists");

    // Generate a random password
    const password = Math.random().toString(36).slice(-8); // This generates a random 8-character password

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a custom user ID
    const customUserId = generateUserId();

    // Create a new user with the custom user ID
    user = new User({
      email,
      password: hashedPassword, // Save the hashed password
      customUserId, // Add the custom user ID to the user model
    });

    const otp = user.generateOtp(); // Assuming you have a function to generate OTP
    await user.save();

    const mailOptions = {
      from: "amitkumar425863@gmail.com",
      to: user.email,
      subject: "Your account details",
      text: `Your OTP is ${otp}. Your password is: ${password}. Your user ID is: ${customUserId}`, // Include the password and custom user ID here
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send("Error sending email.");
      }
      res.status(200).send("Password and user ID sent to your email.");
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).send("Email and OTP are required.");
  }

  try {
    const user = await User.findOne({ email, otp });

    if (!user) {
      return res.status(400).send("Invalid OTP or email.");
    }

    if (user.otpExpires < Date.now()) {
      return res.status(400).send("OTP has expired.");
    }

    // Set isVerified to true after successful OTP verification
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).send("OTP verified successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
};



// Function to handle user login and JWT token generation
exports.login = async (req, res) => {
  const { userId, email, password } = req.body;

  // Validate that password is provided
  if (!password) {
    return res.status(400).send("Password is required.");
  }

  try {
    // Find user by userId or email
    const user = await User.findOne({
      $or: [{ customUserId: userId }, { email: email }],
    });

    // If user not found
    if (!user) {
      return res.status(400).send("Invalid userId/email or password.");
    }

    // Check if user is verified
    if (!user.isVerified) {
      return res.status(403).send("User is not verified.");
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send("Invalid userId/email or password.");
    }

    // User authenticated successfully, generate a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Send response with the token
    res.status(200).json({ message: "Login successful", token: token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
};