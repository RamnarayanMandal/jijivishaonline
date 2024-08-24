import React, { useState, useRef, useEffect } from 'react';
import Modal from '../../Modal/Modal'; // Adjust the import path as needed

const Navbar2 = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const modalRef = useRef(null);

  const menuItems = [
    { name: 'WOMEN', subName: "Apparel", subcategories: ['Dresses', 'Tops', 'Skirts'] },
    { name: 'WOMEN', subName: "Sarees", subcategories: ['Dresses', 'Tops', 'Skirts', 'Baatik', 'Jamdani', 'Ikkat'] },
    { name: 'WOMEN', subName: "Jewellery", subcategories: ['Necklaces', 'Earrings', 'Rings'] },
    { name: 'WOMEN', subName: "Handbags", subcategories: ['Totes', 'Clutches', 'Crossbody'] },
    { name: 'MEN', subName: "", subcategories: ['Shirts', 'Trousers', 'Accessories'] },
    { name: 'FABRICS', subName: "", subcategories: ['Cotton', 'Silk', 'Linen'] },
    { name: 'PERSONAL CARE', subName: "", subcategories: ['Skincare', 'Haircare', 'Fragrance'] },
    { name: 'HOME CARE', subName: "", subcategories: ['Cleaning', 'Laundry', 'Organizers'] },
    { name: 'HOME DECOR', subName: "", subcategories: ['Furniture', 'Wall Art', 'Lighting'] },
    { name: 'GALLERY', subName: "", subcategories: ['New Arrivals', 'Best Sellers', 'Clearance'] },
  ];

  // Group items by category name
  const groupedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.name]) {
      acc[item.name] = [];
    }
    acc[item.name].push(item);
    return acc;
  }, {});

  // Handle click event for the navbar items
  const handleItemClick = (category) => {
    setModalData(groupedItems[category]);
    setModalOpen(true);
  };

  // Handle click outside to close the modal
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setModalOpen(false);
    }
  };

  useEffect(() => {
    // Attach event listener for clicks outside of the modal
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='w-full  border-y-[2px] flex justify-center items-center '>
      <ul className='flex flex-wrap justify-around py-2 text-sm md:text-base items-center content-center lg:w-8/12'>
        {Object.keys(groupedItems).map((category, index) => (
          <li
            key={index}
            className='relative px-2 py-1 cursor-pointer'
            onClick={() => handleItemClick(category)}
          >
            <div className='font-semibold text-gray-800 text-sm '>
              {category}
            </div>
          </li>
        ))}
      </ul>
      {modalOpen && (
        <Modal
          ref={modalRef}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          categoryData={modalData}
        />
      )}
    </div>
  );
};

export default Navbar2;
