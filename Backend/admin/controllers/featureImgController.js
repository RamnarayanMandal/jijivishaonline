const multer = require("multer");
const path = require("path");
const FeaturedImg = require("../models/featuredImg");
const fs = require("fs");

// Initialize multer with storage configuration
const upload = require("../../modules/fileModule");

exports.uploadFiles = upload.fields([{ name: "images", maxCount: 1 }]);

exports.createFeaturedImg = async (req, res) => {
  try {
    const { images } = req.files;

    if (!images) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // Save the file paths to the database
    const imagePaths = images.map((file) => file.path);
    const featuredImg = new FeaturedImg({ images: imagePaths });
    await featuredImg.save();

    res.status(201).json({ message: "Featured images uploaded successfully", featuredImg });
  } catch (error) {
    res.status(500).json({ message: "Error uploading images", error });
  }
};


exports.getFeaturedImages = async (req, res) => {
    try {
      // Fetch all featured images from the database
      const featuredImages = await FeaturedImg.find({});
  
      // Check if images exist
      if (!featuredImages || featuredImages.length === 0) {
        return res.status(404).json({ message: "No featured images found" });
      }
  
      // Respond with the retrieved featured images
      res.status(200).json({ success: true, data: featuredImages });
    } catch (error) {
      res.status(500).json({ message: "Error getting featured images", error });
    }
  };
  

  exports.deleteFeaturedImage = async (req, res) => {
    try {
      // Find the featured image by its ID
      const featuredImage = await FeaturedImg.findById(req.params.id);
  
      // Check if the image exists
      if (!featuredImage) {
        return res.status(404).json({ message: "Featured image not found" });
      }
  
      // Delete the image files from the server
      featuredImage.images.forEach((imagePath) => {
        fs.unlinkSync(path.join(__dirname, "..", "..", "uploads", imagePath));
      });
  
      // Delete the featured image from the database
      await featuredImage.remove();
  
      res.status(200).json({ message: "Featured image deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting featured image", error });
    }
};