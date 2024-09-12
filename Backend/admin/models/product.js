const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    thumbnail: { type: String },
    images: { type: [String] }, // An array of strings

    title: { type: String },
    price: { type: Number, default: 0 },
    discount: { type: Number },
    productCode: { type: String },
    description: { type: String },
    category: { type: String },
    subcategory: { type: String },
    typeOfProduct: { type: String },
    size: { type: [String] }, // An array of strings
    quantity: { type: Number },
    inStock: { type: Number },
    productdescriptions: { type: String },
    color: [{type: String}]  ,
    typeOfPrinting: { type: String },
    fabric: { type: String },
    additionalInfo1: { type: String },
    additionalInfo2: { type: String },
    countryOfOrigin: { type: String },
    marketedBy: { type: String },
    note: { type: String },
    materialCare: { type: [String] }, // An array of strings
    disclaimer: { type: String },
    shippingInfo: { type: [String] }, // An array of strings

    productreviews: [
      {
        username: { type: String },
        userId: { type: String },
        email: { type: String },
        date: { type: Date },
        rating: { type: Number },
        description: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
