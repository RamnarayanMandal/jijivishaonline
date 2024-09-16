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
import BlogArticles from "../blogs/BlogArticles";
import  Footer  from "../Footer";
import MetaTags from "../../MetaTags";

const Home = () => {
  return (
    <>
    <MetaTags title="Jijivisha: Connecting India to the World Through Culture and Innovation"
    
    description=" Write a concise meta description that summarizes your mission and includes keywords. For example: 'Discover Jijivisha's mission to bridge India with the world. Explore Indian culture, innovation, and industry while fostering global understanding and collaboration "
    />
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

    </>
  );
};

export default Home;
