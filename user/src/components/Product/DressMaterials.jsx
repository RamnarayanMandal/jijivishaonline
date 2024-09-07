import React from "react";

import { ShopNowProduct } from "./ShopNowProduct";




const DressMaterials = () => {

 
  return (
    <div className="flex flex-col justify-center items-center sm:px-[6%]  my-10 sm:py-10  font-seri">
      <div className="flex flex-col justify-between sm:flex-row items-center sm:items-stretch  gap-4 w-full">
        {/* Empty space for alignment */}
        <h1 className="w-1/5 lg:text-4xl text-2xl text-center font-semibold text-gray-600 mb-6">
          Dress Materials
        </h1>

        {/* Flex container for categories */}
        <div className="flex items-center flex-wrap border-y-2 justify-center  py-2 text-sm gap-4 w-full sm:w-3/5">
          <article className="lg:text-lg text-sm text-gray-700">Sarees</article>
          <article className="lg:text-lg text-sm text-gray-700">
            Dupattas
          </article>
          <article className="lg:text-lg text-sm text-gray-700">Shirts</article>
          <article className="lg:text-lg text-sm text-gray-700">
            Jewellery
          </article>
          <article className="lg:text-lg text-sm text-gray-700">
            Home Decor
          </article>
        </div>
      </div>
      <div  className="flex justify-center items-center content-center w-full lg:px-2 md:px-2 px-10">
        <ShopNowProduct/>
      </div>
    </div>
  );
};

export default DressMaterials;
