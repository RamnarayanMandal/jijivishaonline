import React, { useEffect, useState } from 'react';
import ProductDetails from './ProductDetails';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const ProductHomePage = () => {
  const [products, setProducts] = useState([]); // Initialize as empty array
  const [filteredProducts, setFilteredProducts] = useState([]); // Initialize as empty array
  const [category, setcategory] = useState([]); // Initialize as empty array
  const [selectedcategory, setSelectedcategory] = useState('All'); // Default category selection
  const navigate = useNavigate();

  const URI = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const resp = await axios.get(`${URI}api/admin/getAllproducts`);
      const productData = Array.isArray(resp.data.products) ? resp.data.products : []; // Ensure data is an array
      setProducts(productData);
      setFilteredProducts(productData);

      // Extract unique category only if productData is not empty
      const uniquecategory = Array.isArray(productData) && productData.length > 0 
        ? [...new Set(productData.map(product => product.category))] 
        : [];
      setcategory(uniquecategory);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]); // Reset products state to empty array on error
      setFilteredProducts([]); // Reset filtered products state to empty array on error
    }
  };

  const handlecategoryChange = (event) => {
    const category = event.target.value;
    setSelectedcategory(category);
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className='lg:px-20 md:px-20 px-5 py-5'>
      <div className="flex justify-between content-center items-center my-4 px-10">
        <select value={selectedcategory} onChange={handlecategoryChange} className="p-2 text-black border rounded">
          <option value="All">All category</option>
          {category.map((category, index) => (
            <option key={index} value={category} className='text-black'>
              {category}
            </option>
          ))}
        </select>
        <Button onClick={() => navigate("/AddProduct")}>ADD Product</Button>
      </div>
      <div className='grid lg:grid-cols-3 gap-4 md:grid-cols-2 grid-cols-1 relative'>
        {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
          filteredProducts.map((prod) => (
            <ProductDetails key={prod._id} product={prod} fetchProduct={fetchProducts} />
          ))
        ) : (
          <p className=''>No products available</p> // Fallback message if no products
        )}
      </div>
    </div>
  );
};
