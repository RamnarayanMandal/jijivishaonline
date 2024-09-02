import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Initial categories and subcategories data
const initialCategories = [
  {
    category: "InteriorDesign",
    subcategories: [
      "Full Home Interior",
      "Wardrobe",
      "Kitchen",
      "Living Room",
      "False Ceiling",
      "Interior Lighting",
    ],
  },
  {
    category: "Curtains",
    subcategories: ["Readymade Curtains", "Customized Curtains"],
  },
  {
    category: "Blinds",
    subcategories: [
      "Roman Blinds",
      "Zebra Blinds",
      "Wooden Blinds",
      "PVC Blinds",
      "Roller Blinds",
    ],
  },
  {
    category: "Mattress",
    subcategories: ["Peps Mattress"],
  },
  {
    category: "Wallpapers",
    subcategories: [
      "Customized Wallpapers",
      "Imported Wallpapers",
      "Foam Panels",
      "Kitchen Wallpapers",
      "Bathroom Wallpapers",
    ],
  },
  {
    category: "Furniture",
    subcategories: [
      "Customized Sofa Set",
      "Customized Bed",
      "Customized Dining Table & Chair",
    ],
  },
  {
    category: "Flooring",
    subcategories: [
      "Wooden Flooring",
      "Vinyl Flooring",
      "Artificial Grass",
      "Wall-to-wall Carpet",
      "Carpet Tiles",
      "Handmade Carpets",
      "Gym Tiles",
    ],
  },
];

