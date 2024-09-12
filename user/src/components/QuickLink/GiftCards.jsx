import React, { useEffect, useState } from "react";
import axios from "axios";

const GiftCards = () => {
  const URI = import.meta.env.VITE_API_URL;
  const [giftCards, setGiftCards] = useState([]);

  // Fetch gift cards data from API
  useEffect(() => {
    const fetchGiftCards = async () => {
      try {
        const response = await axios.get(
          `${URI}api/quickLink/giftCards`
        );
        // Assuming the API returns an array of gift cards
        const data = response.data; // Modify this if needed based on the actual API response format
        setGiftCards(data.giftCards); // Adjust this based on how the data is structured
        console.log("Gift cards fetched:", data.giftCards); // Adjust this based on how the data is structured in your application
      } catch (error) {
        console.error("Error fetching gift cards:", error);
      }
    };

    fetchGiftCards();
  }, []);

  return (
    <div className="container mx-auto px-4">
      {/* Heading */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-red-600">e-Gift Cards</h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          We are excited to announce that JIJIVISHA now offers e-gift cards, the
          perfect gift for your loved ones who appreciate sustainable and
          eco-friendly products. Simply select the desired denomination and we
          will send the e-gift card directly to your recipient’s email address.
        </p>
      </div>

      {/* Gift Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-8">
        {giftCards.map((card) => (
          <div
            key={card._id}
            className="border rounded-lg shadow-lg p-4 text-center m-2"
          >
            <img
           
              src={`${URI}uploads/${card.image}`}
              alt={`${card.price} E-Gift Card`}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <h2 className="mt-4 text-xl font-semibold">
              Rs {card.price} E-Gift Card
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GiftCards;
