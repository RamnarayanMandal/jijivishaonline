import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io"; // Correct import from 'react-router-dom'

const LatestProducts = () => {
  return (
    <section className="flex flex-col justify-center items-center px-4 sm:px-[6%] my-10 sm:py-10 gap-4 font-serif">
      <h1 className="text-4xl text-center font-semibold text-gray-600 mb-4">
        Our Latest Products
      </h1>
      <div className="flex flex-wrap justify-center items-center border-y-2 py-4 gap-6 w-full md:w-3/4">
        {/* Use a more semantic tag for each category */}
        <article className="text-lg text-gray-700">Sarees</article>
        <article className="text-lg text-gray-700">Dupattas</article>
        <article className="text-lg text-gray-700">Shirts</article>
        <article className="text-lg text-gray-700">Jewellery</article>
        <article className="text-lg text-gray-700">Home Decor</article>
      </div>
      <div className="flex justify-end items-center content-center w-full mt-4">
        <Link to="/" className="text-red-600 ">
          VIEW ALL
        </Link>
        <IoIosArrowForward  className="text-red-600"/>
      </div>
    </section>
  );
};

export default LatestProducts;
