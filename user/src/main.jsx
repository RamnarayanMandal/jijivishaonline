import { StrictMode } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RegisterPage from "./components/Register/RegisterPage.jsx";
import Login from "./components/Register/Login.jsx";
import { ThemeProvider } from "@material-tailwind/react";
import Home from "./components/Home/Home.jsx";
import { Provider } from "react-redux";
import Jijivisha from "./store/index.js";
import { SubCategories } from "./components/catogry/SubCategories.jsx";

import { ShowCatogry } from "./components/catogry/ShowCatogry.jsx";
import ProductHome from "./components/Product/ProductDetails/ProductHome.jsx";
import { BlogShow } from "./components/blogs/BlogsShow.jsx";
import BlogDetails from "./components/blogs/BlogDetails.jsx";

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
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/login",
        element: <Login />,
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
        element: <BlogDetails/>,
      },
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
