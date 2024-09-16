import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddCategoryForm = ({ initialData = null, isEditing = false, onClose }) => {
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [subCategories, setSubCategories] = useState([{ name: '', types: [''] }]);

  const URI = import.meta.env.VITE_API_URL;

  // Populate form with initial data if editing
  useEffect(() => {
    if (isEditing && initialData) {
      setCategory(initialData.category);
      setSubCategory(initialData.subCategory);
      setSubCategories(initialData.subCategoryData);
    }
  }, [isEditing, initialData]);

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

  // Remove a type input from a specific subcategory
  const handleRemoveType = (subIndex, typeIndex) => {
    const updatedSubCategories = subCategories.map((sub, i) => {
      if (i === subIndex) {
        return { ...sub, types: sub.types.filter((_, tIndex) => tIndex !== typeIndex) };
      }
      return sub;
    });
    setSubCategories(updatedSubCategories);
  };

  // Submit form
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = { category, subCategory, subCategoryData: subCategories };

    try {
      if (isEditing) {
        await axios.put(`${URI}api/navbar/categories/${initialData._id}`, formData);
        Swal.fire('Success', 'Category updated successfully', 'success');
      } else {
        await axios.post(`${URI}api/navbar/categories`, formData);
        Swal.fire('Success', 'Category added successfully', 'success');
      }
      onClose();
    } catch (error) {
      Swal.fire('Error', 'Something went wrong', 'error');
    }
  };

  return (
    <div className="w-full max-h-screen overflow-y-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border rounded-md"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="subCategory">Subcategory</label>
          <input
            type="text"
            id="subCategory"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="p-2 border rounded-md"
            required
          />
        </div>

        {subCategories.map((sub, subIndex) => (
          <div key={subIndex} className="border p-4 rounded-md space-y-2">
            <div className="flex flex-col">
              <label htmlFor={`subName-${subIndex}`}>Subcategory Name</label>
              <input
                type="text"
                id={`subName-${subIndex}`}
                value={sub.name}
                onChange={(e) => handleSubCategoryChange(subIndex, e)}
                className="p-2 border rounded-md"
                required
              />
            </div>

            {sub.types.map((type, typeIndex) => (
              <div key={typeIndex} className="flex items-center">
                <input
                  type="text"
                  value={type}
                  onChange={(e) => handleTypeChange(subIndex, typeIndex, e)}
                  className="p-2 border rounded-md flex-1"
                />
                {sub.types.length > 1 && (
                  <button
                    type="button"
                    className="ml-2 bg-red-500 text-white px-2 py-1 rounded-md"
                    onClick={() => handleRemoveType(subIndex, typeIndex)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              className="mt-2 bg-green-500 text-white px-2 py-1 rounded-md"
              onClick={() => handleAddType(subIndex)}
            >
              Add Type
            </button>

            {subCategories.length > 1 && (
              <button
                type="button"
                className="ml-4 mt-2 bg-red-500 text-white px-2 py-1 rounded-md"
                onClick={() => handleRemoveSubCategory(subIndex)}
              >
                Remove Subcategory
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          className="mb-4 bg-blue-500 text-white px-3 py-2 rounded-md"
          onClick={handleAddSubCategory}
        >
          Add Subcategory
        </button>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          {isEditing ? 'Update Category' : 'Add Category'}
        </button>
      </form>
    </div>
  );
};

export default AddCategoryForm;
