import React from 'react'

export const categories = [
    {
      id: 1,
      name: "bangles",
      imageUrl: "https://cdn.pixabay.com/photo/2023/12/19/11/16/indian-bride-8457513_1280.jpg"
    },
    {
      id: 2,
      name: "necklace",
      imageUrl: "https://images.pexels.com/photos/12737635/pexels-photo-12737635.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 3,
      name: "anklets",
      imageUrl: "https://images.pexels.com/photos/20702674/pexels-photo-20702674/free-photo-of-photo-of-a-woman-wearing-a-traditional-red-kurti.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 4,
      name: "bracelets",
      imageUrl: "https://media.istockphoto.com/id/1271408339/photo/close-up-of-colourful-and-decorated-indian-dresses.jpg?s=612x612&w=0&k=20&c=nabaaydq5paBqkJYeCdylmIzCM1Y1B9LtI-zfzjkAKk="
    },
    {
      id: 5,
      name: "earrings",
      imageUrl: "https://images.pexels.com/photos/20702674/pexels-photo-20702674/free-photo-of-photo-of-a-woman-wearing-a-traditional-red-kurti.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        id: 4,
        name: "bracelets",
        imageUrl: "https://media.istockphoto.com/id/1271408339/photo/close-up-of-colourful-and-decorated-indian-dresses.jpg?s=612x612&w=0&k=20&c=nabaaydq5paBqkJYeCdylmIzCM1Y1B9LtI-zfzjkAKk="
      },
      {
        id: 5,
        name: "earrings",
        imageUrl: "https://images.pexels.com/photos/20702674/pexels-photo-20702674/free-photo-of-photo-of-a-woman-wearing-a-traditional-red-kurti.jpeg?auto=compress&cs=tinysrgb&w=600"
      },
      
    // Add more categories as needed
  ];

export const Handbags = () => {
  return (
    <div className='flex lg:flex-row md:flex-row flex-col items-center lg:gap-10 mt-20 mb-10 py-10 sm:px-[6%] bg-slate-300 font-serif'>
    <h1 className='text-3xl sm:text-4xl text-center font-semibold text-gray-600 mb-8'>Handbags</h1>

    <div className="flex flex-row flex-wrap justify-center gap-4">
      {categories.map((category) => (
        <div key={category.id} className="flex flex-col items-center cursor-pointer">
          <div className="mb-2">
            <img
              src={category.imageUrl}
              alt={category.name}
              className="w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-full transition-transform duration-300 ease-in-out transform hover:scale-110"
            />
          </div>
          <p className="text-sm md:text-base lg:text-lg text-gray-700">{category.name}</p>
        </div>
      ))}
    </div>
  </div>
  )
}
