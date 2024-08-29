import React from 'react';
import { useState } from 'react'

import './App.css'
import { Outlet } from 'react-router-dom'

import Navbar1 from './components/Navbar/Navbar1'
import Home from './components/Home/Home'
import Sidebar from './components/sideNavbar/Sidebar';

function App() {

  return (
    <>
    {/* <div className="flex"> */}
      {/* <Sidebar /> */}
      <div className=" w-full">
        <Navbar1/>
      <Home/>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        {/* Add your dashboard content here */}
      </div>
    {/* </div> */}

   
     <Outlet/>
    
    </>
  )
}

export default App
