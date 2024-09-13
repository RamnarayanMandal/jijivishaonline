import React, { useState } from "react";

const ImageGallery = ({ product }) => {
  // Set the first image as the default selected image
  const URI = import.meta.env.VITE_API_URL;
  const [selectedImage, setSelectedImage] = useState(product.thumbnail);

  localStorage.setItem('selectedImage', selectedImage);

  return (
    <div className="flex">
      <div className="flex flex-col space-y-2">
        {/* Display product images */}
        {product.images.map((img, index) => (
          <img
            key={index}
            src={`${URI}${img}`}
            alt={`Thumbnail ${index + 1}`}
            className="w-16 h-20 object-cover cursor-pointer"
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>
      {/* Display the selected image */}
      <div className="ml-4">
        <img
          src={`${URI}${selectedImage}`}
          alt="Selected"
          className="w-full h-auto max-w-md"
        />
      </div>
    </div>
  );
};

export default ImageGallery;
