const mongoose = require("mongoose");

const featuredImgSchema = new mongoose.Schema(
  {
    images: { type: [String] }, // Array of strings to store multiple image paths
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const FeaturedImg = mongoose.model("FeaturedImg", featuredImgSchema);
module.exports = FeaturedImg;
