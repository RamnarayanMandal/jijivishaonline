import React from "react";
import fr1 from "../assets/fr1.png";
import fr2 from "../assets/fr2.png";
import fr3 from "../assets/fr3.png";
import fr4 from "../assets/fr14.png";
import fr5 from "../assets/fr15.png";

const Featured = () => {
  return (
    <div className="flex flex-col justify-between px-4 sm:px-[6%] py-6 sm:py-10 gap-4 font-serif">
      <h1 className="text-4xl text-center font-semibold text-gray-600">Featured In</h1>
      <div className="flex flex-wrap justify-center items-center border-y-2 p-4 gap-10">
        <img src={fr1} alt="Featured 1" className="h-20 w-auto object-contain" />
        <img src={fr5} alt="Featured 5" className="h-20 w-auto object-contain" />
        <img src={fr2} alt="Featured 2" className="h-20 w-auto object-contain" />
        <img src={fr3} alt="Featured 3" className="h-20 w-auto object-contain" />
        <img src={fr4} alt="Featured 4" className="h-20 w-auto object-contain" />
       
      </div>
    </div>
  );
};

export default Featured;
