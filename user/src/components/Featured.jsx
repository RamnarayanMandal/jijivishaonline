import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";

import fr1 from "../assets/fr1.png";
import fr2 from "../assets/fr2.png";
import fr3 from "../assets/fr3.png";
import fr4 from "../assets/fr14.png";
import fr5 from "../assets/fr15.png";

const Featured = () => {
  const [img, setImg] = useState([]);
  const URI = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchImg();
  }, []);

  const fetchImg = async () => {
    try {
      const resp = await axios.get(`${URI}api/admin/featuredImg`);
      setImg(resp.data.data);
      console.log(resp.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fallback images if API data is empty
  const fallbackImages = [fr1, fr2, fr3, fr4, fr5];

  return (
    <div className="flex flex-col justify-between px-4 sm:px-[6%] py-6 sm:py-10 gap-4 font-serif">
      <h1 className="lg:text-4xl text-3xl text-center font-semibold text-gray-600">
        Featured In
      </h1>
      {/* Swiper for small to medium screens */}
      <div className="block lg:hidden border-y-2">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={4}
          navigation
          pagination={{ clickable: true }}
          className="py-4"
        >
          {(img.length > 0 ? img : fallbackImages).map((imageSrc, index) => (
            <SwiperSlide key={index}>
              <img
                src={`${URI}imageSrc`}
                alt={`Featured ${index + 1}`}
                className="h-auto w-auto object-contain"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* Flex layout for larger screens */}
      <div className="hidden lg:flex flex-row justify-center items-center border-y-2 p-4 lg:gap-10">
        {(img.length > 0 ? img : fallbackImages).map((imageSrc, index) => (
          <img
            key={index}
            src={imageSrc}
            alt={`Featured ${index + 1}`}
            className="lg:h-20 h-auto w-auto object-contain"
          />
        ))}
      </div>

      {/* Custom styles for Swiper navigation buttons */}
      <style jsx>{`
        .swiper-button-next,
        .swiper-button-prev {
          width: 30px; /* Increase the size of the navigation buttons */
          height: 30px;
          color: black; /* Change the button color if needed */
        }

        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 15px; /* Adjust font size for icons */
        }
      `}</style>
    </div>
  );
};

export default Featured;
