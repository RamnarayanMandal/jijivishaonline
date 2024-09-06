import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from "react-modal";
import { Button } from '@/components/ui/button';

const ProductDetails = ({ product, fetchProducts }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const URI = import.meta.env.VITE_API_URL;

  // Handle the delete action
  const handleDelete = async () => {
    try {
      await axios.delete(`${URI}api/admin/deleteproduct/${product._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchProducts(); // Refresh products after deletion
      setIsModalOpen(false); // Close the modal after deletion
    } catch (error) {
      console.error("Error deleting product", error.message);
    }
  };

  return (
    <>
      <tr className="bg-white border-b hover:bg-gray-50">
        <td className="px-6 py-4">
          <img src={`${URI}${product.thumbnail}`} alt="" className='w-20 h-20 rounded-md' />
        </td>
        <td className="px-6 py-4">{product.title}</td>
        <td className="px-6 py-4">{product.productCode}</td>
        <td className="px-6 py-4">{product.category}</td>
        <td className="px-6 py-4">{product.subcategory}</td>
        <td className="px-6 py-4">₹ {product.price}</td>
        <td className="px-6 py-4">{product.discount}</td>
        <td className="px-6 py-4">{product.typeOfProduct}</td>
        <td className="px-6 py-4 flex space-x-4">
          <button 
            onClick={() => {
              navigate("/Product-Details", { state: { product } });
            }} 
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            View Details
          </button>
          <button 
            onClick={() => {
              navigate("/UpdateProduct", { state: { product } });
            }} 
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
          >
            Update
          </button>
          {/* Trigger modal on delete button click */}
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </td>
      </tr>

      {/* Confirmation Modal for Deletion */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Confirm Deletion"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="p-5 border rounded">
          <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
          <p className="mb-4">Are you sure you want to delete this product? This action cannot be undone.</p>
          <div className="flex justify-end gap-5">
            <Button
              className="bg-red-500 text-white hover:bg-red-800  px-4 py-2 rounded"
              onClick={handleDelete}
            >
              Yes, delete it!
            </Button>
            <Button
              className="bg-gray-500 text-white hover:bg-gray-700 px-4 py-2 rounded"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProductDetails;
