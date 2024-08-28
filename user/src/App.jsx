import React from 'react';
import { useState } from 'react'

import './App.css'
import { Outlet } from 'react-router-dom'

import Navbar1 from './components/Navbar/Navbar1'
import Home from './components/Home/Home'
import Footer from './components/Footer';
import { UpperFooter } from './components/UpperFooter';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar1/>
    <Home/>
     <Outlet/>
     <UpperFooter/>
     <Footer/>
    
    </>
  )
}

export default App
