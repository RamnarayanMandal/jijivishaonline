import React from "react";
import Navbar2 from "../Navbar/Navbar2";
import Banner from "../Banner/Banner";
import Featured from "../Featured";
import LatestProducts from "../Product/LatestProducts";
import ShopbyCategories from "../catogry/ShopbyCategories";

const Home = () => {
  return (
    <div>
      <Navbar2 />
      <Banner/>
      <Featured/>
      <LatestProducts/>
      <ShopbyCategories/>
    </div>
  );
};

export default Home;
