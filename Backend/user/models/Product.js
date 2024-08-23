const reviewSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now },
  reviewerName: { type: String, required: true },
  reviewerEmail: { type: String, required: true },
});





// Main Product Schema
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  
  price: { type: Number, required: true },
  discountPercentage: { type: Number },
  rating: { type: Number, default: 0 },
  stock: { type: Number, required: true },
  tags: { type: [String], required: true },
  brand: { type: String },
  sku: { type: String, required: true },
  weight: { type: Number, required: true },

  warrantyInformation: { type: String },
  shippingInformation: { type: String, required: true },
  availabilityStatus: { type: String, required: true },
  reviews: { type: [reviewSchema] },
  returnPolicy: { type: String, required: true },
  minimumOrderQuantity: { type: Number, required: true },
 
  images: { type: [String], required: false }, // Array of image URLs
  thumbnail: { type: String, required: false }, // Single thumbnail image URL

}, { timestamps: true }); // Adds createdAt and updatedAt automatically

const Product = mongoose.model("Product", productSchema);

module.exports = Product;