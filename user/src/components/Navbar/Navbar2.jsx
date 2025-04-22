import React, { useState, useRef, useEffect } from 'react';
import Modal from '../../Modal/Modal'; // Adjust the import path as needed
import axios from 'axios';

const Navbar2 = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [expandedSubcategories, setExpandedSubcategories] = useState({});
  const [activeCategory, setActiveCategory] = useState('');
  const [menuItems, setMenuItems] = useState([]); // Store fetched menu items
  const modalRef = useRef(null);

  const URI = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${URI}api/navbar/categories`);
      console.log('API Response:', response.data);

      if (Array.isArray(response.data)) {
        setMenuItems(response.data); // Store fetched data
      } else {
        console.error('Unexpected API response format:', response.data);
        setMenuItems([]); // Prevent errors if response is invalid
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setMenuItems([]); // Prevent crashes in case of API failure
    }
  };

  // Ensure menuItems is an array before using reduce
  const groupedItems = Array.isArray(menuItems)
    ? menuItems.reduce((acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
      }, {})
    : {};

  // Handle click event for the navbar items
  const handleItemClick = (category) => {
    setActiveCategory(category);
    setModalData(groupedItems[category] || []);
    setModalOpen(true);
  };

  // Toggle expanded state for subcategories
  const toggleSubcategories = (subCategoryName) => {
    setExpandedSubcategories((prev) => ({
      ...prev,
      [subCategoryName]: !prev[subCategoryName],
    }));
  };

  // Handle click outside to close the modal
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full border-y-[2px] flex justify-center items-center">
      <ul className="flex flex-wrap justify-around py-2 text-sm md:text-base items-center content-center lg:w-8/12">
        {Object.keys(groupedItems).map((category, index) => (
          <li
            key={index}
            className={`relative px-2 py-1 cursor-pointer ${
              activeCategory === category ? 'text-red-600 font-bold' : ''
            }`}
            onClick={() => handleItemClick(category)}
          >
            <div className="font-semibold text-gray-800 text-sm">{category}</div>
          </li>
        ))}
      </ul>

      {modalOpen && (
        <Modal
          ref={modalRef}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          categoryData={modalData}
          expandedSubcategories={expandedSubcategories}
          toggleSubcategories={toggleSubcategories}
        />
      )}
    </div>
  );
};

export default Navbar2;
