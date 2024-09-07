import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export const AllLatestProduct = () => {
  const [products, setProducts] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false); // Manage Snackbar visibility
  const URI = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const location = useLocation(); // Get current route

  useEffect(() => {
    fetchLatestProducts();
  }, []);

  const fetchLatestProducts = async () => {
    try {
      const resp = await axios.get(`${URI}api/admin/lastedproducts`);
      const fetchedProducts = resp.data.product;

      setProducts(fetchedProducts);
      // Extract unique subcategories from fetched products
      const uniqueSubcategories = [
        ...new Set(fetchedProducts.map((product) => product.subcategory)),
      ];
      setSubcategories(uniqueSubcategories);
      console.log("Fetched Products:", fetchedProducts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToCart = (product) => {
    // Add your logic for adding the product to the cart
    console.log("Product added to cart:", product);
    setOpenSnackbar(true); // Show the Snackbar when a product is added
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Generate dynamic breadcrumb links
  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    return (
      <p className="text-sm font-semibold text-gray-600 mb-6">
        <span className="cursor-pointer" onClick={() => navigate("/")}>Home</span>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          return (
            <span key={to}>
              {" > "}
              <span
                className="cursor-pointer"
                onClick={() => navigate(to)}
              >
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </span>
            </span>
          );
        })}
      </p>
    );
  };

  return (
    <div className="container mx-auto p-4 my-10 lg:px-[6%]">
      {generateBreadcrumbs()}
      
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex-shrink-0 w-full items-center justify-center content-center"
          >
            <div className="border-2 border-gray-300 bg-gray-50 shadow-lg overflow-hidden hover:border-red-500 transition-transform duration-300 transform hover:scale-105">
              <Link to={`/product/${product._id}`} className="overflow-hidden">
                <img
                  src={`${URI}${product.thumbnail}`}
                  alt={product.title}
                  className="w-full object-cover h-80 cursor-pointer"
                />
              </Link>
              <div className="p-4 flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-base mb-2 w-[90%]">
                    {product.title}
                  </p>
                  <CiHeart className="hover:text-red-500 text-2xl cursor-pointer" />
                </div>
                <p className="mb-4">₹ {product.price.toFixed(2)}</p>
                <button
                  className="border-2 hover:border-none text-black py-2 px-4 hover:bg-red-500 w-full hover:text-white transition duration-300 flex justify-center items-center gap-5"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent click event from triggering the parent div
                    handleAddToCart(product);
                  }}
                >
                  <IoCartOutline className="text-xl" />
                  <p>Add to Cart</p>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Product added to cart!
        </Alert>
      </Snackbar>
    </div>
  );
};
