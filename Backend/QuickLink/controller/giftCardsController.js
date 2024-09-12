const upload = require("../../modules/fileModule"); // Assuming `fileModule` is configured properly with multer
const GiftCards = require("../models/giftCardsModels");
const multer = require("multer");

// Controller to upload gift card
const uploadGiftCard = (req, res) => {
  upload.single("file")(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      // Handle multer-specific errors
      return res.status(400).json({ message: "Multer error: " + err.message });
    } else if (err) {
      // Handle other errors
      return res.status(500).json({ message: "Unknown error: " + err.message });
    }

    try {
      const { price } = req.body;

      // Validate price
      if (!price || isNaN(price) || price <= 0) {
        return res.status(400).json({ message: "Invalid price provided." });
      }

      // Ensure a file was uploaded
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
      }

      // Create and save new gift card to the database
      const newGiftCard = new GiftCards({
        image: req.file.filename, // Store the uploaded filename
        price: parseFloat(price), // Convert price to a number
      });

      await newGiftCard.save();

      // Build the file URL
      const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

      // Send success response
      res.status(201).json({
        message: "Gift card uploaded successfully.",
        giftCard: newGiftCard,
        imageUrl: fileUrl,
      });
    } catch (error) {
      // Handle server errors
      res.status(500).json({ message: "Server error: " + error.message });
    }
  });
};

// Controller to get all gift cards
const getAllGiftCards = async (req, res) => {
  try {
    const giftCards = await GiftCards.find(); // Fetch all gift cards
    res.status(200).json({ giftCards });
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

const updateGiftCard = (req, res) => {
  upload.single("file")(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      // Handle multer-specific errors
      return res.status(400).json({ message: "Multer error: " + err.message });
    } else if (err) {
      // Handle other errors
      return res.status(500).json({ message: "Unknown error: " + err.message });
    }

    try {
      const { id } = req.params;
      const { price } = req.body;

      // Validate price
      if (!price || isNaN(price) || price <= 0) {
        return res.status(400).json({ message: "Invalid price provided." });
      }

      // Find the gift card by ID
      const giftCard = await GiftCards.findById(id);
      if (!giftCard) {
        return res.status(404).json({ message: "Gift card not found." });
      }

      // Update the gift card details
      giftCard.price = parseFloat(price);
      if (req.file) {
        // Delete the old image file if a new one is uploaded
        // (Add your logic to delete the old image file from the file system if necessary)
        giftCard.image = req.file.filename;
      }

      await giftCard.save();

      // Build the file URL if image is updated
      const fileUrl = req.file ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}` : undefined;

      // Send success response
      res.status(200).json({
        message: "Gift card updated successfully.",
        giftCard,
        imageUrl: fileUrl,
      });
    } catch (error) {
      // Handle server errors
      res.status(500).json({ message: "Server error: " + error.message });
    }
  });
};


const deleteGiftCard = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the gift card by ID
    const giftCard = await GiftCards.findById(id);
    if (!giftCard) {
      return res.status(404).json({ message: "Gift card not found." });
    }

    // Delete the gift card from the database
    await GiftCards.findByIdAndDelete(id);

    // Delete the image file from the file system (if applicable)
    if (giftCard.image) {
      const imagePath = path.join('uploads', giftCard.image);
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Error deleting image file:", err);
      });
    }

    // Send success response
    res.status(200).json({ message: "Gift card deleted successfully." });
  } catch (error) {
    // Handle server errors
    res.status(500).json({ message: "Server error: " + error.message });
  }
};


module.exports = { uploadGiftCard,getAllGiftCards,updateGiftCard , deleteGiftCard };
