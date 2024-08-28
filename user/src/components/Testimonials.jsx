// Import necessary modules and styles
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

const testimonialData = [
  {
    avatar: "https://img.freepik.com/free-photo/woman-with-long-hair-yellow-hoodie-with-word-music-it_1340-39068.jpg",
    name: "Simonette Lindermann",
    review: "Mind-blowing discovery! Changed my routine. Essential for everyone. A wise advice to all interested. Can't imagine without it!"
  },
  {
    avatar: "https://img.freepik.com/free-photo/close-up-portrait-young-bearded-man-white-shirt-jacket-posing-camera-with-broad-smile-isolated-gray_171337-629.jpg",
    name: "Merilee Beal",
    review: "Unbelievable gem! Altered my life. A must-have now. Wholeheartedly advise it to everyone. An absolute game-changer."
  },
  {
    avatar: "https://img.freepik.com/free-photo/handsome-african-guy-with-stylish-haircut-taking-photo-digital-camera_171337-1345.jpg",
    name: "Suzi Lankester",
    review: "Phenomenal addition! Completely transformed my days. Can't go without it. Strongly endorse for all. A game-changer for sure!"
  },
  {
    avatar: "https://img.freepik.com/free-photo/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction_176420-15187.jpg",
    name: "Gaston Cunnow",
    review: "Amazing product! It changed my life. Can't live without it now. Highly recommended to everyone!"
  },
  {
    avatar: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg",
    name: "Marys Lobb",
    review: "Life-altering find! Indispensable now. Enthusiastically suggest to all. A game-changer for everyone!"
  },
  {
    avatar: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg",
    name: "Marys Lobb",
    review: "Life-altering find! Indispensable now. Enthusiastically suggest to all. A game-changer for everyone!"
  },
  {
    avatar: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg",
    name: "Marys Lobb",
    review: "Life-altering find! Indispensable now. Enthusiastically suggest to all. A game-changer for everyone!"
  }
];

const Testimonials = () => {
  return (
    <div className="flex flex-col justify-center items-center h-auto ">
        <h1 className='text-3xl sm:text-4xl text-center font-semibold text-gray-600 mb-8 font-serif'>Happy Customers</h1>
      <div className="w-full md:w-3/4 lg:w-2/3">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          loop={true}
          spaceBetween={30}
          coverflowEffect={{
            rotate: 0,
            depth: 800,
            slideShadows: true,
          }}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2000,
          }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="swiper-container"
        >
          {testimonialData.map((testimonial, index) => (
            <SwiperSlide key={index} className="flex flex-col items-center bg-white rounded-lg shadow-lg w-72 my-10">
              <div className="ImgHolder w-full bg-[#4361ee] rounded-t-md">
                <img
                  className="w-24 h-24 rounded-full mx-auto border-4 border-[#4361ee] object-cover"
                  src={testimonial.avatar}
                  alt={testimonial.name}
                />
              </div>
              <div className="ContentHolder mt-4 p-4 mb-5">
                <h3 className="text-lg font-bold text-center">{testimonial.name}</h3>
                <p className="text-sm text-center mt-2">{testimonial.review}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
