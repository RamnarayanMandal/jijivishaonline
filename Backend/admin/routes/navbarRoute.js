const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/navbarController');

// Route to get all categories
router.get('/categories', categoryController.getAllCategories);

// Route to create a new category
router.post('/categories', categoryController.createCategory);

// Route to update a category
router.put('/categories/:id', categoryController.updateCategory);

// Route to delete a category
router.delete('/categories/:id', categoryController.deleteCategory);

module.exports = router;