export const AddProduct = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState(initialCategories);
  const [newCategory, setNewCategory] = useState('');
  const [newSubcategory, setNewSubcategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const navigate = useNavigate();
  const URI = import.meta.env.VITE_API_URL;

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Append form fields to formData
    for (const key in data) {
      formData.append(key, data[key]);
    }

    // Append images to formData
    images.forEach((image) => {
      formData.append('files', image);
    });

    try {
      const response = await axios.post(`${URI}api/admin/createProduct`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Product added successfully', response.data);
      navigate("/products");
    } catch (error) {
      console.error('Error adding product', error);
    }
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setSelectedSubcategory('');
  };

  const handleSubcategoryChange = (e) => {
    setSelectedSubcategory(e.target.value);
  };

  const addCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, { category: newCategory, subcategories: [] }]);
      setNewCategory('');
    }
  };

  const addSubcategory = () => {
    if (newSubcategory.trim() && selectedCategory) {
      setCategories(categories.map(cat => 
        cat.category === selectedCategory 
          ? { ...cat, subcategories: [...cat.subcategories, newSubcategory] } 
          : cat
      ));
      setNewSubcategory('');
      setSelectedSubcategory(newSubcategory);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className='flex justify-between items-center my-4'>
        <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
        <Button onClick={() => navigate("/products")}>Back</Button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className='grid grid-cols-1 gap-4'>
          {/* Title */}
          <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-white">Title</label>
              <input
                id="title"
                type="text"
                className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('title', { required: 'Title is required' })}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="descriptions" className="block text-sm font-medium text-white">Description</label>
              <textarea
                id="descriptions"
                className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('descriptions')}
              />
            </div>

            {/* Category Selection */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-white">Category</label>
              <select
                id="category"
                className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('category')}
                onChange={handleCategoryChange}
                value={selectedCategory}
              >
                <option value="">Select Category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat.category}>{cat.category}</option>
                ))}
                <option value="add-new-category">Add New Category</option>
              </select>
              {selectedCategory === 'add-new-category' && (
                <div className="mt-2">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Enter new category"
                    className="block w-full border border-gray-300 text-black rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <Button type="button" onClick={addCategory} className="mt-2">
                    Add Category
                  </Button>
                </div>
              )}
            </div>

            {/* Subcategory Selection */}
            {selectedCategory && selectedCategory !== 'add-new-category' && (
              <div>
                <label htmlFor="subcategory" className="block text-sm font-medium text-white">Subcategory</label>
                <select
                  id="subcategory"
                  className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  {...register('subcategory')}
                  onChange={handleSubcategoryChange}
                  value={selectedSubcategory}
                >
                  <option value="">Select Subcategory</option>
                  {categories.find(cat => cat.category === selectedCategory)?.subcategories.map((sub, index) => (
                    <option key={index} value={sub}>{sub}</option>
                  ))}
                  <option value="add-new-subcategory">Add New Subcategory</option>
                </select>
                {selectedSubcategory === 'add-new-subcategory' && (
                  <div className="mt-2">
                    <input
                      type="text"
                      value={newSubcategory}
                      onChange={(e) => setNewSubcategory(e.target.value)}
                      placeholder="Enter new subcategory"
                      className="block w-full border border-gray-300 text-black rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <Button type="button" onClick={addSubcategory} className="mt-2">
                      Add Subcategory
                    </Button>
                  </div>
                )}
              </div>
            )}
             <div>
              <label htmlFor="price" className="block text-sm font-medium text-white">Price</label>
              <input
                id="price"
                type="number"
                className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('price', { required: 'Price is required', valueAsNumber: true })}
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
            </div>

            {/* Discount */}
            <div>
              <label htmlFor="discount" className="block text-sm font-medium text-white">Discount</label>
              <input
                id="discount"
                type="number"
                className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('discount', { valueAsNumber: true })}
              />
            </div>

            {/* Total Price */}
            <div>
              <label htmlFor="totalPrice" className="block text-sm font-medium text-white">Total Price</label>
              <input
                id="totalPrice"
                type="number"
                className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('totalPrice', { valueAsNumber: true })}
              />
            </div>

            {/* SKU Code */}
            <div>
              <label htmlFor="skuCode" className="block text-sm font-medium text-white">SKU Code</label>
              <input
                id="skuCode"
                type="text"
                className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('skuCode')}
              />
            </div>

            {/* Rating */}
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-white">Rating</label>
              <input
                id="rating"
                type="text"
                className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('rating')}
              />
            </div>

            {/* Product Collection */}
            <div>
              <label htmlFor="productCollection" className="block text-sm font-medium text-white">Product Collection</label>
              <input
                id="productCollection"
                type="text"
                className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('productCollection')}
              />
            </div>

            {/* Pattern Number */}
            <div>
              <label htmlFor="patternNumber" className="block text-sm font-medium text-white">Pattern Number</label>
              <input
                id="patternNumber"
                type="text"
                className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('patternNumber')}
              />
            </div>

            {/* Roll Size */}
            <div>
              <label htmlFor="RollSize" className="block text-sm font-medium text-white">Roll Size</label>
              {/* Handling RollSize as a JSON string */}
              <textarea
                id="RollSize"
                className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('RollSize')}
                placeholder='Format: [{"height": "value", "weight": "value"}]'
              />
            </div>

            {/* MRP Roll */}
            <div>
              <label htmlFor="mrp_roll" className="block text-sm font-medium text-white">MRP Roll</label>
              <input
                id="mrp_roll"
                type="text"
                className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('mrp_roll')}
              />
            </div>

            {/* Quality */}
            <div>
              <label htmlFor="quality" className="block text-sm font-medium text-white">Quality</label>
              <input
                id="quality"
                type="text"
                className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('quality')}
              />
            </div>

            {/* Color */}
            <div>
              <label htmlFor="color" className="block text-sm font-medium text-white">Color</label>
              <input
                id="color"
                type="text"
                className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('color')}
              />
            </div>

            {/* End Use */}
            <div>
              <label htmlFor="endUse" className="block text-sm font-medium text-white">End Use</label>
              <input
                id="endUse"
                type="text"
                className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('endUse')}
              />
            </div>

            {/* Compositions */}
            <div>
              <label htmlFor="compositions" className="block text-sm font-medium text-white">Compositions</label>
              <input
                id="compositions"
                type="text"
                className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('compositions')}
              />
            </div>

            {/* GSM */}
            <div>
              <label htmlFor="gsm" className="block text-sm font-medium text-white">GSM</label>
              <input
                id="gsm"
                type="text"
                className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('gsm')}
              />
            </div>

            {/* Martindale */}
            <div>
              <label htmlFor="martindale" className="block text-sm font-medium text-white">Martindale</label>
              <input
                id="martindale"
                type="text"
                className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('martindale')}
              />
            </div>

            {/* Material */}
            <div>
              <label htmlFor="material" className="block text-sm font-medium text-white">Material</label>
              <input
                id="material"
                type="text"
                className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('material')}
              />
            </div>


            {/* Other Input Fields (Price, Discount, etc.) */}
            {/* Continue adding your input fields here... */}

            {/* Image Upload */}
            <div>
              <label htmlFor="images" className="block text-sm font-medium text-white">Upload Images</label>
              <input
                id="images"
                type="file"
                className="mt-1 block w-full  border text-white border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={handleImageChange}
                multiple
              />
            </div>
          </div>


          {/* Submit Button */}
          <div>
            <Button type="submit" className="mt-4">Add Product</Button>
          </div>
        </div>
      </form>
    </div>
  );
};
