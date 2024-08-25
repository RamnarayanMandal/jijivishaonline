import React from "react";
import Navbar2 from "../Navbar/Navbar2";
import Banner from "../Banner/Banner";
import Featured from "../Featured";
import LatestProducts from "../Product/LatestProducts";

const Home = () => {
  return (
    <div>
      <Navbar2 />
      <Banner/>
      <Featured/>
      <LatestProducts/>
    </div>
  );
};

export default Home;
