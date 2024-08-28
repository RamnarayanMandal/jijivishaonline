import React from "react";
import { BsFacebook } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaSpotify } from "react-icons/fa";

const LINKS = [
  {
    title: "Quick Links",
    items: ["products customizatio", "e-gift cards", "groom shopping assistance", "bridal shopping assistance","corporate gifting"],
  },
  {
    title: "Company",
    items: ["BLOG", "Privacy Policy", "Shipping Policy", "Return & Refund Policy","FAQs","Contact Us","Media","Terms of use"],
  },
];

const CONTACT_INFO = {
  title: "Contact us",
  details: {
    email: "shop@jijivishaonline.com",
    phone: "+91 79953 21114",
    address: [
      "Lorem ipsum dolor sit amet consectetur.",
      "Ullamcorper scelerisque nunc euismod purus ultrices nec in."
    ]
  }
};

const Footer = () => {
  return (
    <>
    <footer className="text-gray-800 py-8 font-serif">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
                <h3 className="text-4xl font-[500] mb-4 text-red-500">Jijivisha</h3>
                <div className="flex justify-start content-center items-center gap-5">
                <BsFacebook className="text-3xl text-blue-600" />
                <FaInstagram className="text-3xl text-red-600" />
                <FaSquareXTwitter  className="text-3xl text-black" />
                <FaLinkedin  className="text-3xl text-blue-600"/>
                <FaSpotify className="text-3xl text-amber-600"  />
                </div>
  
            </div>
          {LINKS.map((linkGroup, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">{linkGroup.title}</h3>
              <ul>
                {linkGroup.items.map((item, idx) => (
                  <li key={idx} className="mb-2 hover:text-gray-400">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {/* Render the contact information separately */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{CONTACT_INFO.title}</h3>
            <ul>
              <li className="mb-2">
                <strong>Email Address:</strong> {CONTACT_INFO.details.email}
              </li>
              <li className="mb-2">
                <strong>Phone Number:</strong> {CONTACT_INFO.details.phone}
              </li>
              <li className="mb-2">
                <strong>Address:</strong>
                {CONTACT_INFO.details.address.map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
              </li>
            </ul>
            {/* Subscribe section */}
            <div className="mt-4">
              <h4 className="text-md font-semibold mb-2">Subscribe to our newsletter</h4>
              <form className="flex flex-col sm:flex-row">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="border rounded px-4 py-2 mb-2 sm:mb-0 sm:mr-2 w-full sm:w-auto"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        <h1>
            <span className="text-gray-700">Jijivisha Online</span>
            <span className="text-gray-500">|</span>
            <span className="text-gray-700">All rights reserved</span>
  
        </h1>
        <div className="mt-8 border-t border-gray-700 pt-6 text-center">
          <p className="text-sm text-gray-400">&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </div>
      
    </footer>
    </>
  );
};

export default Footer;
