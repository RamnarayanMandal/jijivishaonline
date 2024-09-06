import React from "react";

const ProductDetails = () => {
  return (
    <div className="mt-8 space-y-4">
      <details className="border-t border-gray-300 pt-2">
        <summary className="font-semibold">Product Details</summary>
        <p className="mt-2 text-gray-600">
          Step into a world of elegance with our "Blooms in Burgundy"...
        </p>
      </details>

      <details className="border-t border-gray-300 pt-2">
        <summary className="font-semibold">Material & Care</summary>
        <p className="mt-2 text-gray-600">Gentle hand wash...</p>
      </details>

      <details className="border-t border-gray-300 pt-2">
        <summary className="font-semibold">Shipping</summary>
        <p className="mt-2 text-gray-600">
          Domestic Delivery in 4-5 business days...
        </p>
      </details>
    </div>
  );
};

export default ProductDetails;
