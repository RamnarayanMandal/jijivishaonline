import React, { useEffect, useState } from "react";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Link, useNavigate } from "react-router-dom";
import ShowCart from "../cart/ShowCart";

import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import Navbar1Search from "./Navbar1Search";
import { useSelector } from "react-redux";

const Navbar1 = () => {
  const URI = import.meta.env.VITE_API_URL;
  const navigation = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [logo, setLogo] = useState("");
  const [icons, setIcons] = useState([]);
  const userProfile = useSelector((store) => store.user);

  // Mock user profile data (replace with actual data from your backend)


  useEffect(() => {
    // Check if the token is in localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    // Fetch data from API
    const fetchNavbarData = async () => {
      try {
        const response = await axios.get(`${URI}api/navbarIcons/getAll`);
        if (response.data && response.data.length > 0) {
          const { filename } = response.data[0]; // Assuming the first item is the logo
          setLogo(`${URI}uploads/${filename}`); // Adjust URL as needed
          setIcons(response.data); // Store all icons
        }
      } catch (error) {
        console.error("Error fetching navbar data:", error);
      }
    };

    fetchNavbarData();
  }, []);

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    // Redirect to the login page
    navigation("/My-Account");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="hidden md:flex mb-5 bg-white px-20 flex-col md:flex-row items-center h-[80px]">
      {/* Logo and Icons for Mobile and Medium View */}
      <div className="flex flex-col md:flex-row w-full md:w-auto items-center mb-4 md:mb-0">
        <div className="flex-shrink-0 flex items-center justify-center md:justify-start md:w-1/2 w-1/3 gap-20">
          {logo && (
            <img
              src={logo}
              alt="Logo"
              className="h-full object-contain cursor-pointer"
              onClick={() => {
                navigation("/");
              }}
            />
          )}

          {/* Icons and Menu Icon for Mobile and Medium View */}
          <div className="flex-grow flex items-center justify-center md:justify-end space-x-4">
            <div className="md:hidden block">
              <MenuOutlinedIcon className="text-black text-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <Navbar1Search />

      {/* Icons and Login/Logout Button for Medium and Large View */}
      <div className="hidden md:flex lg:w-1/4 items-center justify-center md:justify-end space-x-4">
        <ul className="flex space-x-4 items-center m-8">
          <li>
            <FavoriteBorderIcon />
          </li>
          <li>
            <LocalShippingOutlinedIcon />
          </li>
          <li>
            <ShowCart />
          </li>
          <li>
            {isLoggedIn ? (
              <div className="relative">
                <button
                  className="flex items-center bg-transparent border-none text-black text-sm md:text-base"
                  onClick={toggleDropdown}
                >
                  <FaUserCircle className="ml-1 mr-2 text-2xl" /> Account
                </button>
                {isDropdownOpen && (
                  <div className="absolute bg-white text-gray-600 shadow-md rounded w-60 mt-4 p-5 z-10">
                    <Link
                      to={`/user-Profile/MyAcount`}
                      className="block px-4 py-2 hover:bg-gray-200 text-lg font-semibold"
                    >
                      My Account
                      <p className="text-sm font-thin">
                        {userProfile?.email}
                      </p>
                    </Link>
                    <Link
                      to={`/user-Profile/MyOrder`}
                      className="block px-4 py-2 hover:bg-gray-200"
                    >
                      My Orders
                    </Link>
                    <Link
                      to={`/user-Profile/SaveAddress`}
                      className="block px-4 py-2 hover:bg-gray-200"
                    >
                      Save Address
                    </Link>
                    <Link
                      to={`/user-Profile/MyWishlist`}
                      className="px-4 py-2 hover:bg-gray-200 flex justify-between items-center"
                    >
                      <span>My Wishlist</span>
                      <span className="text-sm font-thin">
                        ₹{userProfile.wallet}
                      </span>
                    </Link>
                    <div className="border-t my-2"></div>
                    <Link
                      to="/faqs"
                      className="block px-4 py-2 hover:bg-gray-200"
                    >
                      FAQ's
                    </Link>
                    <Link
                      to="/account-privacy"
                      className="block px-4 py-2 hover:bg-gray-200"
                    >
                      Account Privacy
                    </Link>
                    <button
                      className="block px-4 py-2 hover:bg-gray-200 text-red-500"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
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
