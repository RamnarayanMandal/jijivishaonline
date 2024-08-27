const multer = require("multer");
const path = require("path");
const Product = require("../models/product");
const fs = require("fs");

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the folder to save the uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to avoid filename conflicts
  },
});

// Initialize multer with storage configuration
const upload = multer({ storage: storage });

// Controller to create a product
exports.createProduct = async (req, res) => {
  try {
    // Check if the necessary files are uploaded
    const { thumbnail, images } = req.files;

    // Extract product details from request body
    const {
      title,
      price,
      discount,
      productCode,
      description,
      category,
      subcategory,
      typeOfProduct,
      size,
      quantity,
      inStock,
      productdescriptions,
      color,
      typeOfPrinting,
      fabric,
      additionalInfo1,
      additionalInfo2,
      countryOfOrigin,
      marketedBy,
      note,
      materialCare,
      disclaimer,
      shippingInfo,
      productreviews,
    } = req.body;

    // Check if a product with the same productCode exists (if applicable)
    const existingProduct = await Product.findOne({ productCode });

    if (existingProduct) {
      // If you want to replace the product images
      const imagePaths = [existingProduct.thumbnail, ...existingProduct.images];
      imagePaths.forEach((imagePath) => {
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath); // Delete the existing images from the file system
        }
      });

      // Delete the existing product document from the database (if necessary)
      await Product.deleteOne({ _id: existingProduct._id });
    }

    // Create a new product entry with the new file paths and details
    const newProduct = new Product({
      thumbnail: thumbnail[0].path,
      images: images.map((file) => file.path),
      title,
      price,
      discount,
      productCode,
      description,
      category,
      subcategory,
      typeOfProduct,
      size,
      quantity,
      inStock,
      productdescriptions,
      color,
      typeOfPrinting,
      fabric,
      additionalInfo1,
      additionalInfo2,
      countryOfOrigin,
      marketedBy,
      note,
      materialCare,
      disclaimer,
      shippingInfo,
      productreviews,
    });

    // Save the new product to the database
    await newProduct.save();

    res.status(201).json({
      message: "Product created and images uploaded successfully",
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create product", error });
  }
};

// Middleware to handle file uploads
exports.uploadFiles = upload.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "images", maxCount: 10 },
]);
