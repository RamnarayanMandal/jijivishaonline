import React from "react";
import ImageGallery from "./ImageGallery";
import ProductInfo from "./ProductInfo";
import ProductDetails from "./ProductDetails";
import { RecentlyViewedProduct } from "../RecentlyViewedProduct";

const ProductPage = ({ product }) => {
  const images = [
    "/path/to/image1.jpg",
    "/path/to/image2.jpg",
    "/path/to/image3.jpg",
    // Add more image paths
  ];

  return (
    <div className="container mx-auto p-4 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:px-[6%]">
        <ImageGallery product={product} />
        <div>
          <ProductInfo product={product} />
          <ProductDetails product={product} />
        </div>
      </div>
      <div className="mt-10 bg-[#f4f1e9] lg:px-[6%]">
      <RecentlyViewedProduct subcategory={product.subcategory}/>
      </div>
    </div>
  );
};

export default ProductPage;
