import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from 'axios'; // Make sure to import axios
import { useNavigate } from 'react-router-dom';

export const Handbags = () => {

  const [products, setProducts] = useState([]);
  
  const navagite = useNavigate()

  const URI = import.meta.env.VITE_API_URL;
  const category = "Handbag";

  useEffect(() => {
    fetchLatestProducts();
  }, []);

  const fetchLatestProducts = async () => {
    try {
      const resp = await axios.get(`${URI}api/admin/getProductByCatogry/${category}`);
      const fetchedProducts = resp.data.product;
      setProducts(fetchedProducts);
      console.log("Fetched Products:", fetchedProducts);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className='flex lg:flex-row md:flex-row flex-col items-center lg:gap-10 mt-20 mb-10 py-10 sm:px-[6%] bg-slate-300 font-serif'>
    <h1 className='text-3xl sm:text-4xl text-center font-semibold text-gray-600 mb-8'>Handbags</h1>

    <div className="flex flex-row flex-wrap justify-center gap-4">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1} // Default number of slides to show
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
        {products?.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="flex flex-col items-center cursor-pointer" onClick={()=>navagite(`/product/${product._id}`)}>
              <div className="mb-2">
                <img
                  src={`${URI}${product.thumbnail}`}
                  alt={product.title}
                  className="w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-full transition-transform duration-300 ease-in-out transform hover:scale-110"
                />
              </div>
              <p className="text-sm md:text-base lg:text-lg text-gray-700">{product.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

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
  )
}
