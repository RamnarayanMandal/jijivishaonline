import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RegisterPage from './components/Register/RegisterPage.jsx';
import Login from './components/Register/Login.jsx';

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
        element: <RegisterPage/>
      },
      {
        path: "/login",
        element: <Login/>
      },
    ],
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>

      <App />
    </RouterProvider>
  </StrictMode>,
)
