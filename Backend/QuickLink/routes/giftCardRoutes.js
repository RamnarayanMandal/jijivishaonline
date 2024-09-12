const express = require("express");

const router = express.Router();

const { uploadGiftCard } = require("../controller/giftCardsController");

router.post("/giftCards", uploadGiftCard);

module.exports = router;
