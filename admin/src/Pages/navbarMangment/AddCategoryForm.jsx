import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2

const AddCategoryForm = () => {
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [subCategories, setSubCategories] = useState([{ name: '', types: [''] }]);
  const URI = import.meta.env.VITE_API_URL;

  // Add new subcategory to the form
  const handleAddSubCategory = () => {
    setSubCategories([...subCategories, { name: '', types: [''] }]);
  };

  // Remove a subcategory from the form
  const handleRemoveSubCategory = (index) => {
    const updatedSubCategories = subCategories.filter((_, i) => i !== index);
    setSubCategories(updatedSubCategories);
  };

  // Update the name of a subcategory
  const handleSubCategoryChange = (index, event) => {
    const updatedSubCategories = subCategories.map((sub, i) => {
      if (i === index) {
        return { ...sub, name: event.target.value };
      }
      return sub;
    });
    setSubCategories(updatedSubCategories);
  };

  // Update a specific type within a subcategory
  const handleTypeChange = (subIndex, typeIndex, event) => {
    const updatedSubCategories = subCategories.map((sub, i) => {
      if (i === subIndex) {
        const updatedTypes = sub.types.map((type, tIndex) => {
          if (tIndex === typeIndex) {
            return event.target.value;
          }
          return type;
        });
        return { ...sub, types: updatedTypes };
      }
      return sub;
    });
    setSubCategories(updatedSubCategories);
  };

  // Add a new type input to a specific subcategory
  const handleAddType = (subIndex) => {
    const updatedSubCategories = subCategories.map((sub, i) => {
      if (i === subIndex) {
        return { ...sub, types: [...sub.types, ''] };
      }
      return sub;
    });
    setSubCategories(updatedSubCategories);
  };

  // Remove empty types and submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Filter out empty strings from the 'types' array
    const filteredSubCategories = subCategories.map((sub) => ({
      name: sub.name,
      types: sub.types.filter((type) => type.trim() !== ''), // Remove empty strings
    }));

    // Create the data object
    const data = {
      category,
      subCategory,
      subCategoryData: filteredSubCategories,
    };

    try {
      await axios.post(`${URI}api/navbar/categories`, data); // Assuming your backend API is at /category
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Category added successfully!',
      });
    } catch (error) {
      console.error('Error adding category:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to add category.',
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-gray-200 shadow-md rounded-lg w-full">
      <h2 className="text-2xl font-bold mb-4">Add New Category</h2>
      <form onSubmit={handleSubmit}>

        {/* Category Name Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        {/* Subcategory Name Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Subcategory</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            required
          />
        </div>

        {/* Subcategories and Types */}
        {subCategories.map((sub, subIndex) => (
          <div key={subIndex} className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Subcategory Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sub.name}
              onChange={(e) => handleSubCategoryChange(subIndex, e)}
              required
            />

            {sub.types.map((type, typeIndex) => (
              <div key={typeIndex} className="flex items-center mt-2">
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={type}
                  onChange={(e) => handleTypeChange(subIndex, typeIndex, e)}
                />
              </div>
            ))}

            {/* Add Type Button */}
            <button
              type="button"
              className="mt-2 px-3 py-2 bg-green-500 text-white rounded-md"
              onClick={() => handleAddType(subIndex)}
            >
              Add Type
            </button>

            {/* Remove Subcategory Button */}
            <button
              type="button"
              className="mt-2 ml-4 px-3 py-2 bg-red-500 text-white rounded-md"
              onClick={() => handleRemoveSubCategory(subIndex)}
            >
              Remove Subcategory
            </button>
          </div>
        ))}

        {/* Add another subcategory */}
        <button
          type="button"
          className="mb-4 px-3 py-2 bg-blue-500 text-white rounded-md"
          onClick={handleAddSubCategory}
        >
          Add Subcategory
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-4 py-2 ml-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCategoryForm;
