import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const BlogShow = () => {
  const URI = import.meta.env.VITE_API_URL;
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate(); // Get the navigate function

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${URI}api/admin/blogs`);
        const sortedBlogs = response.data.blogs.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        setBlogs(sortedBlogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const handleBlogClick = (id) => {
    navigate(`/blogsdetails/${id}`); // Navigate to the blog details page
  };

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-[#ffffff] border-2 shadow-lg overflow-hidden hover:border-black transition-transform duration-300 transform hover:scale-105 cursor-pointer"
            onClick={() => handleBlogClick(blog._id)} // Add onClick handler here
          >
            <div className="overflow-hidden">
              <img
                src={`${URI}${blog.image}`}
                alt={blog.title}
                className="w-full object-cover h-64"
              />
            </div>
            <div className="p-4 flex flex-col justify-between">
              <div>
                <p className="my-2 text-sm text-gray-600">
                  {new Date(blog.updatedAt).toLocaleDateString()}
                </p>
                <p className="font-semibold text-lg mb-2">
                  {blog.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
