import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ProductDetails() {
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
    <div className="bg-white p-6">
      <div className="flex flex-col-reverse lg:flex-row md:flex-row gap-5">
        {/* Main Image */}
        <div className="flex gap-2 mb-4 overflow-x-auto lg:flex-col md:flex-col lg:gap-4">
          {product.images.map((image, index) => (
            <button
              key={index}
              type="button"
              className="w-24 h-24 overflow-hidden rounded-lg border border-gray-300"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={`${URI}${image}`}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-fill"
              />
            </button>
          ))}
        </div>
        <div className="flex-1 lg:w-1/2 md:w-1/2">
          <img
            src={`${URI}${selectedImage}`}
            alt={product.title}
            className="w-full object-fill h-80 lg:h-[700px] md:h-[600px] rounded-lg shadow-md"
          />
        </div>

        {/* Thumbnails and Product Details */}
        <div className="flex-1 lg:w-1/2 md:w-1/2 flex flex-col justify-between">
          {/* Thumbnails */}

          {/* Product Details */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {product.title}
            </h1>
            <p className="mt-2 text-xl text-gray-700">₹ {product.price}</p>
            <p className="mt-2 text-gray-600">
              Product Code: {product.productCode}
            </p>
            <p className="mt-2 text-gray-600">
              Size: {product.size.join(", ")}
            </p>
            <p className="mt-2 text-gray-600">Color: {product.color}</p>
            <p className="mt-4 text-gray-600">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
