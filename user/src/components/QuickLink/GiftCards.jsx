import React from "react";

const GiftCards = () => {
  const giftCards = [
    {
      id: 1,
      image: "https://via.placeholder.com/300x150", // Replace with actual image URL
      price: "Rs 1100",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/300x150", // Replace with actual image URL
      price: "Rs 3100",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/300x150", // Replace with actual image URL
      price: "Rs 5100",
    },
  ];

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
            key={card.id}
            className="border rounded-lg shadow-lg p-4 text-center m-2"
          >
            <img
              src={card.image}
              alt={`${card.price} E-Gift Card`}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <h2 className="mt-4 text-xl font-semibold">
              {card.price} E-Gift Card
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GiftCards;
