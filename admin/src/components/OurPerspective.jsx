import React from "react";
import img from "../assets/per.jpg";

const OurPerspective = () => {
  return (
    <div className="bg-[#f5e9e9] flex flex-col lg:flex-row justify-center items-center h-auto lg:min-h-[80vh]">
      {/* Image Section */}
      <div className="lg:w-1/2 w-full flex justify-center lg:justify-start mb-8 lg:mb-0">
        <img
          src={img}
          alt="img"
          className="w-full lg:h-[80vh] h-64 object-fill"
        />
      </div>
      {/* Text Section */}
      <div className="lg:w-1/2 w-full lg:pr-20 px-5">
        <div className="max-w-[90%] mx-auto lg:mx-0">
          <h2 className="text-black text-2xl md:text-3xl lg:text-5xl font-semibold mb-6 text-pretty">
            Jijivisha: <span className="text-red-500">Our Perspective</span>
          </h2>
          <p className="mb-4 text-pretty  lg:text-base md:text-md text-sm">
            India wears her beauty in the colorful textiles, breathtaking
            ornaments, and inspiring stories that come alive in her streets.
            There is magic in the hands that work the loom, in the eyes that
            pore over a needle, in the brushstrokes that paint life. And yet few
            things can sum it all up, can capture the essence in a box. At
            Jijivisha, we have begun a fascinating journey, a humble attempt to
            bring India a little closer to the world.
          </p>
          <p className="mb-4 text-pretty lg:text-base md:text-md text-sm">
            We believe in sharing stories and celebrating how each handmade
            object can come to represent something much bigger than itself.
            Traveling to the colorful corners of this fascinating country, we
            curate unique and exclusive collections that represent India’s
            finest craft-based designs, so that you can savor the delightful
            treasures at leisure, with us. Immerse yourself in the beauty of
            India.
          </p>
          <p className="mb-4 text-pretty lg:text-base md:text-md text-sm">
            Shop for handmade sarees, dupattas, jewelry, shawls, home decor,
            art, and more.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurPerspective;
