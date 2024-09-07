import React from "react";

const ProductDetails = ({ product }) => {
  return (
    <div className=" mt-4 space-y-4">
      <details className="border p-4 rounded-sm border-gray-300 pt-2">
        <summary className="font-semibold">Product Details</summary>
        <p className="mt-2 text-gray-600">{product.description}</p>
        <p className="mt-2 text-gray-600">{product.productdescriptions}</p>
        <p className="mt-2 text-gray-600">{product.category}</p>
        <p className="mt-2 text-gray-600">{product.subcategory}</p>
        <p className="mt-2 text-gray-600">{product.typeOfProduct}</p>
        <p className="mt-2 text-gray-600">aviilble color: {product.color}</p>
        <p className="mt-2 text-gray-600">
          Type Of Printing: {product.typeOfPrinting}
        </p>
        <p className="mt-2 text-gray-600">fabric: {product.fabric}</p>
        <p>Origin: {product.countryOfOrigin}</p>
        <p className="mt-2 text-gray-600">
          Additional Info: {product.additionalInfo1},<br /> {product.additionalInfo2}
        </p>
      </details>

      <details className="border p-4 rounded-sm border-gray-300 pt-2">
        <summary className="font-semibold">Material & Care</summary>
        <p className="mt-2 text-gray-600">{
          product.material ||
          "Cotton, Polyester, Spandex, Silk, Synthetic Cotton, Nylon, Acrylic, Rayon, Lace, Acrylic, Polyester, Synthetic Cotton, Nylon, Acrylic, Rayon, Lace, Acrylic, Polyester, Synthetic Cotton, Nylon, Acrylic, Rayon, Lace, Acrylic, Polyester, Synthetic "
          }</p>
      </details>

      <details className="border p-4 rounded-sm border-gray-300 pt-2">
        <summary className="font-semibold">Shipping</summary>
        <p className="mt-2 text-gray-600">
          {product.shipping||"Domestic Delivery in 4-5 business days..."}
          
        </p>
      </details>
    </div>
  );
};

export default ProductDetails;
