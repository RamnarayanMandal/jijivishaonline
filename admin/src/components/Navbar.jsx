import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Make sure axios is imported
import {
  Home,
  ShoppingCart,
  Package,
  Tags,
  Image,
  FileText,
  Settings,
  Gift,
  BarChart2,
  ClipboardList,
} from "lucide-react"; // Updated icons

const Navbar = () => {
  const [showManageProductOptions, setShowManageProductOptions] = useState(false);
  const [showReporterOptions, setShowReporterOptions] = useState(false);
  const [showCategoryOptions, setShowCategoryOptions] = useState(false);
  const [showContentOptions, setContentOptions] = useState(false);
  const [logo, setLogo] = useState(null);
  const URI = import.meta.env.VITE_API_URL; // Ensure your .env is correctly configured

  useEffect(() => {
    // Fetch logo from the API
    const fetchLogo = async () => {
      try {
        const response = await axios.get(`${URI}api/navbarIcons/getAll`);
        console.log(response.data)
        console.log(logo)
        setLogo(response.data[0].filename); // Assuming the logo URL is in response.data.filename
      } catch (err) {
        console.error("Error fetching logo:", err);
      }
    };

    fetchLogo();
  }, [URI]);

  const toggleOptions = () => setShowManageProductOptions(!showManageProductOptions);
  const toggleReportOptions = () => setShowReporterOptions(!showReporterOptions);
  const toggleCategoryOptions = () => setShowCategoryOptions(!showCategoryOptions);
  const toggleContentOptions = () => setContentOptions(!showContentOptions);

  return (
    <div className="w-72 min-h-screen">
      {/* Logo */}
      <div className="flex justify-center items-center content-center">
      {logo && (
        <img
          src={`${URI}uploads/${logo}`}
          alt="Company Logo"
          className="w-60 h-16"
        />
      )}
      </div>

      {/* Navbar links */}
      <nav className="grid gap-6 text-lg font-medium px-2 pt-10">
        <Link
          to="/dashboard"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
        >
          <Home className="h-5 w-5" />
          Dashboard
        </Link>

        {/* Manage Product Options */}
        <div>
          <button
            onClick={toggleOptions}
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground focus:outline-none"
          >
            <Package className="h-5 w-5" />
            Manage Product
          </button>
          {showManageProductOptions && (
            <div className="ml-8 mt-2 space-y-2">
              <Link to="/products" className="flex items-center gap-4 px-2.5 text-foreground">
                <ShoppingCart className="h-5 w-5" />
                Products
              </Link>
              <Link to="/AddProduct" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                <Package className="h-5 w-5" />
                Create Product
              </Link>
            </div>
          )}
        </div>

        {/* Report Management */}
        <div>
          <button
            onClick={toggleReportOptions}
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground focus:outline-none"
          >
            <BarChart2 className="h-5 w-5" />
            Report Management
          </button>
          {showReporterOptions && (
            <div className="ml-8 mt-2 space-y-2">
              <Link
                to="/order"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <ClipboardList className="h-5 w-5" />
                Order Report
              </Link>
              <Link
                to="/bookOrder"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Package className="h-5 w-5" />
                Book Order Report
              </Link>
            </div>
          )}
        </div>

        {/* Category Management */}
        <div>
          <button
            onClick={toggleCategoryOptions}
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground focus:outline-none"
          >
            <Tags className="h-5 w-5" />
            Category Management
          </button>
          {showCategoryOptions && (
            <div className="ml-8 mt-2 space-y-2">
              <Link
                to="/category"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Tags className="h-5 w-5" />
                Category
              </Link>
              <Link
                to="/NavBar-Managment"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Package className="h-5 w-5" />
                NavBar Management
              </Link>
            </div>
          )}
        </div>

        {/* Content Management */}
        <div>
          <button
            onClick={toggleContentOptions}
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground focus:outline-none"
          >
            <FileText className="h-5 w-5" />
            Content Management
          </button>
          {showContentOptions && (
            <div className="ml-8 mt-2 space-y-2">
              <Link
                to="/Manage-Banner"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Image className="h-5 w-5" />
                Banner
              </Link>
              <Link
                to="/Blogs-list"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <FileText className="h-5 w-5" />
                Blogs
              </Link>
              <Link
                to="/manage-nav-icons"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <FileText className="h-5 w-5" />
                Logo
              </Link>
              <Link
                to="/Perspective"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Gift className="h-5 w-5" />
                Perspective
              </Link>
              <Link
                to="/giftCards"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Gift className="h-5 w-5" />
                Quick Link Home
              </Link>
            </div>
          )}
        </div>

        {/* Settings */}
        <Link
          to="/settings"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
        >
          <Settings className="h-5 w-5" />
          Settings
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
