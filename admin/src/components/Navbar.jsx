import React from "react";
import { Link } from "react-router-dom";
import { Home, ShoppingCart, Package, Users2, LineChart } from "lucide-react";

const Navbar = () => {
  return (
    <div>
      <nav className="grid gap-6 text-lg font-medium px-2 pt-10">
        <Link
          to="/dashboard"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
        >
          <Home className="h-5 w-5" />
          Dashboard
        </Link>
        <Link
          to="/products"
          className="flex items-center gap-4 px-2.5 text-foreground"
        >
          <ShoppingCart className="h-5 w-5" />
          Products
        </Link>
        <Link
          to="/AddProduct"
          className="flex items-center gap-4 px-2.5 text-foreground"
        >
          <Package className="h-5 w-5" />
          Add Product
        </Link>
        <Link
          to="/Category"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
        >
          <Users2 className="h-5 w-5" />
          Manage Category
        </Link>
        <Link
          to="/Manage-Banner"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
        >
          <Users2 className="h-5 w-5" />
          Manage Banner
        </Link>

        <Link
          to="/Blogs-list"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
        >
          <Users2 className="h-5 w-5" />
          Manage Blogs
        </Link>

        <Link
          to="/manage-nav-icons"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
        >
          <Users2 className="h-5 w-5" />
          Manage NavIcons
        </Link>
        <Link
          to="#"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
        >
          <LineChart className="h-5 w-5" />
          Settings
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
