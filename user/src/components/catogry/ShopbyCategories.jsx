import React from "react";
 
// categoriesData.js
export const categories = [
  {
    id: 1,
    name: "Sarees",
    imageUrl: "https://cdn.pixabay.com/photo/2023/12/19/11/16/indian-bride-8457513_1280.jpg"
  },
  {
    id: 2,
    name: "Lehengas",
    imageUrl: "https://images.pexels.com/photos/12737635/pexels-photo-12737635.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 3,
    name: "Kurtis",
    imageUrl: "https://images.pexels.com/photos/20702674/pexels-photo-20702674/free-photo-of-photo-of-a-woman-wearing-a-traditional-red-kurti.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 1,
    name: "Sarees",
    imageUrl: "https://media.istockphoto.com/id/1271408339/photo/close-up-of-colourful-and-decorated-indian-dresses.jpg?s=612x612&w=0&k=20&c=nabaaydq5paBqkJYeCdylmIzCM1Y1B9LtI-zfzjkAKk="
  },
  {
    id: 2,
    name: "Lehengas",
    imageUrl: "https://images.pexels.com/photos/5409534/pexels-photo-5409534.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 3,
    name: "Kurtis",
    imageUrl: "https://images.pexels.com/photos/20702674/pexels-photo-20702674/free-photo-of-photo-of-a-woman-wearing-a-traditional-red-kurti.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 1,
    name: "Sarees",
    imageUrl: "https://images.pexels.com/photos/20702672/pexels-photo-20702672/free-photo-of-elegant-woman-in-black-traditional-clothing-and-heels.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 2,
    name: "Lehengas",
    imageUrl: "https://images.pexels.com/photos/19556879/pexels-photo-19556879/free-photo-of-young-woman-wearing-a-blue-kurti.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 3,
    name: "Kurtis",
    imageUrl: "https://images.pexels.com/photos/20702676/pexels-photo-20702676/free-photo-of-photo-of-a-woman-wearing-a-traditional-red-kurti.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  // Add more categories as needed
];


const ShopbyCategories = () => {
  return (
    <div className="flex flex-col justify-center items-center sm:px-[6%] my-10 sm:py-10 font-serif">
      <h1 className="lg:text-4xl text-2xl text-center font-semibold text-gray-600 mb-6">
        Our Latest Products
      </h1>
      <div className="flex justify-center items-center content-center gap-10 flex-wrap mt-5">
        {categories.map((category) => (
          <div key={category.id} className="flex flex-col items-center content-center cursor-pointer">
            <div className="mb-2">
              <img
                src={category.imageUrl}
                alt={category.name}
                className="w-32 h-32 rounded-full transition-transform duration-300 ease-in-out transform hover:scale-125"
              />
            </div>
            <p className="text-lg text-gray-700">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopbyCategories;
