// BlogDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BlogDetails = () => {
    const URI = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(`${URI}api/admin/blogs/${id}`);
        setBlog(response.data.blog);
      } catch (error) {
        console.error('Error fetching blog details:', error);
      }
    };

    fetchBlogDetails();
  }, [id]);

  const handleBackClick = () => {
    navigate(-1);
  };

  if (!blog) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4 lg:px-40">
      <button
        onClick={handleBackClick}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
      >
        Back
      </button>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={`${URI}${blog.image}`}
          alt={blog.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
          <p className="text-gray-600 mb-4">{new Date(blog.createdAt).toLocaleDateString()}</p>
          <p className="text-gray-800 text-lg">{blog.description}</p>
        </div>
        <div className="p-6 bg-gray-100 border-t">
          <p className="text-sm text-gray-500">Author: {blog.author}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
