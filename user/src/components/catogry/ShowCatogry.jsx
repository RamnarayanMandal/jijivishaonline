import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bagActions } from "../../store/bagSlice";
import { Snackbar, Alert } from "@mui/material";


export const ShowCatogry = () => {
const [subCategories, setSubCategories] = useState([]);
  const { category } = useParams();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const dispatch = useDispatch();
  const URI = import.meta.env.VITE_API_URL;
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchSubCategories();
  }, [category]);

  const fetchSubCategories = async () => {
    const encodedCategory = encodeURIComponent(category);
    try {
      const resp = await axios.get(
        `${URI}api/admin/getProductByCatogry/${encodedCategory}`
      );
      console.log(resp.data);
      setSubCategories(resp.data.productsByCategory);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      const response = await axios.post(`${URI}api/user/`, {
        userId,
        productId: product._id,
        productName: product.title,
        quantity: 1,
        price: product.price,
        attributes: product.attributes,
        discount: product.discount,
        Image: product.thumbnail,
      });
  
      // Dispatch the action to add to the Redux store (bag)
      dispatch(
        bagActions.addToBag({
          data: { ...product, quantity: 1 },
          totalQuantity: 1,
        })
      );
  
      // Show success notification
      setOpenSnackbar(true);
    } catch (error) {
      // Catch the error and show an error message
      console.error("Error adding item to cart", error);
  
      // Display a user-friendly message or show a snackbar with error info
      setOpenSnackbar({ open: true, message: "Error adding item to cart", severity: "error" });
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const navagite = useNavigate()
  return (
    <div className="container mx-auto p-4 my-10">
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {subCategories?.map((product) => (
        <div
          key={product.id}
          className="flex-shrink-0 w-full items-center justify-center content-center"
        >
          <div className="border-2 border-gray-300 bg-gray-50 shadow-lg overflow-hidden hover:border-red-500 transition-transform duration-300 transform hover:scale-105" >
            <div className="overflow-hidden">
              <img
                src={`${URI}${product.thumbnail}`}
                alt={product.title}
                className="w-full object-cover h-80  cursor-pointer"
                onClick={()=>navagite(`/product/${product._id}`)} />
            </div>
            <div className="p-4 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-base mb-2 w-[90%]">
                  {product.title}
                </p>
                <CiHeart className="hover:text-red-500 text-2xl cursor-pointer" />
              </div>
              <p className="mb-4">₹ {product.price.toFixed(2)}</p>
              <button className="border-2 hover:border-none text-black py-2 px-4 hover:bg-red-500 w-full hover:text-white transition duration-300 flex justify-center items-center gap-5"
              onClick={(e) => {
                e.stopPropagation(); // Prevent click event from triggering the parent div
                handleAddToCart(product);
              }}>
                <IoCartOutline className="text-xl" />
                <p>Add to Cart</p>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
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
  )
}
