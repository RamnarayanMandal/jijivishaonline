const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Define the Address schema
const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  postalCode: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String },
  addressType: { type: String, required: true },
  location: {
    lat: Number,
    lng: Number,
  },
});

// Define the Cart Item schema
const cartItemSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  discountPercentage: { type: Number },
  attributes: {
    size: { type: String },
    color: { type: String },
  },
});

// Define the User schema
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String },
  customUserId:{ type: String},
  
  isVerified: { type: Boolean, default: false },
  mobileNumber: { type: String, unique: true },
  name: { type: String },
  lastName: { type: String },
  phone: { type: String },
  location: { type: String },
  addresses: [addressSchema],
  cart: [cartItemSchema],
  wallet: { type: Number, default: 0 },
  security: { type: Boolean, default: true },
  otp: { type: String }, // Field for OTP
  otpExpires: { type: Date }, // Field for OTP expiry
});

// Method to generate OTP and set its expiry
userSchema.methods.generateOtp = function () {
  const otp = crypto.randomInt(100000, 999999).toString();
  this.otp = otp;
  this.otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
  return otp;
};

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
