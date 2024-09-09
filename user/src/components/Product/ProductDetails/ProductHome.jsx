import React, { useEffect, useState } from "react";
import ProductPage from "./ProductPage";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReviewComponent from "../../ReviewComponent";
import { RecentlyViewedProduct } from "../RecentlyViewedProduct";

const ProductHome = () => {
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const { id } = useParams();

  const URI = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${URI}api/admin/products/${id}`);
        setProduct(response.data.product);
        setSelectedImage(response.data.product.thumbnail); // Set default selected image
      } catch (error) {
        console.error("Error fetching the product:", error);
      }
    };

    fetchProduct();
  }, [id, URI]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ProductPage product={product} />
      <div className="mt-10 py-5 bg-[#f4f1e9] lg:px-[6%]">
      <h1 className="lg:text-4xl text-2xl text-center font-semibold text-gray-800 mb-6">
      Recently Viewed
      </h1>
        <RecentlyViewedProduct subcategory={product.subcategory} />
      </div>
       <div className="lg:px-[6%]">
        <ReviewComponent productId={product.id} />
       </div>
    </div>
  );
};

export default ProductHome;
