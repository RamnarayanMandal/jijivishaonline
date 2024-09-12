import React from "react";

const CorporateGifting = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <span className="hover:text-gray-800">Home</span> /{" "}
        <span>Corporate Gifting</span>
      </nav>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-red-600 text-center mb-8">
        Corporate Gifting
      </h1>

      {/* Introduction Paragraph */}
      <p className="text-gray-700 text-center mb-8 leading-relaxed">
        At JIJIVISHA, we offer a range of corporate gifting options that are
        perfect for any occasion. Whether you are looking to show appreciation
        to your employees, clients, business partners, or events, we have a wide
        range of products that are sure to impress.
      </p>
      <p className="text-gray-700 text-center mb-8 leading-relaxed">
        Our corporate gifting options include eco-friendly and sustainable
        products, such as handmade paper products like handmade diaries, paper
        pens. Sustainable stationery items like wooden pen stand, wooden card
        holder. Handmade copper water bottle, ceramic mugs, photo frames, marble
        mobile stand. We also offer a range of luxurious and high-end products &
        designer accessories.
      </p>

      {/* Product Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        <div className="flex justify-center">
          <img
            src="https://via.placeholder.com/200"
            alt="Product 1"
            className="border-2 border-red-600 p-2"
          />
        </div>
        <div className="flex justify-center">
          <img
            src="https://via.placeholder.com/200"
            alt="Product 2"
            className="border-2 border-red-600 p-2"
          />
        </div>
        <div className="flex justify-center">
          <img
            src="https://via.placeholder.com/200"
            alt="Product 3"
            className="border-2 border-red-600 p-2"
          />
        </div>
        <div className="flex justify-center">
          <img
            src="https://via.placeholder.com/200"
            alt="Product 4"
            className="border-2 border-red-600 p-2"
          />
        </div>
      </div>

      {/* Additional Information */}
      <p className="text-gray-700 text-center mb-8 leading-relaxed">
        Our team of experts can work with you to create a customized gifting
        solution that is tailored to your specific requirements and preferences.
        We can help you select the perfect products, wrap and package them
        beautifully, and deliver them directly to your recipients.
      </p>
      <p className="text-gray-700 text-center mb-8 leading-relaxed">
        At JIJIVISHA, we believe in promoting sustainability, and we take steps
        to minimize our impact on the environment. We use eco-friendly and
        sustainable materials wherever possible, without compromising on quality
        or style.
      </p>
      <p className="text-gray-700 text-center mb-8 leading-relaxed">
        If you are interested in our corporate gifting options or have any
        questions, please don’t hesitate to reach out to us at
        <a
          href="mailto:shop@jijivishaonline.com"
          className="text-red-600 font-semibold"
        >
          {" "}
          shop@jijivishaonline.com
        </a>
        or call us at{" "}
        <a href="tel:+917995321114" className="text-red-600 font-semibold">
          +91 79953 21114
        </a>
        .
      </p>
      <p className="text-gray-700 text-center mb-8 leading-relaxed">
        We look forward to working with you and helping you make a lasting
        impression with your gifts.
      </p>
    </div>
  );
};

export default CorporateGifting;
