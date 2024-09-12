const express = require("express");
const router = express.Router();

const { uploadGiftCard, getAllGiftCards, updateGiftCard, deleteGiftCard } = require("../controller/giftCardsController");

// Route to upload (create) a new gift card
router.post("/giftCards", uploadGiftCard);

// Route to get all gift cards
router.get("/giftCards", getAllGiftCards);

// Route to update an existing gift card
router.put("/giftCards/:id", updateGiftCard);

// Route to delete an existing gift card
router.delete("/giftCards/:id", deleteGiftCard);

module.exports = router;
