import React from "react";
import { useState } from "react";

import "./App.css";
import { Outlet } from "react-router-dom";

import Navbar1 from "./components/Navbar/Navbar1";
import Home from "./components/Home/Home";
import Footer from "./components/Footer";
import { UpperFooter } from "./components/UpperFooter";
import Navbar2 from "./components/Navbar/Navbar2";
import { IconContext } from "react-icons/lib";
import IconLabelTabs from "./components/Navbar/IconLabelTabs";
import ProductHome from "./components/Product/ProductDetails/ProductHome";

function App() {
  return (
    <>
      <Navbar1 />
      <Navbar2 />
      <Outlet />
      <UpperFooter />
      <Footer />
      <IconLabelTabs />
      <ProductHome />
    </>
  );
}

export default App;
