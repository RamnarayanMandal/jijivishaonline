import React, { useState, useRef, useEffect } from 'react';
import Modal from '../../Modal/Modal'; // Adjust the import path as needed

const Navbar2 = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [expandedSubcategories, setExpandedSubcategories] = useState({});
  const [activeCategory, setActiveCategory] = useState(false);
  const modalRef = useRef(null);

  const menuItems = [
    {
      name: 'WOMEN',
      subName: 'Apparel',
      categoriesData: [
        {
          subcategories: 'Kurta Sets',
          subcategoriesTypes: ['Kurta Sets', 'Kurta Setss', 'Kurta Sets', 'Kurta Sets'],
        },
        {
          subcategories: 'Sarees',
          subcategoriesTypes: ['Sarees', 'Sarees', 'Pants', 'Palazzos'],
        },
        {
          subcategories: 'Bottom Wear',
          subcategoriesTypes: ['Churidars', 'Skirts', 'Pants', 'Palazzos'],
        },
        {
          subcategories: 'Dress Material',
          subcategoriesTypes: ['Printed Dress Material', 'Embroidered Dress Material', 'Cotton Dress Material'],
        },
        {
          subcategories: 'Kaftans',
          subcategoriesTypes: ['Printed Kaftans', 'Embroidered Kaftans', 'Silk Kaftans'],
        },
        {
          subcategories: 'Tops and Tunics',
          subcategoriesTypes: ['Casual Tops', 'Formal Tops', 'Party Tops', 'Tunic Tops'],
        },
        {
          subcategories: 'Kurtas',
          subcategoriesTypes: ['Anarkali Kurtas', 'A-Line Kurtas', 'Straight Kurtas'],
        },
        {
          subcategories: 'Short Kurti',
          subcategoriesTypes: ['Printed Short Kurti', 'Solid Short Kurti', 'Embroidered Short Kurti'],
        },
        {
          subcategories: 'Lounge Wear',
          subcategoriesTypes: ['Lounge Sets', 'Night Dresses', 'Robes'],
        },
      ],
    },
    {
      name: 'WOMEN',
      subName: 'Sarees',
      categoriesData: [
        {
          subcategories: 'Kurta Sets',
          subcategoriesTypes: ['Kurta Sets', 'Kurta Setss', 'Kurta Sets', 'Kurta Sets'],
        },
        {
          subcategories: 'Sarees',
          subcategoriesTypes: ['Sarees', 'Sarees', 'Pants', 'Palazzos'],
        },
        {
          subcategories: 'Bottom Wear',
          subcategoriesTypes: ['Churidars', 'Skirts', 'Pants', 'Palazzos'],
        },
        {
          subcategories: 'Dress Material',
          subcategoriesTypes: ['Printed Dress Material', 'Embroidered Dress Material', 'Cotton Dress Material'],
        },
        {
          subcategories: 'Kaftans',
          subcategoriesTypes: ['Printed Kaftans', 'Embroidered Kaftans', 'Silk Kaftans'],
        },
        {
          subcategories: 'Tops and Tunics',
          subcategoriesTypes: ['Casual Tops', 'Formal Tops', 'Party Tops', 'Tunic Tops'],
        },
        {
          subcategories: 'Kurtas',
          subcategoriesTypes: ['Anarkali Kurtas', 'A-Line Kurtas', 'Straight Kurtas'],
        },
        {
          subcategories: 'Short Kurti',
          subcategoriesTypes: ['Printed Short Kurti', 'Solid Short Kurti', 'Embroidered Short Kurti'],
        },
        {
          subcategories: 'Lounge Wear',
          subcategoriesTypes: ['Lounge Sets', 'Night Dresses', 'Robes'],
        },
        {
          subcategories: 'Jamdani',
          subcategoriesTypes: ['Traditional Jamdani', 'Modern Jamdani', 'Fusion Jamdani'],
        },
        {
          subcategories: 'Chanderi',
          subcategoriesTypes: ['Silk Chanderi', 'Cotton Chanderi', 'Fusion Chanderi'],
        },
        {
          subcategories: 'Banarasi',
          subcategoriesTypes: ['Traditional Banarasi', 'Silk Banarasi', 'Handwoven Banarasi'],
        },
        {
          subcategories: 'Sambhalpuri',
          subcategoriesTypes: ['Cotton Sambhalpuri', 'Silk Sambhalpuri', 'Handloom Sambhalpuri'],
        },
        {
          subcategories: 'Kalamkari',
          subcategoriesTypes: ['Hand-Painted Kalamkari', 'Block Printed Kalamkari'],
        },
        {
          subcategories: 'Hand Painted',
          subcategoriesTypes: ['Abstract Hand Painted', 'Traditional Hand Painted'],
        },
        {
          subcategories: 'Net Hand',
          subcategoriesTypes: ['Embroidered Net Hand', 'Plain Net Hand'],
        },
        {
          subcategories: 'Embroidery',
          subcategoriesTypes: ['Zari Embroidery', 'Chikankari Embroidery', 'Thread Embroidery'],
        },
        {
          subcategories: 'Leheriya',
          subcategoriesTypes: ['Cotton Leheriya', 'Silk Leheriya'],
        },
        {
          subcategories: 'Bandhej',
          subcategoriesTypes: ['Traditional Bandhej', 'Modern Bandhej'],
        },
        {
          subcategories: 'Applique Work',
          subcategoriesTypes: ['Mirror Applique', 'Thread Applique'],
        },
        {
          subcategories: 'Madhubani',
          subcategoriesTypes: ['Hand-Painted Madhubani', 'Block Printed Madhubani'],
        },
        {
          subcategories: 'Bishnupuri',
          subcategoriesTypes: ['Silk Bishnupuri', 'Cotton Bishnupuri'],
        },
        {
          subcategories: 'Organza',
          subcategoriesTypes: ['Printed Organza', 'Plain Organza'],
        },
        {
          subcategories: 'Patola',
          subcategoriesTypes: ['Traditional Patola', 'Modern Patola'],
        },
        {
          subcategories: 'Baati',
          subcategoriesTypes: ['Printed Baati', 'Plain Baati'],
        },
      ],
    },

    {
      name: 'WOMEN',
      subName: 'Handbags',
      categoriesData: [
        {
          subcategories: 'Clutches',
          subcategoriesTypes: ['Evening Clutches', 'Party Clutches', 'Classic Clutches'],
        },
        {
          subcategories: 'Laptop Bags/Sleeves',
          subcategoriesTypes: ['Leather Laptop Bags', 'Fabric Laptop Sleeves', 'Casual Laptop Bags'],
        },
        {
          subcategories: 'Potlis',
          subcategoriesTypes: ['Embroidered Potlis', 'Silk Potlis', 'Beaded Potlis'],
        },
        {
          subcategories: 'Sling Bags',
          subcategoriesTypes: ['Casual Sling Bags', 'Evening Sling Bags', 'Leather Sling Bags'],
        },
        {
          subcategories: 'Tote Bags',
          subcategoriesTypes: ['Canvas Tote Bags', 'Leather Tote Bags', 'Printed Tote Bags'],
        },
        {
          subcategories: 'Travel Kits',
          subcategoriesTypes: ['Cosmetic Travel Kits', 'Organizational Travel Kits', 'Luxury Travel Kits'],
        },
        {
          subcategories: 'Wallets',
          subcategoriesTypes: ['Leather Wallets', 'Fabric Wallets', 'Slim Wallets'],
        },
        // Existing subcategories from earlier data
        {
          subcategories: 'Kurta Sets',
          subcategoriesTypes: ['Kurta Sets', 'Kurta Setss', 'Kurta Sets', 'Kurta Sets'],
        },
        {
          subcategories: 'Sarees',
          subcategoriesTypes: ['Sarees', 'Sarees', 'Pants', 'Palazzos'],
        },
        {
          subcategories: 'Bottom Wear',
          subcategoriesTypes: ['Churidars', 'Skirts', 'Pants', 'Palazzos'],
        },
        {
          subcategories: 'Dress Material',
          subcategoriesTypes: ['Printed Dress Material', 'Embroidered Dress Material', 'Cotton Dress Material'],
        },
        {
          subcategories: 'Kaftans',
          subcategoriesTypes: ['Printed Kaftans', 'Embroidered Kaftans', 'Silk Kaftans'],
        },
        {
          subcategories: 'Tops and Tunics',
          subcategoriesTypes: ['Casual Tops', 'Formal Tops', 'Party Tops', 'Tunic Tops'],
        },
        {
          subcategories: 'Kurtas',
          subcategoriesTypes: ['Anarkali Kurtas', 'A-Line Kurtas', 'Straight Kurtas'],
        },
        {
          subcategories: 'Short Kurti',
          subcategoriesTypes: ['Printed Short Kurti', 'Solid Short Kurti', 'Embroidered Short Kurti'],
        },
        {
          subcategories: 'Lounge Wear',
          subcategoriesTypes: ['Lounge Sets', 'Night Dresses', 'Robes'],
        },
        {
          subcategories: 'Jamdani',
          subcategoriesTypes: ['Traditional Jamdani', 'Modern Jamdani', 'Fusion Jamdani'],
        },
        {
          subcategories: 'Chanderi',
          subcategoriesTypes: ['Silk Chanderi', 'Cotton Chanderi', 'Fusion Chanderi'],
        },
        {
          subcategories: 'Banarasi',
          subcategoriesTypes: ['Traditional Banarasi', 'Silk Banarasi', 'Handwoven Banarasi'],
        },

        {
          subcategories: 'Net Hand',
          subcategoriesTypes: ['Embroidered Net Hand', 'Plain Net Hand'],
        },
        {
          subcategories: 'Embroidery',
          subcategoriesTypes: ['Zari Embroidery', 'Chikankari Embroidery', 'Thread Embroidery'],
        },
        {
          subcategories: 'Leheriya',
          subcategoriesTypes: ['Cotton Leheriya', 'Silk Leheriya'],
        },
        {
          subcategories: 'Bandhej',
          subcategoriesTypes: ['Traditional Bandhej', 'Modern Bandhej'],
        },
        {
          subcategories: 'Applique Work',
          subcategoriesTypes: ['Mirror Applique', 'Thread Applique'],
        },
        {
          subcategories: 'Madhubani',
          subcategoriesTypes: ['Hand-Painted Madhubani', 'Block Printed Madhubani'],
        },
        {
          subcategories: 'Bishnupuri',
          subcategoriesTypes: ['Silk Bishnupuri', 'Cotton Bishnupuri'],
        },
        {
          subcategories: 'Organza',
          subcategoriesTypes: ['Printed Organza', 'Plain Organza'],
        },
        {
          subcategories: 'Patola',
          subcategoriesTypes: ['Traditional Patola', 'Modern Patola'],
        },
        {
          subcategories: 'Baati',
          subcategoriesTypes: ['Printed Baati', 'Plain Baati'],
        },
      ],
    },

    {
      name: 'WOMEN',
      subName: 'Footwear',
      categoriesData: [
        {
          subcategories: 'Juttis',
          subcategoriesTypes: ['Traditional Juttis', 'Embroidered Juttis', 'Beaded Juttis'],
        },
        {
          subcategories: 'Kolhapuris',
          subcategoriesTypes: ['Leather Kolhapuris', 'Embroidered Kolhapuris', 'Beaded Kolhapuris'],
        },
        {
          subcategories: 'Sandals & Slip-ons',
          subcategoriesTypes: ['Casual Sandals', 'Formal Sandals', 'Slip-on Loafers', 'Slides'],
        },
      ]
    },



    //men

    {
      name: 'MEN',
      subName: 'Apparel',
      categoriesData: [
        {
          subcategories: 'Kurta Sets',
          subcategoriesTypes: ['Kurta Sets', 'Kurta Setss', 'Kurta Sets', 'Kurta Sets'],
        },
        {
          subcategories: 'Sarees',
          subcategoriesTypes: ['Sarees', 'Sarees', 'Pants', 'Palazzos'],
        },
        {
          subcategories: 'Bottom Wear',
          subcategoriesTypes: ['Churidars', 'Skirts', 'Pants', 'Palazzos'],
        },
        {
          subcategories: 'Dress Material',
          subcategoriesTypes: ['Printed Dress Material', 'Embroidered Dress Material', 'Cotton Dress Material'],
        },
        {
          subcategories: 'Kaftans',
          subcategoriesTypes: ['Printed Kaftans', 'Embroidered Kaftans', 'Silk Kaftans'],
        },
        {
          subcategories: 'Tops and Tunics',
          subcategoriesTypes: ['Casual Tops', 'Formal Tops', 'Party Tops', 'Tunic Tops'],
        },
        {
          subcategories: 'Kurtas',
          subcategoriesTypes: ['Anarkali Kurtas', 'A-Line Kurtas', 'Straight Kurtas'],
        },
        {
          subcategories: 'Short Kurti',
          subcategoriesTypes: ['Printed Short Kurti', 'Solid Short Kurti', 'Embroidered Short Kurti'],
        },
        {
          subcategories: 'Lounge Wear',
          subcategoriesTypes: ['Lounge Sets', 'Night Dresses', 'Robes'],
        },
      ],
    },


    {
      name: ' Fabrics',
      subName: 'Apparel',
      categoriesData: [
        {
          subcategories: 'Kurta Sets',
          subcategoriesTypes: ['Kurta Sets', 'Kurta Setss', 'Kurta Sets', 'Kurta Sets'],
        },
        {
          subcategories: 'Sarees',
          subcategoriesTypes: ['Sarees', 'Sarees', 'Pants', 'Palazzos'],
        },
        {
          subcategories: 'Bottom Wear',
          subcategoriesTypes: ['Churidars', 'Skirts', 'Pants', 'Palazzos'],
        },
        {
          subcategories: 'Dress Material',
          subcategoriesTypes: ['Printed Dress Material', 'Embroidered Dress Material', 'Cotton Dress Material'],
        },
        {
          subcategories: 'Kaftans',
          subcategoriesTypes: ['Printed Kaftans', 'Embroidered Kaftans', 'Silk Kaftans'],
        },
        {
          subcategories: 'Tops and Tunics',
          subcategoriesTypes: ['Casual Tops', 'Formal Tops', 'Party Tops', 'Tunic Tops'],
        },
        {
          subcategories: 'Kurtas',
          subcategoriesTypes: ['Anarkali Kurtas', 'A-Line Kurtas', 'Straight Kurtas'],
        },
        {
          subcategories: 'Short Kurti',
          subcategoriesTypes: ['Printed Short Kurti', 'Solid Short Kurti', 'Embroidered Short Kurti'],
        },
        {
          subcategories: 'Lounge Wear',
          subcategoriesTypes: ['Lounge Sets', 'Night Dresses', 'Robes'],
        },
      ],
    },


    {
      name: '  Personal Care',
      subName: 'Apparel',
      categoriesData: [
        {
          subcategories: 'Kurta Sets',
          subcategoriesTypes: ['Kurta Sets', 'Kurta Setss', 'Kurta Sets', 'Kurta Sets'],
        },
        {
          subcategories: 'Sarees',
          subcategoriesTypes: ['Sarees', 'Sarees', 'Pants', 'Palazzos'],
        },
        {
          subcategories: 'Bottom Wear',
          subcategoriesTypes: ['Churidars', 'Skirts', 'Pants', 'Palazzos'],
        },
        {
          subcategories: 'Dress Material',
          subcategoriesTypes: ['Printed Dress Material', 'Embroidered Dress Material', 'Cotton Dress Material'],
        },
        {
          subcategories: 'Kaftans',
          subcategoriesTypes: ['Printed Kaftans', 'Embroidered Kaftans', 'Silk Kaftans'],
        },
        {
          subcategories: 'Tops and Tunics',
          subcategoriesTypes: ['Casual Tops', 'Formal Tops', 'Party Tops', 'Tunic Tops'],
        },
        {
          subcategories: 'Kurtas',
          subcategoriesTypes: ['Anarkali Kurtas', 'A-Line Kurtas', 'Straight Kurtas'],
        },
        {
          subcategories: 'Short Kurti',
          subcategoriesTypes: ['Printed Short Kurti', 'Solid Short Kurti', 'Embroidered Short Kurti'],
        },
        {
          subcategories: 'Lounge Wear',
          subcategoriesTypes: ['Lounge Sets', 'Night Dresses', 'Robes'],
        },
      ],
    },

    {
      name: '  Personal Care',
      subName: 'Apparel',
      categoriesData: [
        {
          subcategories: 'Kurta Sets',
          subcategoriesTypes: ['Kurta Sets', 'Kurta Setss', 'Kurta Sets', 'Kurta Sets'],
        },
        {
          subcategories: 'Sarees',
          subcategoriesTypes: ['Sarees', 'Sarees', 'Pants', 'Palazzos'],
        },
        {
          subcategories: 'Bottom Wear',
          subcategoriesTypes: ['Churidars', 'Skirts', 'Pants', 'Palazzos'],
        },
        {
          subcategories: 'Dress Material',
          subcategoriesTypes: ['Printed Dress Material', 'Embroidered Dress Material', 'Cotton Dress Material'],
        },
        {
          subcategories: 'Kaftans',
          subcategoriesTypes: ['Printed Kaftans', 'Embroidered Kaftans', 'Silk Kaftans'],
        },
        {
          subcategories: 'Tops and Tunics',
          subcategoriesTypes: ['Casual Tops', 'Formal Tops', 'Party Tops', 'Tunic Tops'],
        },
        {
          subcategories: 'Kurtas',
          subcategoriesTypes: ['Anarkali Kurtas', 'A-Line Kurtas', 'Straight Kurtas'],
        },
        {
          subcategories: 'Short Kurti',
          subcategoriesTypes: ['Printed Short Kurti', 'Solid Short Kurti', 'Embroidered Short Kurti'],
        },
        {
          subcategories: 'Lounge Wear',
          subcategoriesTypes: ['Lounge Sets', 'Night Dresses', 'Robes'],
        },
      ],
    },
    // Home DECOR
    {
      name: '  HOME DECOR',
      subName: 'Apparel',
      categoriesData: [
        {
          subcategories: 'Kurta Sets',
          subcategoriesTypes: ['Kurta Sets', 'Kurta Setss', 'Kurta Sets', 'Kurta Sets'],
        },
        {
          subcategories: 'Sarees',
          subcategoriesTypes: ['Sarees', 'Sarees', 'Pants', 'Palazzos'],
        },
        {
          subcategories: 'Bottom Wear',
          subcategoriesTypes: ['Churidars', 'Skirts', 'Pants', 'Palazzos'],
        },
        {
          subcategories: 'Dress Material',
          subcategoriesTypes: ['Printed Dress Material', 'Embroidered Dress Material', 'Cotton Dress Material'],
        },
        {
          subcategories: 'Kaftans',
          subcategoriesTypes: ['Printed Kaftans', 'Embroidered Kaftans', 'Silk Kaftans'],
        },
        {
          subcategories: 'Tops and Tunics',
          subcategoriesTypes: ['Casual Tops', 'Formal Tops', 'Party Tops', 'Tunic Tops'],
        },
        {
          subcategories: 'Kurtas',
          subcategoriesTypes: ['Anarkali Kurtas', 'A-Line Kurtas', 'Straight Kurtas'],
        },
        {
          subcategories: 'Short Kurti',
          subcategoriesTypes: ['Printed Short Kurti', 'Solid Short Kurti', 'Embroidered Short Kurti'],
        },
        {
          subcategories: 'Lounge Wear',
          subcategoriesTypes: ['Lounge Sets', 'Night Dresses', 'Robes'],
        },
      ],
    },
    //galerry
    {
      name: '  Gallery',
    }




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
    setActiveCategory(true)
    setModalData(groupedItems[category]);
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
    // Attach event listener for clicks outside of the modal
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full border-y-[2px] flex justify-center items-center ">
      <ul className="flex flex-wrap justify-around py-2 text-sm md:text-base items-center content-center lg:w-8/12">
        {Object.keys(groupedItems).map((category, index) => (



          <li
            key={index}
            className={`relative px-2 py-1 cursor-pointer ${activeCategory === category ? 'text-red-600 font-bold' : ''
              }`} // Correctly use template literals for conditional class application
            onClick={() => handleItemClick(category)}
          >
            <div className="font-semibold text-gray-800 text-sm">
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
          expandedSubcategories={expandedSubcategories}
          toggleSubcategories={toggleSubcategories}
        />
      )}
    </div>
  );
};

export default Navbar2;
