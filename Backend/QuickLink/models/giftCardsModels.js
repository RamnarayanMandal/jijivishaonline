const mongoose = require("mongoose");

const giftCardsSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  price: {
    type: Number,
  },
});

const GiftCards = mongoose.model("giftCards", giftCardsSchema);

module.exports = GiftCards;
