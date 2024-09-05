const mongoose = require("mongoose");
const crypto = require("crypto");

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },

  password: { type: String, required: true },
  otp: { type: String },
  otpExpires: { type: Date },
  isVerified: { type: Boolean, default: false },
});

// Generate OTP method
adminSchema.methods.generateOtp = function () {
  const otp = crypto.randomInt(100000, 999999).toString(); // Generate a 6-digit OTP
  this.otp = otp;
  this.otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
  return otp;
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
