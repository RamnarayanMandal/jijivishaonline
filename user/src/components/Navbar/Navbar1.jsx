import React from "react";
import logo from "../../assets/JIJIVISHA-Logo.png";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const Navbar1 = () => {
  return (
    <div className=" mb-5 bg-white px-20 flex flex-col md:flex-row items-center h-[80px]">
      {/* Logo and Icons for Mobile and Medium View */}
      <div className="flex flex-col md:flex-row w-full md:w-auto items-center mb-4 md:mb-0">
        <div className="flex-shrink-0 flex items-center justify-center md:justify-start md:w-1/2 w-1/3 gap-20">
          <img src={logo} alt="Logo" className="h-full object-contain" />

          {/* Icons and Login Button for Mobile and Medium View */}
          <div className="flex-grow flex items-center justify-center md:justify-end space-x-4">
            <ul className="flex space-x-4 items-center md:hidden">
              <li>
                <FavoriteBorderIcon className="text-black text-sm md:text-base" />
              </li>
              <li>
                <LocalShippingOutlinedIcon className="text-black text-sm md:text-base" />
              </li>
              <li>
                <ShoppingCartOutlinedIcon className="text-black text-sm md:text-base" />
              </li>
              {/* Hide LOGIN button on small screens */}
              <li className="hidden md:flex">
                <button className="flex items-center bg-transparent border-none text-black text-sm md:text-base">
                  LOGIN <ArrowForwardOutlinedIcon className="ml-1" />
                </button>
              </li>
            </ul>
            {/* Show Menu Icon in Mobile and Medium View */}
            <div className="md:hidden block">
              <MenuOutlinedIcon className="text-black text-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative flex-grow w-full  flex items-center">
  <input
    type="search"
    placeholder="Search for India's best products"
    className="w-full px-2 py-2 pl-10 border border-gray-300 rounded-l-lg focus:outline-none focus:border-blue-500"
  />
  {/* Search Button */}
  <button className="absolute right-0 flex items-center justify-center bg-black text-white p-2 px-2 rounded-r-sm text-md " style={{ top: "50%", transform: "translateY(-50%)" }}>
    Search
  </button>
</div>


      {/* Icons and Login Button for Medium and Large View */}
      <div className="hidden md:flex  lg:w-1/4 items-center justify-center md:justify-end space-x-4">
        <ul className="flex space-x-4 items-center m-8">
          <li>
            <FavoriteBorderIcon className="text-black text-sm md:text-base" />
          </li>
          <li>
            <LocalShippingOutlinedIcon className="text-black text-sm md:text-base" />
          </li>
          <li>
            <ShoppingCartOutlinedIcon className="text-black text-sm md:text-base" />
          </li>
          <li>
            <button className="flex items-center bg-transparent border-none text-black text-sm md:text-base">
              LOGIN <ArrowForwardOutlinedIcon className="ml-1" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar1;
