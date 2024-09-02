import React, { useEffect, useState } from 'react';
import ProductDetails from './ProductDetails';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const ProductHomePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedcategories, setSelectedcategories] = useState('All');
  const navigate = useNavigate();

  const URI = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const resp = await axios.get(`${URI}api/admin/products`);
      const productData = resp.data;
      setProducts(productData);
      setFilteredProducts(productData);

      // Extract unique categories from the product data
      const uniqueCategories = [...new Set(productData.map(product => product.categories))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handlecategoriesChange = (event) => {
    const categories = event.target.value;
    setSelectedcategories(categories);
    if (categories === 'All') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.categories === categories);
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className='lg:px-20 md:px-20 px-5 py-5'>
      <div className="flex justify-between content-center items-center my-4 px-10">
       
        <select value={selectedcategories} onChange={handlecategoriesChange} className="p-2 text-black border rounded">
          <option value="All">All Categories</option>
          {categories.map((categories, index) => (
            <option key={index} value={categories} className='text-black'>
              {categories}
            </option>
          ))}
        </select>
        <Button onClick={() => navigate("/AddProduct")}>ADD Product</Button>
      </div>
    <div className='grid lg:grid-cols-3 gap-4 md:grid-cols-2 grid-cols-1  relative'>
      
      {filteredProducts.map((prod) => (
        <ProductDetails key={prod._id} product={prod} fetchProduct={fetchProducts} />
      ))}
    </div>
    </div>
  );
};
