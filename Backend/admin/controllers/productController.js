const multer = require("multer");
const path = require("path");
const Product = require("../models/product");
const fs = require("fs");

// Initialize multer with storage configuration
const upload = require("../../modules/fileModule");

// Middleware to handle file uploads
exports.uploadFiles = upload.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "images", maxCount: 10 },
]);

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

// Controller to get all products
exports.getAllProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();

    // Return the fetched products with a success message
    res.status(200).json({
      success: true,
      message: "All products retrieved successfully",
      products,
    });
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({
      success: false,
      message: "Failed to retrieve products",
      error: error.message,
    });
  }
};

// Controller to get a product by its ID
exports.getProductById = async (req, res) => {
  try {
    // Extract the product ID from the request parameters
    const { id } = req.params;

    // Find the product by its ID
    const product = await Product.findById(id); // Use the extracted 'id'

    // Check if the product was found
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Return the found product with a success message
    res.status(200).json({
      success: true,
      message: "Product retrieved successfully",
      product,
    });
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({
      success: false,
      message: "Failed to retrieve product",
      error: error.message,
    });
  }
};

exports.deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the product by ID
    const product = await Product.findById(id);
    console.log(product);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Delete product images from the file system
    const imagePaths = [product.thumbnail, ...product.images];
    imagePaths.forEach((imagePath) => {
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    });

    // Delete the product from the database
    await Product.deleteOne({ _id: id });

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: error.message,
    });
  }
};

// Controller to update a product by its ID
exports.updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const { thumbnail, images } = req.files || {};

    // Extract updated product details from request body
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

    // Find the product by ID
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // If new images are uploaded, delete the old ones
    if (thumbnail || images) {
      const oldImagePaths = [product.thumbnail, ...product.images];
      oldImagePaths.forEach((imagePath) => {
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      });
    }

    // Update the product details
    product.thumbnail = thumbnail ? thumbnail[0].path : product.thumbnail;
    product.images = images ? images.map((file) => file.path) : product.images;
    product.title = title || product.title;
    product.price = price || product.price;
    product.discount = discount || product.discount;
    product.productCode = productCode || product.productCode;
    product.description = description || product.description;
    product.category = category || product.category;
    product.subcategory = subcategory || product.subcategory;
    product.typeOfProduct = typeOfProduct || product.typeOfProduct;
    product.size = size || product.size;
    product.quantity = quantity || product.quantity;
    product.inStock = inStock || product.inStock;
    product.productdescriptions =
      productdescriptions || product.productdescriptions;
    product.color = color || product.color;
    product.typeOfPrinting = typeOfPrinting || product.typeOfPrinting;
    product.fabric = fabric || product.fabric;
    product.additionalInfo1 = additionalInfo1 || product.additionalInfo1;
    product.additionalInfo2 = additionalInfo2 || product.additionalInfo2;
    product.countryOfOrigin = countryOfOrigin || product.countryOfOrigin;
    product.marketedBy = marketedBy || product.marketedBy;
    product.note = note || product.note;
    product.materialCare = materialCare || product.materialCare;
    product.disclaimer = disclaimer || product.disclaimer;
    product.shippingInfo = shippingInfo || product.shippingInfo;
    product.productreviews = productreviews || product.productreviews;

    // Save the updated product to the database
    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: error.message,
    });
  }
};

exports.lastedProduct = async (req, res) => {
  try {
    // Fetch products sorted by 'createdAt' in descending order, limit to 1 to get the latest product
    const latestProduct = await Product.find().sort({ createdAt: -1 });

    if (latestProduct) {
      res.status(200).json({
        success: true,
        message: "Latest product retrieved successfully",
        product: latestProduct,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No products found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve the latest product",
      error: error.message,
    });
  }
};

  
  exports.getAllsubcategorysByProduct = async (req, res) => {
    try {
      // Aggregate to group products by subcategory
      const productsBySubcategory = await Product.aggregate([
        {
          $group: {
            _id: "$subcategory", // Group by subcategory
            firstProduct: { $first: "$$ROOT" } // Get the first product document in each group
          }
        },
        {
          $project: {
            _id: "$firstProduct._id",
            thumbnail: "$firstProduct.thumbnail",
            subcategory: "$_id", // Use the grouped subcategory
            title: "$firstProduct.title" // Get the title from the first product
          }
        }
      ]);
  
      res.status(200).json({
        success: true,
        message: "Products retrieved successfully for each unique subcategory",
        productsBySubcategory,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve products by subcategory",
        error: error.message,
      });
    }
  };
  
  

  exports.getAllcategorysByProduct = async (req, res) => {
    try {
      // Aggregate to group products by category
      const productsByCategory = await Product.aggregate([
        {
          $group: {
            _id: "$category", // Group by category
            firstProduct: { $first: "$$ROOT" } // Get the first product document in each group
          }
        },
        {
          $project: {
            _id: "$firstProduct._id", // Use the product ID of the first product in each category
            thumbnail: "$firstProduct.thumbnail", // Get the thumbnail from the first product
            category: "$_id", // Use the grouped category
            title: "$firstProduct.title" // Get the title from the first product
          }
        }
      ]);
  
      res.status(200).json({
        success: true,
        message: "Products retrieved successfully for each unique category",
        productsByCategory,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve products by category",
        error: error.message,
      });
    }
  };
  


exports.getProductByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const productsByCategory = await Product.find({ category });

    res.status(200).json({
      success: true,
      message: "Products retrieved successfully for the given category",
      productsByCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve products by category",
      error: error.message,
    });
  }
};


exports.getProductBySubcategory = async (req, res) => {
  try {
    const { subcategory } = req.params;
    const productsBySubcategory = await Product.find({ subcategory });
    res.status(200).json({
      success: true,
      message: "Products retrieved successfully for the given subcategory",
      productsBySubcategory,
    });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve products by subcategory",
        error: error.message,
      });
    }
}  



