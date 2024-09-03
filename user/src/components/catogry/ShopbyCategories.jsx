import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



const ShopbyCategories = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const navigate = useNavigate() // Step 1: State to hold fetched data

  const URI = import.meta.env.VITE_API_URL; // Ensure this environment variable is set correctly

  useEffect(() => {
    fetchCategories(); // Step 2: Fetch categories on component mount
  }, []);

  const fetchCategories = async () => {
    try {
      const resp = await axios.get(`${URI}api/admin/getAllCategory`);
      // Step 3: Update the state with fetched data
      if (resp.data.success) {
        setCategoriesData(resp.data.productsByCategory);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center sm:px-[6%] my-10 sm:py-10 font-serif">
      <h1 className="lg:text-4xl text-2xl text-center font-semibold text-gray-600 mb-6">
        Shop by Categories
      </h1>
      <div className="flex justify-center items-center content-center gap-10 flex-wrap mt-5">
        {categoriesData.map((category) => (
          <div key={category._id} className="flex flex-col items-center content-center cursor-pointer">
            <div className="mb-2">
              <img
                src={`${URI}${category.thumbnail}`} // Step 4: Show thumbnail image
                alt={category.subcategory}
                className="w-32 h-32 rounded-full transition-transform duration-300 ease-in-out transform hover:scale-125"
              onClick={()=>navigate(`/catogry/${category.category}`)}/>
            </div>
            <p className="text-lg text-gray-700">{category.category}</p> {/* Step 5: Show subcategory name */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopbyCategories;
