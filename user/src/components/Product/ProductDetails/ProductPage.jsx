import React from "react";
import ImageGallery from "./ImageGallery";
import ProductInfo from "./ProductInfo";
import ProductDetails from "./ProductDetails";

const ProductPage = ({ product }) => {
  const images = [
    "/path/to/image1.jpg",
    "/path/to/image2.jpg",
    "/path/to/image3.jpg",
    // Add more image paths
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ImageGallery product={product} />
        <div>
          <ProductInfo product={product} />
          <ProductDetails product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
