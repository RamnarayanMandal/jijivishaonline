import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { Dashboard } from './Pages/Dashboard.jsx';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { Charts } from './Pages/Charts';
import { LoginForm } from './Pages/LoginForm';
import { SignUpForm } from './Pages/SingUpFrom';
import { ProductHomePage } from './Pages/Product/ProductHomePage';
import  AddProduct  from './Pages/Product/AddProduct';
import { UpdateProduct } from './Pages/Product/UpdateProduct';
import OtpVerification from './Pages/OtpVerification';
import Product from "./Pages/Product/Product"
import Banner from './components/Banner/Banner';
import BlogsHome from './components/Blogs/BlogsHome';
import BlogsList from './components/Blogs/BlogsList';

// Create the router instance
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element:<LoginForm/> ,
      },
      {
        path: '/signup',
        element: <SignUpForm/>,
      },
      {
        path: '/otpverification',
        element: <OtpVerification/>,
      },
    
      {
        path: '/dashboard',
        element: <Dashboard />,
      },{
        path: '/products',
        element: <ProductHomePage />,
      },{
        path: '/AddProduct',
        element:<AddProduct/>,
      },{
        path: '/UpdateProduct',
        element:<UpdateProduct/>,
      },{
        path: '/Product-Details',
        element: <Product />,
      },
      {
        path: '/Manage-Banner',
        element: <Banner/>,
      },
      {
        path: '/Manage-Blogs',
        element: <BlogsHome/>,
      },
      {
        path: '/Blogs-list',
        element: <BlogsList/>,
      },
    ],
  },
]);

// Render the application
ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TooltipProvider>
      <RouterProvider router={router} />
    </TooltipProvider>
  </StrictMode>
);
