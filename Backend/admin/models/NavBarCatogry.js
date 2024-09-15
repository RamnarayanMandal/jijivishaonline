const mongoose = require('mongoose');

// Subcategory schema
const SubcategorySchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of subcategory (e.g., "Kurta Sets")
  types: { type: [String], required: true } // Types within subcategory (e.g., "Cotton Kurta", "Silk Kurta", etc.)
});

// Category schema
const CategorySchema = new mongoose.Schema({
  category: { type: String, required: true }, // Category name (e.g., "Women")
  subCategory: { type: String, required: true }, // Subcategory name (e.g., "Apparel")
  subCategoryData: { type: [SubcategorySchema], default: [] } // Subcategory types (e.g., "Kurta Sets", "Sarees")
});

// Export the model
module.exports = mongoose.model('navbarCatogry', CategorySchema);
