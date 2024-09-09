import React, { useEffect, useState } from "react";
import logo from "../../assets/JIJIVISHA-Logo.png";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useNavigate } from "react-router-dom";
import ShowCart from "../cart/ShowCart";

const Navbar1 = () => {
  const navigation = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the token is in localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    // Redirect to the login page
    navigation("/My-Account");
  };

  return (
    <div className="hidden md:flex mb-5 bg-white px-20 flex-col md:flex-row items-center h-[80px]">
      {/* Logo and Icons for Mobile and Medium View */}
      <div className="flex flex-col md:flex-row w-full md:w-auto items-center mb-4 md:mb-0">
        <div className="flex-shrink-0 flex items-center justify-center md:justify-start md:w-1/2 w-1/3 gap-20">
          <img
            src={logo}
            alt="Logo"
            className="h-full object-contain cursor-pointer"
            onClick={() => {
              navigation("/");
            }}
          />

          {/* Icons and Menu Icon for Mobile and Medium View */}
          <div className="flex-grow flex items-center justify-center md:justify-end space-x-4">
            <div className="md:hidden block">
              <MenuOutlinedIcon className="text-black text-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative flex-grow w-full flex items-center">
        <input
          type="search"
          placeholder="Search for India's best products"
          className="w-full px-2 py-2 pl-10 border border-gray-300 rounded-l-lg focus:outline-none focus:border-blue-500"
        />
        {/* Search Button */}
        <button
          className="absolute right-0 flex items-center justify-center bg-black text-white p-2 px-2 rounded-r-sm text-md"
          style={{ top: "50%", transform: "translateY(-50%)" }}
        >
          Search
        </button>
      </div>

      {/* Icons and Login/Logout Button for Medium and Large View */}
      <div className="hidden md:flex lg:w-1/4 items-center justify-center md:justify-end space-x-4">
        <ul className="flex space-x-4 items-center m-8">
          <li>
            <FavoriteBorderIcon className="text-black text-sm md:text-base" />
          </li>
          <li>
            <LocalShippingOutlinedIcon className="text-black text-sm md:text-base" />
          </li>
          <li>
            <ShowCart />
          </li>
          <li>
            {isLoggedIn ? (
              <button
                className="flex items-center bg-transparent border-none text-black text-sm md:text-base"
                onClick={handleLogout}
              >
                LOGOUT <ArrowForwardOutlinedIcon className="ml-1" />
              </button>
            ) : (
              <button
                className="flex items-center bg-transparent border-none text-black text-sm md:text-base"
                onClick={() => {
                  navigation("/My-Account");
                }}
              >
                LOGIN <ArrowForwardOutlinedIcon className="ml-1" />
              </button>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar1;
