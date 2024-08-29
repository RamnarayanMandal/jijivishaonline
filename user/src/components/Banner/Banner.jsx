import React, { useEffect, useState } from 'react';
import axios from 'axios';
import f1 from "../../assets/f1.png";
import fb1 from "../../assets/fb1.png";
import fb2 from "../../assets/fb2.png";
import r1 from "../../assets/r1.png";

const Banner = () => {
  const [banners, setBanners] = useState({
    banner1: f1,
    banner2: fb1,
    banner3: fb2,
    banner4: r1,
  });

  const URI = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchBanners();
  }, []); // Run only on component mount

  const fetchBanners = async () => {
    try {
      const response = await axios.get(`${URI}api/admin/get-all-banners`);
      setBanners({
        banner1: `${URI}${response.data.data[0].banner1}`,
        banner2: `${URI}${response.data.data[0].banner2}`,
        banner3: `${URI}${response.data.data[0].banner3}`,
        banner4: `${URI}${response.data.data[0].banner4}`,
      });
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex flex-col sm:flex-row justify-between px-4 sm:px-[6%] py-6 sm:py-10 gap-4'>
      <div className='flex flex-col w-full sm:w-9/12'>
        {/* Ensure to check that banners.banner1 is available */}
        {banners.banner1 && (
          <>
            <div className='mb-4'>
              <img
                src={banners.banner1} // Use the first banner for the main image
                alt="Main Banner"
                className='w-full h-auto object-cover'
              />
            </div>
            <div className='flex flex-col sm:flex-row gap-4'>
              {banners.banner2 && (
                <img
                  src={banners.banner2} // Use the second banner
                  alt="Facebook Banner 1"
                  className='w-full sm:w-1/2 h-auto object-cover'
                />
              )}
              {banners.banner3 && (
                <img
                  src={banners.banner3} // Use the third banner
                  alt="Facebook Banner 2"
                  className='w-full sm:w-1/2 h-auto object-cover'
                />
              )}
            </div>
          </>
        )}
      </div>
      <div className='w-full sm:w-1/4 flex-shrink-0'>
        {banners.banner4 && (
          <img
            src={banners.banner4} // Use the fourth banner for the right image
            alt="Right Banner"
            className='w-full h-full object-cover'
          />
        )}
      </div>
    </div>
  );
};

export default Banner;
