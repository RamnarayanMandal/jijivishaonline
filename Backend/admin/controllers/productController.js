const multer = require("multer");
const path = require("path");
const Product = require("../models/product");
const fs = require("fs");

// Initialize multer with storage configuration
const upload = require("../../modules/fileModule");

// Controller to create a product
exports.uploadFiles = upload.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "images", maxCount: 10 },
]);

exports.createProduct = async (req, res) => {
  try {
    // Check if the necessary files are uploaded
    const { thumbnail, images } = req.files;

    console.log(thumbnail, images);

    if (!thumbnail || !images) {
      return res.status(400).json({ message: "Required files are missing" });
    }

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

    // Validate required fields
    if (!title || !price || !productCode) {
      return res
        .status(400)
        .json({ message: "Title, price, and product code are required" });
    }

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
      size: size ? size.split(",") : [], // Handle array input
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
      materialCare: materialCare ? materialCare.split(",") : [], // Handle array input
      disclaimer,
      shippingInfo: shippingInfo ? shippingInfo.split(",") : [], // Handle array input
      productreviews: productreviews ? JSON.parse(productreviews) : [], // Parse JSON if necessary
    });

    // Save the new product to the database
    await newProduct.save();

    res.status(201).json({
      message: "Product created and images uploaded successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error); // Improved error logging
    res
      .status(500)
      .json({ message: "Failed to create product", error: error.message });
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

    console.log(
      title,
      quantity,
      typeOfPrinting,
      productdescriptions,
      color,
      typeOfPrinting
    );

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
        const fullPath = path.join(__dirname, "..", imagePath); // Adjust path if needed
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
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
    console.error("Error updating product:", error.message); // Log the error for debugging
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
          firstProduct: { $first: "$$ROOT" }, // Get the first product document in each group
        },
      },
      {
        $project: {
          _id: "$firstProduct._id",
          thumbnail: "$firstProduct.thumbnail",
          subcategory: "$_id", // Use the grouped subcategory
          title: "$firstProduct.title", // Get the title from the first product
        },
      },
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
          firstProduct: { $first: "$$ROOT" }, // Get the first product document in each group
        },
      },
      {
        $project: {
          _id: "$firstProduct._id", // Use the product ID of the first product in each category
          thumbnail: "$firstProduct.thumbnail", // Get the thumbnail from the first product
          category: "$_id", // Use the grouped category
          title: "$firstProduct.title", // Get the title from the first product
        },
      },
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
};

exports.getCategoriesWithSubcategories = async (req, res) => {
  try {
    // Aggregation pipeline to group by category and collect unique subcategories
    const result = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          subcategories: { $addToSet: "$subcategory" },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          subcategories: 1,
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching categories and subcategories:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.postReview = async (req, res) => {
  try {
    const { username, email, rating, description, userId, productId } =
      req.body;

    // Find the product by ID
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if user already reviewed the product
    const existingReview = product.productreviews.find(
      (review) => review.email === email
    );
    if (existingReview) {
      return res.status(400).json({ message: "Review already exists" });
    }

    // Create a new review
    const newReview = {
      username,
      email,
      userId,
      rating,
      description,
      date: new Date(),
    };

    // Add new review to product reviews array
    product.productreviews.push(newReview);

    // Save the product with the new review
    await product.save();

    // Recalculate the product's average rating
    const totalReviews = product.productreviews.length;
    const totalRating = product.productreviews.reduce(
      (acc, review) => acc + review.rating,
      0
    );
    const updatedRating = totalRating / totalReviews;

    // Update the product rating and save
    product.rating = updatedRating;
    await product.save();

    // Send back the updated reviews list
    res.status(201).json(product.productreviews);
  } catch (error) {
    console.error("Error posting review:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.getAverageRating = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const totalReviews = product.productreviews.length;
    const totalRating = product.productreviews.reduce(
      (acc, review) => acc + review.rating,
      0
    );
    const averageRating = totalRating / totalReviews;
    res.status(200).json({ averageRating });
  } catch (error) {
    console.error("Error getting average rating:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.getTopRatedProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const skip = parseInt(req.query.skip) || 0;

    const products = await Product.find()
      .sort({ rating: -1 }) // Sort by rating in descending order
      .limit(limit)
      .skip(skip)
      .exec(); // Properly chaining exec

    res.status(200).json(products);
  } catch (error) {
    console.error("Error getting top rated products:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    // Find the product by its ID
    const product = await Product.findById(productId);

    // Check if the product exists
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Return the product reviews
    res.status(200).json(product.productreviews);
  } catch (error) {
    console.error("Error fetching product reviews:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.deleteProductReview = async (req, res) => {
  try {
    const { productId, reviewId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const reviewIndex = product.productreviews.findIndex(
      (review) => review._id.toString() === reviewId
    );
    if (reviewIndex === -1) {
      return res.status(404).json({ message: "Review not found" });
    }
    product.productreviews.splice(reviewIndex, 1);
    await product.save();
    res.status(204).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting product review:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.searchProduct = async (req, res) => {
  try {
    const { searchTerm } = req.query;

    if (!searchTerm) {
      return res.status(400).json({ message: "Search term is required" });
    }

    // Use MongoDB's $or operator to search in multiple fields
    const filteredProducts = await Product.find({
      $or: [
        { title: { $regex: searchTerm, $options: "i" } }, // 'i' for case-insensitive
        { category: { $regex: searchTerm, $options: "i" } },
        { subcategory: { $regex: searchTerm, $options: "i" } },
      ],
    });

    if (filteredProducts.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.json(filteredProducts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
