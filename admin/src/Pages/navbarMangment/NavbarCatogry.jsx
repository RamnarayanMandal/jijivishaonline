import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import AddCategoryForm from './AddCategoryForm';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2

export const NavbarCategory = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const URI = import.meta.env.VITE_API_URL;

  // Fetch data from API
  useEffect(() => {
    fetch(`${URI}api/navbar/categories`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Filter data based on search query
  const filteredData = data.filter((item) =>
    item.category.toLowerCase().includes(searchQuery) ||
    item.subCategory.toLowerCase().includes(searchQuery) ||
    item.subCategoryData.some((sub) =>
      sub.name.toLowerCase().includes(searchQuery) ||
      sub.types.some((type) => type.toLowerCase().includes(searchQuery))
    )
  );

  // Open Add Modal
  const openAddModal = () => setIsAddModalOpen(true);

  // Open Update Modal
  const openUpdateModal = (category) => {
    setSelectedCategory(category);
    setIsUpdateModalOpen(true);
  };

  // Delete Category with SweetAlert2
  const openDeleteModal = (category) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(category);
      }
    });
  };

  // Handle delete confirmation
  const handleDelete = async (category) => {
    console.log(category)
    try {
      const resp = await axios.delete(`${URI}api/categories/${category._id}`);
      if (resp.status === 200) {
        setData(data.filter((item) => item._id !== category._id));
        Swal.fire('Deleted!', 'Your category has been deleted.', 'success');
      }
    } catch (error) {
      Swal.fire('Error!', 'Failed to delete category.', 'error');
    }
  };

  return (
    <div className="p-4 font-sans w-full">
      <h1 className="text-2xl font-semibold my-4">NavBar Management</h1>
      <div className="flex justify-between gap-2 flex-wrap items-center">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="flex-1 max-w-xs p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button onClick={openAddModal}>Add Category</Button>
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-black">Add Category</h2>
              <button className="text-gray-500 hover:text-gray-700 text-4xl" onClick={() => setIsAddModalOpen(false)}>
                &times;
              </button>
            </div>
            <AddCategoryForm onClose={() => setIsAddModalOpen(false)} />
          </div>
        </div>
      )}

      {/* Update Modal */}
      {isUpdateModalOpen && selectedCategory && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-black">Update Category</h2>
              <button className="text-gray-500 hover:text-gray-700 text-4xl" onClick={() => setIsUpdateModalOpen(false)}>
                &times;
              </button>
            </div>
            <AddCategoryForm initialData={selectedCategory} isEditing={true} onClose={() => setIsUpdateModalOpen(false)} />
          </div>
        </div>
      )}

      {/* Table to display data */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-800 p-4">
            <th >Category</th>
            <th >Subcategory</th>
            <th >Subcategory Data</th>
            <th >Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item._id} className='bg-gray-500 border-b text-center'>
              <td >{item.category}</td>
              <td >{item.subCategory}</td>
              <td >
                {item.subCategoryData.map((sub) => (
                  <div key={sub._id}>
                    <p className='text-center font-semibold'>{sub.name}</p>
                    <ul className='flex flex-wrap  justify-center items-center content-center gap-4 px-2'>
                      {sub.types.map((type, index) => (
                        <li key={index}>{type}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </td>
              <td className=" p-4 text-center flex justify-center items-center  flex-wrap gap-2">
                <Button className="" onClick={() => openUpdateModal(item)}>
                  Update
                </Button>
                <Button className="bg-red-500 text-white" onClick={() => openDeleteModal(item)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NavbarCategory;
