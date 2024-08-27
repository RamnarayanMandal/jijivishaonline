const express = require('express');
// const productController = require('../controllers/productController'); // Adjust path as necessary

const { createProduct, uploadFiles } = require("../controllers/productController");
const router = express.Router();


// Route to handle product creation
router.post("/products", uploadFiles, createProduct);


module.exports = router;