import React, { useState, useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";

const products = [
  { id: 1, image: "https://cdn.pixabay.com/photo/2019/03/04/20/15/model-4035094_960_720.jpg", title: "Navy Blue Crepe Kashmiri Hand Embroidery Saree", price: "₹ 99.99" },
  { id: 2, image: "https://cdn.pixabay.com/photo/2019/03/04/20/15/model-4035094_960_720.jpg", title: "Navy Blue Crepe Kashmiri Hand Embroidery Saree", price: "₹ 99.99" },
  { id: 3, image: "https://cdn.pixabay.com/photo/2019/03/04/20/15/model-4035094_960_720.jpg", title: "Navy Blue Crepe Kashmiri Hand Embroidery Saree", price: "₹ 99.99" },
  { id: 4, image: "https://cdn.pixabay.com/photo/2019/03/04/20/15/model-4035094_960_720.jpg", title: "Navy Blue Crepe Kashmiri Hand Embroidery Saree", price: "₹ 99.99" },
  
];

export function Product() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(1);

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

    updateItemsPerSlide(); // initial check
    window.addEventListener('resize', updateItemsPerSlide); // update on resize

    return () => {
      window.removeEventListener('resize', updateItemsPerSlide); // clean up
    };
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? Math.ceil(products.length / itemsPerSlide) - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === Math.ceil(products.length / itemsPerSlide) - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative overflow-hidden">
      <div className="relative flex overflow-x-auto gap-4 py-4 scroll-smooth">
        <div
          className="flex flex-nowrap transition-transform duration-300"
          style={{ transform: `translateX(-${currentSlide * 100}%)`, width: `${100 * Math.ceil(products.length / itemsPerSlide)}%` }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-72 mx-2" // Adjust width and margin for responsiveness
            >
              <div className="border-2 border-gray-300 bg-gray-50 shadow-lg overflow-hidden hover:border-red-500 transition duration-300">
                <div>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full object-cover h-3/5"
                  />
                </div>
                <div className="p-4 h-2/5 flex flex-col justify-between">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-base mb-2 w-[90%] truncate">
                      {product.title}
                    </p>
                    <CiHeart className="hover:text-red-500 text-2xl cursor-pointer" />
                  </div>
                  <p className="mb-4">{product.price}</p>
                  <button className="border-2 hover:border-none text-black py-2 px-4 hover:bg-red-500 w-full hover:text-white transition duration-300 flex justify-center items-center gap-5">
                    <IoCartOutline className="text-xl" />
                    <p>Add to Cart</p>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800"
      >
        &lt;
      </button>
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800"
      >
        &gt;
      </button>
    </div>
  );
}
