import React from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'; // Import icons

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div>
      {/* Hamburger Icon */}
      <div className="p-4 md:hidden" onClick={toggleSidebar}>
        {isOpen ? <AiOutlineClose className="text-white w-6 h-6" /> : <AiOutlineMenu className="text-white w-6 h-6" />}
      </div>

      {/* Sidebar */}
      <div className={`h-screen w-64 bg-gray-800 text-white fixed top-0 left-0 flex flex-col p-4 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <h2 className="text-2xl font-bold mb-6">Menu</h2>
        <ul className="space-y-4">
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={toggleSidebar}>Update Banner</li>
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={toggleSidebar}>Update Featured Image</li>
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={toggleSidebar}>Add Products</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
