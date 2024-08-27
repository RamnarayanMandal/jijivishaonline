const express = require("express");
const router = express.Router();
const upload = require("../../modules/fileModule");
const bannerController = require("../controllers/bannerController");

// Handle multiple file uploads (4 banners)
router.post(
  "/upload-banner",
  upload.fields([
    { name: "banner1", maxCount: 1 },
    { name: "banner2", maxCount: 1 },
    { name: "banner3", maxCount: 1 },
    { name: "banner4", maxCount: 1 },
  ]),
  bannerController.uploadBanner
);

// Route to get all banners
router.get("/get-all-banners", bannerController.getAllBanners);

// Route to delete the banner
router.delete("/delete-banner", bannerController.deleteBanner);

module.exports = router;
