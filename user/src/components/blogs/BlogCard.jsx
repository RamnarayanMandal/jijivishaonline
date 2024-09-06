import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Updated import

export const BlogCard = () => {
  const URI = import.meta.env.VITE_API_URL;
  const [blogs, setBlogs] = useState([]);
  const [itemsPerSlide, setItemsPerSlide] = useState(1);
  const navigate = useNavigate(); // Updated to useNavigate

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${URI}api/admin/blogs`);
        const sortedBlogs = response.data.blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setBlogs(sortedBlogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, [URI]);

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
    window.addEventListener('resize', updateItemsPerSlide); // Update on resize

    return () => {
      window.removeEventListener('resize', updateItemsPerSlide); // Clean up
    };
  }, []);

  const handleBlogClick = (id) => {
    navigate(`/blogsdetails/${id}`); // Navigate to the blog details page
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
        {blogs.map((blog) => (
          <SwiperSlide key={blog._id}>
            <div className="flex-shrink-0 w-72 mx-2 items-center justify-center content-center my-10">
              <div
                className="bg-[#ffffff] border-2 shadow-lg overflow-hidden hover:border-black transition-transform duration-300 transform hover:scale-105 cursor-pointer"
                onClick={() => handleBlogClick(blog._id)}
              >
                <div className="overflow-hidden">
                  <img
                    src={`${URI}${blog.image}`}
                    alt={blog.title}
                    className="w-full object-cover h-80"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between">
                  <div className="block justify-between items-center">
                    <p className="my-2 text-sm text-gray-600">
                      {new Date(blog.createdAt).toLocaleDateString()} {/* Updated to use createdAt */}
                    </p>
                    <p className="font-semibold text-base mb-2 w-[90%]">
                      {blog.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <style jsx>{`
        .swiper-button-next,
        .swiper-button-prev {
          width: 30px;
          height: 30px;
          color: black;
        }

        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 20px;
          font-weight: bold;
        }

        .swiper-pagination-bullet {
          background-color: gray;
          opacity: 1;
        }

        .swiper-pagination-bullet-active {
          background-color: black;
        }
      `}</style>
    </div>
  );
};
