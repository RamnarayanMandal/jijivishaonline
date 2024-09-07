import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BlogsList = () => {
  const [blogs, setBlogs] = useState([]);
  const URI = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${URI}api/admin/blogs`);
        const sortedBlogs = response.data.blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setBlogs(sortedBlogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, [URI]);

  const handleEdit = (id) => {
    navigate(`/edit-blog/${id}`); // Navigate to the edit page for the blog
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${URI}api/admin/blogs/${id}`);
      setBlogs(blogs.filter(blog => blog._id !== id)); // Remove the deleted blog from state
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Blogs List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            <img
              src={`${URI}${blog.image}`}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-black">{blog.title}</h2>
              <div className="flex justify-between">
                <button
                  onClick={() => handleEdit(blog._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogsList;
