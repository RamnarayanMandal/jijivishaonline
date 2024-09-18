import { StrictMode } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import Home from "./components/Home/Home.jsx";
import { Provider } from "react-redux";
import Jijivisha from "./store/index.js";
import { SubCategories } from "./components/catogry/SubCategories.jsx";
import { ShowCatogry } from "./components/catogry/ShowCatogry.jsx";
import ProductHome from "./components/Product/ProductDetails/ProductHome.jsx";
import { BlogShow } from "./components/blogs/BlogsShow.jsx";
import BlogDetails from "./components/blogs/BlogDetails.jsx";
import { AllLatestProduct } from "./components/Product/latestProduct/AllLatestProduct.jsx";
import ViewCartAndUpdateCart from "./components/cart/ViewCartAndUpdateCart.jsx";
import { MyAccount } from "./components/myaccount/MyAccount.jsx";
import UserProfile from "./components/UserProfile.jsx/UserProfile.jsx";
import AddressForm from "./components/UserProfile.jsx/AddressForm.jsx";
import SelectAddress from "./components/cart/SelectAddress.jsx";
import PaymentHomepage from "./components/payment/PaymentHomepage.jsx";

import GiftCards from "./components/QuickLink/GiftCards.jsx";
import CorporateGifting from "./components/QuickLink/CorporateGifting.jsx";
import OrderDetails from "./components/UserProfile.jsx/OrderDetails.jsx";
import PrivacyPolicy from "./components/PrivacyPolicy.jsx";
import ShippingPolicy from "./components/ShippingPolicy.jsx";
import { GetProductBYProductType } from "./components/catogry/GetProductBYProductType.jsx";

// Define your router outside of the provider
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/SubCategory/:subcategory",
        element: <SubCategories />,
      },
      {
        path: "/catogry/:category",
        element: <ShowCatogry />,
      },

      {
        path: "/product/:id",
        element: <ProductHome />,
      },
      {
        path: "/blogsAll",
        element: <BlogShow />,
      },
      {
        path: "/blogsdetails/:id",
        element: <BlogDetails />,
      },
      {
        path: "All-lasted-products",
        element: <AllLatestProduct />,
      },
      {
        path: "/viewCartDeatils",
        element: <ViewCartAndUpdateCart />,
      },
      {
        path: "/My-Account",
        element: <MyAccount />,
      },
      {
        path: "/user-Profile/:name",
        element: <UserProfile />,
      },
      {
        path: "/addressForm",
        element: <AddressForm />,
      },
      {
        path: "/selectAddress",
        element: <SelectAddress />, // This component will be displayed when the path is "/user-Profile/SaveAddress"
      },
      {
        path: "/payment",
        element: <PaymentHomepage />, // This component will be displayed when the path is "/user-Profile/SaveAddress"
      },
      {
        element: <AddressForm />,
      },

      // Quick Links
      {
        path: "/giftCards",
        element: <GiftCards />,
      },
      {
        path: "/corporateGifting",
        element: <CorporateGifting />,
      },
      {
        path: "/privacyPolicy",
        element: <PrivacyPolicy/>,
      },
      {
        path: "/shippingPolicy",
        element: <ShippingPolicy/>,
      },
      {
        path:"/orderDetails/:id",
        element: <OrderDetails/>// Add the component for order details when the path is "/orderDetails/:id"
      },{
        path:"/productType/:productType",
        element: <GetProductBYProductType/>// Add the component for product type when the path is "/productType"
      }
    ],
  },
]);

// Wrap RouterProvider with ThemeProvider
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={Jijivisha}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
