import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import JoditEditor from 'jodit-react';

const BlogsList = () => {
  const [blogs, setBlogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const navigate = useNavigate();
  const editor = useRef(null); // Using ref for the editor instance
  const URI = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${URI}api/admin/blogs`);
        const sortedBlogs = response.data.blogs.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setBlogs(sortedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [URI]);

  const handleEdit = (blog) => {
    setCurrentBlog(blog);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${URI}api/admin/blogs/${id}`);
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("title", currentBlog.title);
      formData.append("description", currentBlog.description);
      formData.append("image", currentBlog.image);
      formData.append("author", currentBlog.author);

      const { _id } = currentBlog;
      await axios.put(`${URI}api/admin/blogs/${_id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setBlogs(blogs.map((blog) => (blog._id === _id ? currentBlog : blog)));
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files) {
      setCurrentBlog({ ...currentBlog, image: files[0] });
    } else {
      setCurrentBlog({ ...currentBlog, [name]: value });
    }
  };

  const handleDescriptionChange = (content) => {
    setCurrentBlog({ ...currentBlog, description: content });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between">
        <Link to="/Manage-Blogs">
          <Button className="lg:text-3xl text-xl font-bold mb-6 mx-2 py-5">
            Create Blogs
          </Button>
        </Link>
        <Link to="/dashboard">
          <Button className="bg-red-600 text-white text-xl hover:text-black">
            <KeyboardBackspaceIcon />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={`${URI}${blog.image}`}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-black">
                {blog.title}
              </h2>
              <div className="flex justify-between">
                <button
                  onClick={() => handleEdit(blog)}
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

      {isModalOpen && currentBlog && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-start justify-center pt-5 overflow-y-auto">
          <div className="bg-white p-2 sm:p-4 md:p-6 rounded-lg shadow-lg w-full max-w-lg md:w-1/2 max-h-full overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 text-black">Edit Blog</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={currentBlog.title}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded text-black"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <JoditEditor
                ref={editor}
                value={currentBlog.description}
                onBlur={handleDescriptionChange} // Use onBlur to handle editor changes
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Image
              </label>
              <input
                type="file"
                name="image"
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded text-black"
              />
              {currentBlog.image && typeof currentBlog.image === "string" && (
                <img
                  src={`${URI}${currentBlog.image}`}
                  alt="Selected"
                  className="w-full h-28 object-cover mb-4"
                />
              )}
              {currentBlog.image && typeof currentBlog.image !== "string" && (
                <img
                  src={URL.createObjectURL(currentBlog.image)}
                  alt="Selected"
                  className="w-full h-48 object-cover mb-4"
                />
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Author
              </label>
              <input
                type="text"
                name="author"
                value={currentBlog.author}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded text-black"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogsList;
