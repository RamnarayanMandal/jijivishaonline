import React from "react";

const ProductInfo = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">
        Navy Blue Crepe Kashmiri Hand Embroidery Kurti
      </h1>
      <p className="text-xl text-gray-700">₹ 3,400</p>

      <div className="flex items-center space-x-4">
        <div className="space-x-2">
          <label className="font-semibold">Size:</label>
          <button className="px-3 py-1 border border-gray-300 rounded">
            S
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded">
            M
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded">
            L
          </button>
        </div>

        <div className="flex items-center">
          <label className="font-semibold mr-2">Quantity:</label>
          <input
            type="number"
            defaultValue={1}
            min={1}
            className="w-16 border border-gray-300 rounded px-2 py-1"
          />
        </div>
      </div>

      <div className="flex space-x-4">
        <button className="bg-gray-900 text-white px-6 py-2 rounded">
          Add to Cart
        </button>
        <button className="bg-red-600 text-white px-6 py-2 rounded">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
