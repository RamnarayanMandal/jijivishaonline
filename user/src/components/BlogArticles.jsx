import React from 'react'

import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { BlogCard } from './Product/BlogCard';

const BlogArticles = () => {
  return (
    <section className="flex flex-col justify-center items-center sm:px-[6%]  my-10 sm:py-10  font-serif">
    <h1 className="lg:text-4xl text-2xl text-center font-semibold text-gray-600 mb-6">
    Blog Articles
    </h1>
    <div className="flex flex-col sm:flex-row items-center sm:items-stretch  gap-4 w-full">
      {/* Empty space for alignment */}
      <div className="hidden sm:block w-1/5"></div>
      
      {/* Flex container for categories */}
      <div className="flex items-center flex-wrap border-y-2 justify-center  py-2 text-sm gap-4 w-full sm:w-3/5">
        <article className="lg:text-lg text-sm text-gray-700">fashion trends</article>
        <article className="lg:text-lg text-sm text-gray-700">wardrobe tips</article>
         
      </div>
      
      {/* Flex container for the 'VIEW ALL' link */}
      <div className="flex justify-center sm:justify-end w-full sm:w-1/5 ">
        <Link to="/" className="flex items-center text-red-600 text-sm hover:text-red-800 ">
          VIEW ALL
          <IoIosArrowForward className="ml-1" />
        </Link>
      </div>
    </div>
    <div className="flex justify-center items-center content-center w-full lg:px-2 md:px-2 px-10">
    <BlogCard/>
    </div>
    
  </section>
  )
}

export default BlogArticles