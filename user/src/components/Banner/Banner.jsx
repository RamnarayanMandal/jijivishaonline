import React from 'react';
import f1 from "../../assets/f1.png";
import fb1 from "../../assets/fb1.png";
import fb2 from "../../assets/fb2.png";
import r1 from "../../assets/r1.png";

const Banner = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-between px-4 sm:px-[6%] py-6 sm:py-10 gap-4'>
      <div className='flex flex-col w-full sm:w-9/12'>
        <div className='mb-4'>
          <img src={f1} alt="Main Banner" className='w-full h-auto object-cover ' />
        </div>
        <div className='flex flex-col sm:flex-row gap-4'>
          <img src={fb1} alt="Facebook Banner 1" className='w-full sm:w-1/2 h-auto object-cover ' />
          <img src={fb2} alt="Facebook Banner 2" className='w-full sm:w-1/2 h-auto object-cover ' />
        </div>
      </div>
      <div className='w-full sm:w-1/4 flex-shrink-0'>
        <img src={r1} alt="Right Banner" className='w-full h-full object-cover ' />
      </div>
    </div>
  );
}

export default Banner;
