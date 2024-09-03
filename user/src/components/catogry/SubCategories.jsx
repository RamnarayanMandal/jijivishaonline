import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";

export const SubCategories = () => {
  const [subCategories, setSubCategories] = useState([]);
  const { subcategory } = useParams();
  const URI = import.meta.env.VITE_API_URL;

  const navagite = useNavigate()

  

  useEffect(() => {
    fetchSubCategories();
  }, [subcategory]);

  const fetchSubCategories = async () => {
    try {
      const resp = await axios.get(
        `${URI}api/admin/getProductBySubcategory/${subcategory}`
      );
      setSubCategories(resp.data.productsBySubcategory);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4 my-10">
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {subCategories.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-full items-center justify-center content-center"
          >
            <div className="border-2 border-gray-300 bg-gray-50 shadow-lg overflow-hidden hover:border-red-500 transition-transform duration-300 transform hover:scale-105 cursor-pointer"  onClick={()=>navagite(`/product/${product._id}`)}>
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
        ))}
      </div>
    </div>
  );
};
