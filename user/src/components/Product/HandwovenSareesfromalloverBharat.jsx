import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import {Product} from "./Product";
import axios from 'axios';

const HandwovenSareesfromalloverBharat = () => {
    
  const [products, setProducts] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  const URI = import.meta.env.VITE_API_URL;

  const category = "saree"

  useEffect(() => {
    fetchLatestProducts();
  }, []);

  const fetchLatestProducts = async () => {
    try {
      const resp = await axios.get(`${URI}api/admin/getProductByCatogry/${category}`);
      const fetchedProducts = resp.data.product;
      console.log(`Fetched ${fetchedProducts} product`);

      setProducts(fetchedProducts);
      // Extract unique subcategories from fetched products
      const uniqueSubcategories = [...new Set(fetchedProducts.map((product) => product.subcategory))];
      setSubcategories(uniqueSubcategories);
      console.log("Fetched Products:", fetchedProducts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  // Filter products based on selected subcategory
  const filteredProducts = selectedSubcategory
    ? products.filter((product) => product.subcategory === selectedSubcategory)
    : products;

  return (
    <section className="flex flex-col justify-center items-center sm:px-[6%]  my-10 sm:py-10  font-serif">
    <h1 className="lg:text-4xl text-2xl text-center font-semibold text-gray-600 mb-6">
    Handwoven Sarees from all over Bharat
    </h1>
    <div className="flex flex-col sm:flex-row items-center sm:items-stretch  gap-4 w-full">
      {/* Empty space for alignment */}
      <div className="hidden sm:block w-1/5"></div>
      
      {/* Flex container for categories */}
      <div className="flex items-center flex-wrap border-y-2 justify-center py-2 text-sm gap-4 w-full sm:w-3/5">
          {subcategories.map((subcategory, index) => (
            <article
              key={index}
              className={`lg:text-lg text-sm text-gray-700 cursor-pointer ${selectedSubcategory === subcategory ? "font-bold text-red-500" : ""}`}
              onClick={() => handleSubcategoryClick(subcategory)}
            >
              {subcategory}
            </article>
          ))}
        </div>
      
      {/* Flex container for the 'VIEW ALL' link */}
      <div className="flex justify-center sm:justify-end w-full sm:w-1/5 ">
      {subcategories.map((subcategory, index) => (
          <Link
            to={`/Subcategory/${subcategory}`}
            className="flex items-center text-red-600 text-sm hover:text-red-800"
             // Reset subcategory when clicking 'VIEW ALL'
          >
            VIEW ALL
            <IoIosArrowForward className="ml-1" />
          </Link>
            ))}
      </div>
    </div>
    <div className="flex justify-center items-center content-center w-full lg:px-2 md:px-2 px-10">
     <Product products={filteredProducts} /> </div>{/* Make sure Product is defined correctly and accepts filtered products */}
    </section>
  )
}

export default HandwovenSareesfromalloverBharat
