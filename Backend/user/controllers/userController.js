const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const transporter = require("../mailer");
const jwt = require("jsonwebtoken");
// Helper function to generate a custom user ID
const {
  generateUserId,
  generateOtp,
  generatePassword,
} = require("../utils/otp");

exports.register = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send("Email is required.");
  }

  try {
    let user = await User.findOne({ email });

    if (user) {
      if (!user.isVerified) {
        // If user exists but is not verified, resend OTP
        const otp = generateOtp();
        user.otp = otp;
        user.otpExpires = Date.now() + 15 * 60 * 1000; // OTP valid for 15 minutes
        await user.save();

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: user.email,
          subject: "Resend OTP for account verification",
          text: `Your OTP is ${otp}.`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
            return res.status(500).send("Error sending email.");
          }
          return res.status(200).send("OTP resent to your email.");
        });
      } else {
        return res.status(400).send("User already exists and is verified.");
      }
    } else {
      // Generate a 6-digit password
      const password = generatePassword();
      const hashedPassword = await bcrypt.hash(password, 10);

      // Generate a custom user ID
      const customUserId = generateUserId();

      // Create a new user with OTP
      const otp = generateOtp();
      user = new User({
        email,
        password: hashedPassword,
        customUserId,
        otp,
        otpExpires: Date.now() + 15 * 60 * 1000, // OTP valid for 15 minutes
      });

      await user.save();

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Your account verification details",
        text: `Your OTP is ${otp}. Your user ID is: ${customUserId}. Your password is: ${password}.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          return res.status(500).send("Error sending email.");
        }
        res
          .status(200)
          .send("Account verification details sent to your email.");
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
};

// 2. Verify OTP
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

// 3. User Login

exports.login = async (req, res) => {
  const { userId, email, password } = req.body;

  if (!password) {
    return res.status(400).send("Password is required.");
  }

  try {
    const user = await User.findOne({
      $or: [{ customUserId: userId }, { email }],
    });

    if (!user) {
      return res.status(400).send("Invalid userId/email or password.");
    }

    if (!user.isVerified) {
      return res.status(403).send("User is not verified.");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send("Invalid userId/email or password.");
    }

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

// 4. Request OTP for Password Reset

exports.requestOtpForReset = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send("Email is required.");
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User not found.");
    }

    const otp = generateOtp();
    user.otp = otp;
    user.otpExpires = Date.now() + 15 * 60 * 1000; // OTP valid for 15 minutes
    await user.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).send("Error sending OTP email.");
      }
      res.status(200).send("OTP sent to your email.");
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
};

// 5. Reset Password

exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  // Validate input
  if (!email || !otp || !newPassword) {
    return res.status(400).send("Email, OTP, and new password are required.");
  }

  try {
    // Find user by email and OTP
    const user = await User.findOne({ email, otp });

    // Check if user exists and OTP is valid
    if (!user) {
      return res.status(400).send("Invalid OTP or email.");
    }

    // Check if the OTP has expired
    if (user.otpExpires < Date.now()) {
      return res.status(400).send("OTP has expired.");
    }

    // Hash the new password and update the user
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    // Clear OTP and OTP expiry fields
    user.otp = undefined;
    user.otpExpires = undefined;

    // Save the updated user document
    await user.save();

    res.status(200).send("Password has been reset successfully.");
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).send("Internal server error.");
  }
};
