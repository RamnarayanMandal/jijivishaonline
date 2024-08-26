import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import {Product} from "./Product";


const LatestProducts = () => {
  return (
    <section className="flex flex-col justify-center items-center sm:px-[6%]  my-10 sm:py-10  font-serif">
      <h1 className="lg:text-4xl text-2xl text-center font-semibold text-gray-600 mb-6">
        Our Latest Products
      </h1>
      <div className="flex flex-col sm:flex-row items-center sm:items-stretch border-y-2 py-4 gap-4 w-full">
        {/* Empty space for alignment */}
        <div className="hidden sm:block w-1/5"></div>
        
        {/* Flex container for categories */}
        <div className="flex items-center flex-wrap justify-center gap-4 w-full sm:w-3/5">
          <article className="lg:text-lg text-sm text-gray-700">Sarees</article>
          <article className="lg:text-lg text-sm text-gray-700">Dupattas</article>
          <article className="lg:text-lg text-sm text-gray-700">Shirts</article>
          <article className="lg:text-lg text-sm text-gray-700">Jewellery</article>
          <article className="lg:text-lg text-sm text-gray-700">Home Decor</article>
        </div>
        
        {/* Flex container for the 'VIEW ALL' link */}
        <div className="flex justify-center sm:justify-end w-full sm:w-1/5 ">
          <Link to="/" className="flex items-center text-red-600 hover:text-red-800 lg:text-lg text-sm">
            VIEW ALL
            <IoIosArrowForward className="ml-1" />
          </Link>
        </div>
      </div>
      <Product/>
    </section>
  );
};

export default LatestProducts;
