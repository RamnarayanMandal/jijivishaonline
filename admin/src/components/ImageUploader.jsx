import React from "react";

const ImageUploader = ({ onFileChange, onUpload }) => {
  return (
    <div className="p-4">
      <input type="file" name="images" accept="image/*" onChange={onFileChange} />
      <button type="button" onClick={onUpload} className="ml-2 p-2 bg-blue-500 text-white">
        Upload Image
      </button>
    </div>
  );
};

export default ImageUploader;
