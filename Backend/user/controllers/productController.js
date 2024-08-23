// controllers/productController.js
const Product = require("../models/Product");


exports.createProduct = async (req, res) => {
  upload.fields([{ name: "images", maxCount: 10 }, { name: "thumbnail", maxCount: 1 }])(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: "An unknown error occurred." });
    }

    // Extract image URLs from the uploaded files
    const images = req.files["images"] ? req.files["images"].map(file => file.path) : [];
    const thumbnail = req.files["thumbnail"] ? req.files["thumbnail"][0].path : "";

    // Parse the dimensions from a string to an object
    let dimensions;
    try {
      dimensions = JSON.parse(req.body.dimensions);
    } catch (error) {
      return res.status(400).json({ error: "Invalid dimensions format. Please provide valid JSON." });
    }

    // Create a new product
    const productData = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      discountPercentage: req.body.discountPercentage,
      rating: req.body.rating,
      stock: req.body.stock,
      tags: req.body.tags.split(","), // Assuming tags are sent as a comma-separated string
      brand: req.body.brand,
      sku: req.body.sku,
      weight: req.body.weight,
 
      warrantyInformation: req.body.warrantyInformation,
      shippingInformation: req.body.shippingInformation,
      availabilityStatus: req.body.availabilityStatus,
      returnPolicy: req.body.returnPolicy,
      minimumOrderQuantity: req.body.minimumOrderQuantity,
      images: images,
      thumbnail: thumbnail,
      VendorUser: req.body.VendorUser,
    };

    try {
      const product = new Product(productData);
      await product.save();
      res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
      console.error("Error saving product data to the database:", error);
      res.status(500).json({ error: "Error saving product data to the database." });
    }
  });
};

