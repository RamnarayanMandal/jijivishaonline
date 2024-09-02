import React, { useState, useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {  useNavigate } from "react-router-dom";

export function Product({ products }) {
  const [itemsPerSlide, setItemsPerSlide] = useState(1);

  const navagite = useNavigate()

  const URI = import.meta.env.VITE_API_URL;
  console.log("Products:", products);

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
        {products && products.map((product) => (
          <SwiperSlide key={product._id}>
            <div className="flex-shrink-0 w-72 mx-2 items-center justify-center content-center my-10">
              <div className="border-2 border-gray-300 bg-gray-50 shadow-lg overflow-hidden hover:border-red-500 transition-transform duration-300 transform hover:scale-105" onClick={()=>navagite(`/product/${product._id}`)}>
                <div className="overflow-hidden">
                  <img
                    src={`${URI}${product.thumbnail}`}
                    alt={product.title}
                    className="w-full object-cover h-80"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-base mb-2 w-[90%]">
                      {product.title}
                    </p>
                    <CiHeart className="hover:text-red-500 text-2xl cursor-pointer" />
                  </div>
                  <p className="mb-4">₹ {product.price.toFixed(2)}</p>
                  <button className="border-2 hover:border-none text-black py-2 px-4 hover:bg-red-500 w-full hover:text-white transition duration-300 flex justify-center items-center gap-5">
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
    </div>
  );
}
