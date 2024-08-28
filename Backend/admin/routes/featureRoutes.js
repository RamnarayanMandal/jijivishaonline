const express = require("express");
const router = express.Router();
const { createFeaturedImg, uploadFiles,getFeaturedImages,deleteFeaturedImage} = require("../controllers/featureImgController");

// Route to handle product creation
router.post("/featuredImg", uploadFiles, createFeaturedImg);
router.get("/featuredImg", getFeaturedImages);
router.delete("/featuredImg" ,deleteFeaturedImage);

module.exports = router;
