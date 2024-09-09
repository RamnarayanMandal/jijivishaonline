import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { bagActions } from "../../../store/bagSlice";
import { Snackbar, Alert } from "@mui/material";
import { IoCartOutline } from "react-icons/io5";
import axios from "axios";

const ProductInfo = ({ product }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");

  const handleAddToCart = async (product) => {
    try {
      await axios.post(`${URI}api/user/`, {
        userId,
        productId: product._id,
        productName: product.title,
        quantity: 1,
        price: product.price,
        attributes: product.attributes,
        discount: product.discount,
        Image: product.thumbnail,
      });

      dispatch(
        bagActions.addToBag({
          data: { ...product, quantity: 1 },
          totalQuantity: 1,
        })
      );

      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error adding item to cart", error);
      setOpenSnackbar({
        open: true,
        message: "Error adding item to cart",
        severity: "error",
      });
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const discountedPrice =
    product.discount > 0
      ? product.price - (product.price * product.discount) / 100
      : product.price;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <p className="text-sm text-gray-600">{product.productCode}</p>

      {/* Price Section */}
      <div className="flex items-center my-4">
        <p className="text-2xl font-semibold text-gray-800">
          ₹ {discountedPrice.toFixed(2)}
        </p>
        {product.discount > 0 && (
          <p className="text-xl font-light text-gray-500 line-through ml-4">
            ₹ {product.price.toFixed(2)}
          </p>
        )}
        {product.discount > 0 && (
          <p className="ml-2 text-red-500 font-semibold text-lg">
            ({product.discount}% OFF)
          </p>
        )}
      </div>

      {/* Size and Quantity Section */}
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 my-4">
        <div className="space-x-2">
          <label className="font-semibold">Size:</label>
          {product.size.map((size) => (
            <button
              key={size}
              className={`px-3 py-1 border ${
                size === product.selectedSize
                  ? "border-red-600"
                  : "border-gray-300"
              } rounded ${
                size === product.selectedSize ? "text-red-600" : "text-gray-700"
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        <div className="flex items-center">
          <label className="font-semibold mr-2">Quantity:</label>
          <div className="flex items-center">
            <button
              onClick={handleDecreaseQuantity}
              className="px-2 py-1 bg-gray-200 border border-gray-300 rounded"
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              min={1}
              className="w-16 border border-gray-300 rounded px-2 py-1 text-center mx-2"
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <button
              onClick={handleIncreaseQuantity}
              className="px-2 py-1 bg-gray-200 border border-gray-300 rounded"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full">
        <button
          className="border-2 border-black py-2 px-4 text-black hover:border-none hover:bg-red-500 hover:text-white transition duration-300 flex justify-center items-center gap-2 w-full"
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart(product);
          }}
        >
          <IoCartOutline className="text-xl" />
          <p>Add to Cart</p>
        </button>
        <button className="bg-red-600 text-white px-6 py-2 rounded w-full">
          Buy Now
        </button>
      </div>

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Product added to cart!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProductInfo;
