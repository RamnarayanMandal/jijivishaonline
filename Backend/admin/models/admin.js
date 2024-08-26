const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Define the Admin schema
const adminSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String },
  isVerified: { type: Boolean, default: false },
  name: { type: String },
  lastName: { type: String },
  phone: { type: String },
  otp: { type: String },
  otpExpires: { type: Date },
});

// Method to generate OTP and set its expiry
adminSchema.methods.generateOtp = function () {
  const otp = crypto.randomInt(100000, 999999).toString();
  this.otp = otp;
  this.otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
  return otp;
};

// Method to hash the password before saving
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Create the Admin model
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
