const mongoose = require('mongoose');

// Subcategory schema
const SubcategorySchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of subcategory (e.g., "Kurta Sets")
  types: { type: [String], required: true } // Types within subcategory (e.g., "Cotton Kurta", "Silk Kurta", etc.)
});

// Category schema
const CategorySchema = new mongoose.Schema({
  category: { 
    type: String, 
    required: true,
    unique: true,
    lowercase: true, // Convert category to lowercase before saving
    trim: true // Remove leading and trailing whitespace from the category name
  }, // Category name (e.g., "Women")
  subCategory: { 
    type: String, 
    required: true,
    lowercase: true, // Convert subcategory to lowercase before saving
    trim: true // Remove leading and trailing whitespace from the subcategory name
  }, // Subcategory name (e.g., "Apparel")
  subCategoryData: { 
    type: [SubcategorySchema], 
    default: [] // Subcategory types (e.g., "Kurta Sets", "Sarees")
  }
});

// Convert subcategory names to lowercase before saving
SubcategorySchema.pre('save', function (next) {
  if (this.name) {
    this.name = this.name.toLowerCase();
  }
  this.types = this.types.map(type => type.toLowerCase());
  next();
});

// Convert category and subcategory data to lowercase before saving
CategorySchema.pre('save', function (next) {
  if (this.category) {
    this.category = this.category.toLowerCase();
  }
  if (this.subCategory) {
    this.subCategory = this.subCategory.toLowerCase();
  }
  this.subCategoryData.forEach(subcategory => {
    if (subcategory.name) {
      subcategory.name = subcategory.name.toLowerCase();
    }
    subcategory.types = subcategory.types.map(type => type.toLowerCase());
  });
  next();
});

// Export the model
module.exports = mongoose.model('navbarCategory', CategorySchema);
