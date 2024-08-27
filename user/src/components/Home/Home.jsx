import React from "react";
import Navbar2 from "../Navbar/Navbar2";
import Banner from "../Banner/Banner";
import Featured from "../Featured";
import LatestProducts from "../Product/LatestProducts";
import ShopbyCategories from "../catogry/ShopbyCategories";
import PopularProducts from "../Product/PopularProducts";
import OurPerspective from "../OurPerspective";
import Elegantjewellery from "../Elegantjewellery";
import HandwovenSareesfromalloverBharat from "../Product/HandwovenSareesfromalloverBharat";
import DressMaterials from "../Product/DressMaterials";

const Home = () => {
  return (
    <div>
      <Navbar2 />
      <Banner/>
      <Featured/>
      <LatestProducts/>
      <ShopbyCategories/>
      <PopularProducts/>
      <OurPerspective/>
      <Elegantjewellery/>
      <HandwovenSareesfromalloverBharat/>
      <DressMaterials/>
    </div>
  );
};

export default Home;
