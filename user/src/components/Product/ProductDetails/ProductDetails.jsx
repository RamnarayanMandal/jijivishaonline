import React from "react";

// Helper function to check if the array is not empty and doesn't contain only empty strings
const isValidArray = (arr) => Array.isArray(arr) && arr.some(item => item.trim() !== "");

const ProductDetails = ({ product }) => {
  return (
    <div className="mt-4 space-y-4">
      <details className="border p-4 rounded-sm border-gray-300 pt-2">
        <summary className="font-semibold">Product Details</summary>

        <ul className="list-disc pl-5">
          {/* Conditionally render only if the data is available */}
          {product.description && (
            <li className="mt-2 text-gray-600">{product.description}</li>
          )}
          
          {product.productdescriptions && (
            <li className="mt-2 text-gray-600">{product.productdescriptions}</li>
          )}
          
          {product?.productCode && (
            <li className="text-sm text-gray-600 my-2 font-semibold">
              Product Code:{" "}
              <span className="font-normal">{product.productCode}</span>
            </li>
          )}

          {/* Render Color only if it's a valid non-empty array */}
          {isValidArray(product.color) && (
            <li className="mt-2 text-gray-600">
              Color: {product.color.join(", ")}
            </li>
          )}

          {/* Render Size only if it's a valid non-empty array */}
          {isValidArray(product.size) && (
            <li className="mt-2 text-gray-600">
              Size: {product.size.join(", ")}
            </li>
          )}

          {product.fabric && (
            <li className="mt-2 text-gray-600">Fabric: {product.fabric}</li>
          )}

          {product.typeOfPrinting && (
            <li className="mt-2 text-gray-600">
              Type Of Printing: {product.typeOfPrinting}
            </li>
          )}

          {(product.additionalInfo1 || product.additionalInfo2) && (
            <li className="mt-2 text-gray-600">
              Additional Info: {product.additionalInfo1},<br />
              {product.additionalInfo2}
            </li>
          )}

          {product.countryOfOrigin && (
            <li className="mt-2 text-gray-600">Origin: {product.countryOfOrigin}</li>
          )}
        </ul>
      </details>

      <details className="border p-4 rounded-sm border-gray-300 pt-2">
        <summary className="font-semibold">Material & Care</summary>
        <p className="mt-2 text-gray-600">
          {product.material ||
            "Cotton, Polyester, Spandex, Silk, Synthetic Cotton, Nylon, Acrylic, Rayon, Lace, etc."}
        </p>
      </details>

      <details className="border p-4 rounded-sm border-gray-300 pt-2">
        <summary className="font-semibold">Shipping</summary>
        <p className="mt-2 text-gray-600">
          {product.shipping || "Domestic Delivery in 4-5 business days..."}
        </p>
      </details>
    </div>
  );
};

export default ProductDetails;
