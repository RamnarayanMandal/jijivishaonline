import React, { useEffect, useState } from 'react';
import ProductDetails from './ProductDetails'; // Ensure ProductDetails shows table data
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const ProductHomePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10); // Products per page
  const navigate = useNavigate();

  const URI = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const resp = await axios.get(`${URI}api/admin/getAllproducts`);
      const productData = Array.isArray(resp.data.products) ? resp.data.products : [];
      const sortedProductData = productData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setProducts(sortedProductData);
      setFilteredProducts(sortedProductData);

      const uniqueCategory = Array.isArray(productData) && productData.length > 0 
        ? [...new Set(productData.map(product => product.category))] 
        : [];
      setCategory(uniqueCategory);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
      setFilteredProducts([]);
    }
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to page 1 on category change
    filterProducts(searchTerm, category);
  };

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    setCurrentPage(1); // Reset to page 1 on search change
    filterProducts(term, selectedCategory);
  };

  const filterProducts = (term, category) => {
    let filtered = products;

    if (category !== 'All') {
      filtered = filtered.filter(product => product.category === category);
    }

    if (term) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(term.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  // Get current products for the page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='overflow-hidden px-5 py-5'>
      <div className="flex justify-between content-center items-center my-4 ">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search product by title..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 w-full border rounded mr-4 text-black"
          />
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="p-2 text-black border rounded"
          >
            <option value="All">All category</option>
            {category.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <Button onClick={() => navigate("/AddProduct")}>ADD Product</Button>
      </div>

      {/* Table with horizontal scroller */}
      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
        {currentProducts.length > 0 ? (
          <table className="min-w-full text-sm text-left text-gray-500 table-auto">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Image</th>
                <th scope="col" className="px-6 py-3">Product Name</th>
                <th scope="col" className="px-6 py-3">Product Code</th>
                <th scope="col" className="px-6 py-3">Category</th>
                <th scope="col" className="px-6 py-3">Subcategory</th>
                <th scope="col" className="px-6 py-3">Price</th>
                <th scope="col" className="px-6 py-3">Type Of Product</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product) => (
                <ProductDetails key={product._id} product={product} fetchProducts={fetchProducts} />
              ))}
            </tbody>
          </table>
        ) : (
          <p>No products available</p>
        )}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center mt-4">
        <nav>
          <ul className="inline-flex -space-x-px">
            <li>
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
              >
                Previous
              </button>
            </li>
            {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-2 leading-tight ${
                    currentPage === index + 1
                      ? 'text-white bg-blue-500'
                      : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700'
                  } border border-gray-300`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(filteredProducts.length / productsPerPage)}
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
