const User = require("../models/User");
const bcrypt = require("bcrypt");
const transporter = require("../mailer"); // Your configured nodemailer transporter
const { generateUserId, generatePassword } = require("../utils/otp"); // Utility functions for generating user ID and password

const jwt = require("jsonwebtoken");


exports.register = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send("Email is required.");
  }

  try {
    let user = await User.findOne({ email });

    if (user) {
      if (!user.isVerified) {
        // If user exists but is not verified, resend a simple notification
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: user.email,
          subject: "Account Verification Reminder",
          text: "Your account is not yet verified. Please check your email for the OTP to complete the verification.",
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
            return res.status(500).send("Error sending email.");
          }
          return res.status(200).send("Verification reminder sent to your email.");
        });
      } else {
        return res.status(400).send("User already exists and is verified.");
      }
    } else {
      // Generate a 6-digit password and a custom user ID
      const password = generatePassword();
      const hashedPassword = await bcrypt.hash(password, 10);
      const customUserId = generateUserId();

      // Create a new user
      user = new User({
        email,
        password: hashedPassword,
        customUserId,
      });

      await user.save();

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Account Registration Details",
        text: `Your account has been created successfully.\nUser ID: ${customUserId}\nPassword: ${password}\n\nPlease keep this information safe.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          return res.status(500).send("Error sending email.");
        }
        res.status(200).send("Account registration details sent to your email.");
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
};




exports.login = async (req, res) => {
  const { userId, email, password } = req.body;

  if (!password) {
    return res.status(400).send("Password is required.");
  }

  try {
    // Find user by customUserId or email
    const user = await User.findOne({
      $or: [{ customUserId: userId }, { email }],
    });

    if (!user) {
      return res.status(400).send("Invalid userId/email or password.");
    }



    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send("Invalid userId/email or password.");
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
};
