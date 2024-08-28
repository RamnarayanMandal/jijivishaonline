import React from 'react';
import { useState } from 'react'

import './App.css'
import { Outlet } from 'react-router-dom'

import Navbar1 from './components/Navbar/Navbar1'
import Home from './components/Home/Home'

function App() {

  return (
    <>
    <Navbar1/>
    <Home/>
     <Outlet/>
    
    </>
  )
}

export default App
