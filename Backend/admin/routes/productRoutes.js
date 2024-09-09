const express = require("express");
const productController = require("../controllers/productController"); // Adjust path as necessary

const {
  createProduct,
  uploadFiles,
} = require("../controllers/productController");
const router = express.Router();


router.get("/categories", productController.getCategoriesWithSubcategories);
// Route to handle product creation
router.post("/products", uploadFiles, createProduct);

// Route to get all products
router.get("/getAllproducts", productController.getAllProducts);

// Route to get a product by its ID
router.get("/products/:id", productController.getProductById);

// Route to get a product by its ID
router.delete("/deleteproduct/:id", productController.deleteProductById);

router.put("/product/:id",uploadFiles, productController.updateProductById);

router.get("/lastedproducts", productController.lastedProduct)

router.get("/getAllSubcategory", productController.getAllsubcategorysByProduct)

router.get("/getAllCategory", productController.getAllcategorysByProduct)

router.get("/getProductByCatogry/:category", productController.getProductByCategory)

router.get("/getProductBySubcategory/:subcategory", productController.getProductBySubcategory)

router.get("/postReview",productController.postReview)

router.get("/getaverage/:productId", productController.getAverageRating)

router.get("/getProductReview/:productId",productController.getProductReviews)

router.delete("/deleteProductReview/:productId/:reviewId")



module.exports = router;
