const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  date: { type: Date, required: true },
  reviewerName: { type: String, required: true },
  reviewerEmail: { type: String, required: true },
});

const dimensionsSchema = new mongoose.Schema({
  width: { type: Number },
  height: { type: Number },
});

const productSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  mimetype: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: [String] },
  price: { type: Number, required: true },
  discountPercentage: { type: Number },
  rating: { type: Number },

  brand: { type: String },

  dimensions: { type: dimensionsSchema },

  reviews: { type: [reviewSchema] },

  VendorUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VendorUser",
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
