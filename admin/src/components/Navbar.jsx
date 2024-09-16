import React, { useState } from "react";
import { Link } from "react-router-dom";
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
  const [showManageProductOptions, setShowManageProductOptions] =
    useState(false);
  const [showReporterOptions, setShowReporterOptions] = useState(false);

  const toggleOptions = () => {
    setShowManageProductOptions(!showManageProductOptions);
  };

  const toggleReportOptions = () => {
    setShowReporterOptions(!showReporterOptions);
  };

  return (
    <div>
      <nav className="grid gap-6 text-lg  font-medium px-2 pt-10 w-72 h-full">
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
              <Link
                to="/products"
                className="flex items-center gap-4 px-2.5 text-foreground"
              >
                <ShoppingCart className="h-5 w-5" />
                Products
              </Link>

              <Link
                to="/AddProduct"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Package className="h-5 w-5" />
                Create Product
              </Link>

              <Link
                to="/Category"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Tags className="h-5 w-5" />
                Category
              </Link>

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
                <ClipboardList className="h-5 w-5" />
                Nav Icons
              </Link>

              <Link
                to="/NavBar-Managment"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <ClipboardList className="h-5 w-5" />
                NavBar Management
              </Link>

              <Link
                to="/Perspective"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Users2 className="h-5 w-5" />
               Perspective
              </Link>

              <Link
                to="/quickLinkHome"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Gift className="h-5 w-5" />
                Gift Card
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
