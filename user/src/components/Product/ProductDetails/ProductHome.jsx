import React, { useEffect, useState } from "react";
import ProductPage from "./ProductPage";
import { useParams } from "react-router-dom";
import axios from "axios";

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
    </div>
  );
};

export default ProductHome;
