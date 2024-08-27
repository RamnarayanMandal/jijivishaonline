const multer = require("multer");
const path = require("path");
const Banner = require("../models/banner");
const fs = require("fs");
// Set up Multer storage options

// note : - Its only one time upload banner if upload again first we delete banner after upload again banner
exports.uploadBanner = async (req, res) => {
  try {
    // Check if a banner already exists
    const existingBanner = await Banner.findOne();

    if (existingBanner) {
      // Delete the existing banner files from the file system
      const banners = [
        existingBanner.banner1,
        existingBanner.banner2,
        existingBanner.banner3,
        existingBanner.banner4,
      ];
      banners.forEach((bannerPath) => {
        if (fs.existsSync(bannerPath)) {
          fs.unlinkSync(bannerPath);
        }
      });

      // Delete the existing banner document from the database
      await Banner.deleteOne({ _id: existingBanner._id });
    }

    // Ensure all files are uploaded
    const { banner1, banner2, banner3, banner4 } = req.files;

    // Create a new banner entry with the new file paths
    const newBanner = new Banner({
      banner1: banner1[0].path,
      banner2: banner2[0].path,
      banner3: banner3[0].path,
      banner4: banner4[0].path,
    });

    // Save to the database
    await newBanner.save();

    res
      .status(201)
      .json({ message: "Banners uploaded successfully", banner: newBanner });
  } catch (error) {
    res.status(500).json({ message: "Failed to upload banners", error });
  }
};

// Controller to get all banners
exports.getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find(); // Retrieve all banners from the database
    res.status(200).json({ success: true, data: banners });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve banners", error });
  }
};

//// Controller to delete all banners
exports.deleteBanner = async (req, res) => {
  try {
    // Check if a banner exists
    const existingBanner = await Banner.findOne();

    if (!existingBanner) {
      return res.status(404).json({ message: "No banner found to delete" });
    }

    // Delete the banner files from the file system
    const banners = [
      existingBanner.banner1,
      existingBanner.banner2,
      existingBanner.banner3,
      existingBanner.banner4,
    ];
    banners.forEach((bannerPath) => {
      if (fs.existsSync(bannerPath)) {
        fs.unlinkSync(bannerPath);
      }
    });

    // Delete the banner document from the database
    await Banner.deleteOne({ _id: existingBanner._id });

    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete banner", error });
  }
};
