const mongoose = require("mongoose");

// Gift card schema
const giftCardsSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true, // Image is required
  },
  price: {
    type: Number,
    required: true, // Price is required
    min: 0, // Price should be greater than 0
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Gift card model
const GiftCards = mongoose.model("GiftCards", giftCardsSchema); // Use a capitalized singular name for models

module.exports = GiftCards;
