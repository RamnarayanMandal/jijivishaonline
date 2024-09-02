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
import { Handbags } from "../Product/Handbags";
import { CustomMadeProducts } from "../Product/CustomMadeProducts";
import Testimonials from "../Testimonials";
import Services from "../service/Services";
import BlogArticles from "../BlogArticles";
import  Footer  from "../Footer";

const Home = () => {
  return (
    <div>
     
      <Banner/>
      <Featured/>
      <LatestProducts/>
      <ShopbyCategories/>
      <PopularProducts/>
      <OurPerspective/>
      <Elegantjewellery/>
      <HandwovenSareesfromalloverBharat/>
      <DressMaterials/>
      <Handbags/>
      <CustomMadeProducts/>
      <Testimonials/>
      <Services/>
      <BlogArticles/>
      
    </div>
  );
};

export default Home;
