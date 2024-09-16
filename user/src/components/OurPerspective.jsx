import React, { useEffect, useState } from "react";
import axios from "axios";

const OurPerspective = () => {
  const [perspectiveData, setPerspectiveData] = useState(null);
  const URI = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPerspectiveData = async () => {
      try {
        const response = await axios.get(`${URI}api/perspective/get-Perspective`);
        if (response.data && response.data.blogs && response.data.blogs.length > 0) {
          setPerspectiveData(response.data.blogs[0]);
        }
      } catch (error) {
        console.error("Error fetching perspective data:", error);
      }
    };

    fetchPerspectiveData();
  }, []);

  if (!perspectiveData) {
    return <div>Loading...</div>; // Loading state while data is being fetched
  }

  return (
    <div className="bg-[#f5e9e9] flex flex-col lg:flex-row justify-center items-center h-auto lg:min-h-[80vh]">
      {/* Image Section */}
      <div className="lg:w-1/2 w-full flex justify-center lg:justify-start mb-8 lg:mb-0">
        <img
          src={`${URI}${perspectiveData.image}`}
          alt="Our Perspective"
          // className="w-full lg:h-[80vh] h-64 object-fill"
          style={{ width: '100%', maxWidth: '600px', height:'600px', borderRadius: '8px' }}
        />
      </div>
      {/* Text Section */}
      <div className="lg:w-1/2 w-full lg:pr-20 px-5">
        <div className="max-w-[90%] mx-auto lg:mx-0">
          <h2 className="text-black text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 text-pretty">
            {perspectiveData.title.split(":")[0]}: <span className="text-red-500">{perspectiveData.title.split(":")[1]}</span>
          </h2>
          <p className="mb-4 text-pretty lg:text-base md:text-md text-sm">
            {perspectiveData.description}
          </p>
          <p className="mb-4 text-pretty lg:text-base md:text-md text-sm">
            {perspectiveData.description2}
          </p>
          <p className="mb-4 text-pretty lg:text-base md:text-md text-sm">
            {perspectiveData.description3}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurPerspective;
