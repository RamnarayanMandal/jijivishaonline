import React, { useState, useEffect } from "react"; // Added useEffect import
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate from react-router-dom
import { BsFacebook } from "react-icons/bs";
import { FaInstagram, FaSpotify } from "react-icons/fa";
import { FaSquareXTwitter, FaLinkedin } from "react-icons/fa6";
import axios from "axios";

const LINKS = [
  {
    title: "Quick Links",
    items: [
      { name: "products customization", path: "/productsCustomization" },
      { name: "e-gift cards", path: "/giftCards" }, // Add the path for e-gift cards
      { name: "groom shopping assistance", path: "/groomShoppingAssistance" },
      { name: "bridal shopping assistance", path: "/bridalShoppingAssistance" },
      { name: "corporate gifting", path: "/corporateGifting" },
    ],
  },
  {
    title: "Company",
    items: [
      { name: "BLOG", path: "/blogsAll" },
      { name: "Privacy Policy", path: "/privacyPolicy" },
      { name: "Shipping Policy", path: "/shippingPolicy" },
      { name: "Return & Refund Policy", path: "/returnRefundPolicy" },
      { name: "FAQs", path: "/faqs" },
      { name: "Contact Us", path: "/contactUs" },
      { name: "Media", path: "/media" },
      { name: "Terms of use", path: "/termsOfUse" },
    ],
  },
];

const CONTACT_INFO = {
  title: "Contact us",
  details: {
    email: "shop@jijivishaonline.com",
    phone: "+91 79953 21114",
    address: [
      "Jijivisha, Plot Num 09, SMR Enclave, Himayat Sagar",
      "Bandlaguda, Hyderabad, Telangana, India-500091",
    ],
  },
};

const Footer = () => {
  const URI = import.meta.env.VITE_API_URL;
  const [logo, setLogo] = useState("");
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    // Fetch data from API
    const fetchNavbarData = async () => {
      try {
        const response = await axios.get(`${URI}api/navbarIcons/getAll`);
        if (response.data && response.data.length > 0) {
          const { filename } = response.data[0]; // Assuming the first item is the logo
          setLogo(`${URI}uploads/${filename}`); // Adjust URL as needed
        }
      } catch (error) {
        console.error("Error fetching navbar data:", error);
      }
    };

    fetchNavbarData();
  }, [URI]);

  return (
    <footer className="text-gray-800 py-8 font-serif">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="m-auto ">
            {logo && (
              <img
                src={logo}
                alt="Logo"
                className="h-full object-contain cursor-pointer"
                onClick={() => navigate("/")} // Use navigate for redirection
              />
            )}
            <div className="flex justify-start content-center items-center gap-5 mt-4">
              <BsFacebook className="text-3xl text-blue-600" />
              <FaInstagram className="text-3xl text-red-600" />
              <FaSquareXTwitter className="text-3xl text-black" />
              <FaLinkedin className="text-3xl text-blue-600" />
              <FaSpotify className="text-3xl text-amber-600" />
            </div>
          </div>

          {LINKS.map((linkGroup, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">{linkGroup.title}</h3>
              <ul>
                {linkGroup.items.map((item, idx) => (
                  <li key={idx} className="mb-2 hover:text-gray-400">
                    <Link to={item.path}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-lg font-semibold mb-4">
              {CONTACT_INFO.title}
            </h3>
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
            <div className="mt-4">
              <h4 className="text-md font-semibold mb-2">
                Subscribe to our newsletter
              </h4>
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
        <div className="mt-8 border-t border-gray-700 pt-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; 2024 Jijivisha Online. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
