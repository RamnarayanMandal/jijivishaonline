import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ImageUploader from "./ImageUploader";
import axios from "axios";
import Swal from "sweetalert2";

const Featured = () => {
  const [featuredImgs, setFeaturedImgs] = useState([]);
  const [uploadedImg, setUploadedImg] = useState(null);
  const URI = import.meta.env.VITE_API_URL;

  // Fetch banners on component mount
  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await axios.get(`${URI}api/admin/featuredImg`);
      if (response.data.data && response.data.data.length > 0) {
        // Flatten all image paths into a single array
        const images = response.data.data.flatMap(item => 
          item.images.map(image => `${URI}${image.replace(/\\/g, '/')}`) // Convert backslashes to slashes
        );
        setFeaturedImgs(images);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (e) => {
    setUploadedImg(e.target.files[0]);
  };

  const postBanners = async () => {
    // Show confirmation dialog before upload
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to upload the selected image?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, upload it!",
      cancelButtonText: "No, cancel",
    });

    if (result.isConfirmed) {
      const formData = new FormData();
      formData.append("images", uploadedImg); // Ensure this matches the field name in your backend

      // Show loading indicator
      Swal.fire({
        title: "Uploading...",
        text: "Please wait while your image is being uploaded.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        await axios.post(`${URI}api/admin/featuredImg`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        fetchBanners(); // Fetch banners after uploading new ones

        // Show success message
        Swal.fire("Uploaded!", "Your image has been uploaded successfully.", "success");
      } catch (error) {
        console.error(error);

        // Show error message
        Swal.fire("Error!", "An error occurred while uploading the image. Please try again later.", "error");
      }
    }
  };

  return (
    <div className="flex flex-col justify-between px-4 sm:px-[6%] py-6 sm:py-10 gap-4 font-serif">
      <h1 className="lg:text-4xl text-3xl text-center font-semibold text-gray-600">Featured In</h1>
      {/* Swiper for small to medium screens */}
      <div className="block border-y-2 lg:px-96">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={5}  // Adjusted spaceBetween value
          slidesPerView={4}
          navigation
          pagination={{ clickable: true }}
          className="py-5"
        >
          {featuredImgs.length > 0 ? (
            featuredImgs.map((imgSrc, index) => (
              <SwiperSlide key={index}>
                <img src={imgSrc} alt={`Featured ${index + 1}`} className="h-auto w-32 object-contain" onClick={()=>{hadleDelted()}}/>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <p className="text-center text-gray-500">No images available</p>
            </SwiperSlide>
          )}
        </Swiper>
      </div>
      <ImageUploader onFileChange={handleFileChange} onUpload={postBanners} />

      <style jsx>{`
        .swiper-button-next,
        .swiper-button-prev {
          width: 30px;
          height: 30px;
          color: black;
        }

        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 15px;
        }
      `}</style>
    </div>
  );
};

export default Featured;
