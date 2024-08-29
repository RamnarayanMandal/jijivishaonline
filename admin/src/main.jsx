import { StrictMode } from 'react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RegisterPage from './components/Register/RegisterPage.jsx';
import Login from './components/Register/Login.jsx';
import { ThemeProvider } from "@material-tailwind/react";


// Define your router outside of the provider
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "/",
        // element: <Home />
      },
      {
        path: "/register",
        element: <RegisterPage />
      },
      {
        path: "/login",
        element: <Login />
      },
    ],
  }
]);

// Wrap RouterProvider with ThemeProvider
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
</StrictMode>

);
