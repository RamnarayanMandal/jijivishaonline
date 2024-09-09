import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useDispatch } from "react-redux";
import { bagActions } from "../../../store/bagSlice";
import Swal from "sweetalert2";

export const AllLatestProduct = () => {
  const [products, setProducts] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState({ open: false, message: "", severity: "success" }); // Manage Snackbar state
  const URI = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch(); // Using dispatch for Redux actions
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchLatestProducts();
  }, []);

  const fetchLatestProducts = async () => {
    try {
      const resp = await axios.get(`${URI}api/admin/lastedproducts`);
      const fetchedProducts = resp.data.product;
      setProducts(fetchedProducts);

      // Extract unique subcategories
      const uniqueSubcategories = [
        ...new Set(fetchedProducts.map((product) => product.subcategory)),
      ];
      setSubcategories(uniqueSubcategories);
      console.log("Fetched Products:", fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      Swal.fire({
        title: 'Login Required',
        text: 'Please log in to add products to the cart.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return;
    }
  
    try {
      await axios.post(`${URI}api/user/`, {
        userId,
        productId: product._id,
        productName: product.title,
        quantity: 1,
        price: product.price,
        attributes: product.attributes,
        discount: product.discount,
        Image: product.thumbnail,
      });

      // Dispatch the action to add to Redux store (bag)
      dispatch(
        bagActions.addToBag({
          data: { ...product, quantity: 1 },
          totalQuantity: 1,
        })
      );

      // Show success Snackbar
      setOpenSnackbar({ open: true, message: "Product added to cart!", severity: "success" });
    } catch (error) {
      console.error("Error adding item to cart", error);
      // Show error Snackbar
      setOpenSnackbar({ open: true, message: "Error adding item to cart", severity: "error" });
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar({ open: false, message: "", severity: "success" });
  };

  // Generate dynamic breadcrumb links
  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    return (
      <p className="text-sm font-semibold text-gray-600 mb-6">
        <span className="cursor-pointer" onClick={() => navigate("/")}>
          Home
        </span>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          return (
            <span key={to}>
              {" > "}
              <span className="cursor-pointer" onClick={() => navigate(to)}>
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
          <div key={product._id} className="flex-shrink-0 w-full items-center justify-center content-center">
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
                  <p className="font-semibold text-base mb-2 w-[90%]">{product.title}</p>
                  <CiHeart className="hover:text-red-500 text-2xl cursor-pointer" />
                </div>
                <p className="mb-4">₹ {product.price.toFixed(2)}</p>
                <button
                  aria-label={`Add ${product.title} to cart`}
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
        open={openSnackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={openSnackbar.severity} sx={{ width: "100%" }}>
          {openSnackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};
