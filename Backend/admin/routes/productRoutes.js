const express = require("express");
const productController = require("../controllers/productController"); // Adjust path as necessary

const {
  createProduct,
  uploadFiles,
} = require("../controllers/productController");
const router = express.Router();

// Route to handle product creation
router.post("/products", uploadFiles, createProduct);

// Route to get all products
router.get("/getAllproducts", productController.getAllProducts);

// Route to get a product by its ID
router.get("/products/:id", productController.getProductById);

// Route to get a product by its ID
router.delete("/deleteproduct/:id", productController.deleteProductById);

router.put("/product/:id", productController.updateProductById);
module.exports = router;
