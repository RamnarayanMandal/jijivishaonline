import React, { useState, useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bagActions } from "../../store/bagSlice";
import { Snackbar, Alert } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

export function Product({ products }) {
  const [itemsPerSlide, setItemsPerSlide] = useState(1);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const URI = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerSlide(4); // lg screens
      } else if (window.innerWidth >= 768) {
        setItemsPerSlide(2); // md screens
      } else {
        setItemsPerSlide(1); // sm screens
      }
    };

    updateItemsPerSlide(); // Initial check
    window.addEventListener("resize", updateItemsPerSlide); // Update on resize

    return () => {
      window.removeEventListener("resize", updateItemsPerSlide); // Clean up
    };
  }, []);

  const handleAddToCart = async (product) => {
    

    if (!token) {
      Swal.fire({
        title: "Login Required",
        text: "Please log in to add products to the cart.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      const response = await axios.post(`${URI}api/user/`, {
        userId,
        productId: product._id,
        productName: product.title,
        quantity: 1,
        price: product.price,
        attributes:{
          size:product.size,
          color:product.color},
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
      setOpenSnackbar({
        open: true,
        message: "Error adding item to cart",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="relative w-full overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={itemsPerSlide}
        navigation
        pagination={{ clickable: true }}
        className="py-4"
        speed={500} // Smooth slide transition
        breakpoints={{
          640: { slidesPerView: 1 }, // small screens
          768: { slidesPerView: 2 }, // medium screens
          1024: { slidesPerView: 4 }, // large screens
        }}
      >
        {products &&
          products.map((product) => (
            <SwiperSlide key={product._id}>
              <div className="flex-shrink-0 w-72 mx-2 my-10">
                <div className="border-2 border-gray-300 bg-gray-50 shadow-lg overflow-hidden hover:border-red-500 transition-transform duration-300 transform hover:scale-105 cursor-pointer">
                  <div className="overflow-hidden">
                    <img
                      src={`${URI}${product.thumbnail}`}
                      alt={product.title}
                      className="w-full object-cover h-80"
                      onClick={() => navigate(`/product/${product._id}`)}
                    />
                  </div>
                  <div className="p-4 flex flex-col justify-between">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-semibold text-base w-[90%]">
                        {product.title}
                      </p>
                      <CiHeart className="hover:text-red-500 text-2xl cursor-pointer" />
                    </div>
                    <p className="mb-4">₹ {product.price.toFixed(2)}</p>
                    <button
                      className="border-2 border-black py-2 px-4 text-black hover:border-none hover:bg-red-500 hover:text-white transition duration-300 flex justify-center items-center gap-2 w-full"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent click event from triggering the parent div
                        handleAddToCart(product);
                      }}
                    >
                      <IoCartOutline className="text-xl" />
                      <p>Add to Cart</p>
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
      <style jsx>{`
        .swiper-button-next,
        .swiper-button-prev {
          width: 30px; /* Increase the size of the navigation buttons */
          height: 30px;
          color: black; /* Change the button color if needed */
        }

        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 20px;
          font-weight: bold; /* Adjust font size and make icons bold */
        }

        .swiper-pagination-bullet {
          background-color: gray; /* Change the bullet color */
          opacity: 1; /* Make bullets fully visible */
        }

        .swiper-pagination-bullet-active {
          background-color: black; /* Color for the active bullet */
        }
      `}</style>

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
}
