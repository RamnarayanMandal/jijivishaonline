// BlogDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MetaTags from '../../MetaTags';
import DOMPurify from 'dompurify'; // To sanitize HTML content

const BlogDetails = () => {
  const URI = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(`${URI}api/admin/blogs/${id}`);
        setBlog(response.data.blog);
        setError(null); // Reset error if successful
      } catch (error) {
        console.error('Error fetching blog details:', error);
        setError('Failed to load blog details');
      }
    };

    fetchBlogDetails();
  }, [id]);

  const handleBackClick = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/blogs'); // Default route fallback
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!blog) {
    return <p>Loading...</p>; // You can use a spinner component here for better UX
  }

  return (
    <>
      <MetaTags
        title={blog.title}
        description={blog.description}
       // keywords={blog.tags.join(', ')} // Assuming tags is an array
        image={blog.image}
        url={`${URI}api/admin/blogs/${id}`} // Dynamic URL based on blog ID
      />
      <div className="container mx-auto p-4 lg:px-40">
        <button
          onClick={handleBackClick}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
        >
          Back
        </button>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src={blog.image ? `${URI}${blog.image}` : '/path/to/fallback-image.jpg'} // Fallback image
            alt={blog.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
            <p className="text-gray-600 mb-4">
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>
            <p
              className="text-gray-800 text-lg"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.description) }} // Sanitize description if it's HTML
            />
          </div>
          <div className="p-6 bg-gray-100 border-t">
            <p className="text-sm text-gray-500">Author: {blog.author}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
