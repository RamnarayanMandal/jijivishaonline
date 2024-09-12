const upload = require("../../modules/fileModule");
const File = require("../models/giftCardsModels");

const multer = require("multer");

const fs = require("fs");
const path = require("path");

const uploadGiftCard = (req, res, next) => {
  upload.single("file")(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).send(err.message);
    } else if (err) {
      return res.status(500).send("An unknown error occurred.");
    }

    try {
      const { price } = req.body;

      // Check if the price is valid
      if (isNaN(price) || price <= 0) {
        return res.status(400).send("Invalid price provided.");
      }

      // Save new gift card to the database
      const newGiftCard = new GiftCards({
        image: req.file.filename, // Save filename or URL
        price: parseFloat(price), // Ensure price is a number
      });

      await newGiftCard.save();

      const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
      res.status(201).json({
        message: "Upload successful",
        giftCard: newGiftCard,
        imageUrl: fileUrl,
      });
    } catch (error) {
      res.status(500).send("Error handling file upload: " + error.message);
    }
  });
};

module.exports = { uploadGiftCard };
