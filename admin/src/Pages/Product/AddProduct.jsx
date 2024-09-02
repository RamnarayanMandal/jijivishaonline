import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Button, Input, Textarea } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const navigate = useNavigate();

  const URI = import.meta.env.VITE_API_URL;

  const onSubmit = async (data) => {
    if (!selectedFiles.length || !data.thumbnail) {
      alert("Please upload both thumbnail and product images.");
      return;
    }
    try {
      const formData = new FormData();

      // Append image files to formData
      selectedFiles.forEach((file) => formData.append("images", file));

      // Append other form fields to formData
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      await axios.post(`${URI}api/admin/products`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product added successfully!");
      navigate("/products");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setValue("thumbnail", file); // Save the file object directly
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Add New Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          {/* Thumbnail Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <Input
              type="text"
              {...register("title", { required: true })}
              placeholder="Enter product title"
              className="w-full text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail Image</label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="mb-2 text-black"
            />
            {thumbnailPreview && (
              <img
                src={thumbnailPreview}
                alt="Thumbnail Preview"
                className="w-32 h-32 object-cover rounded-md border border-gray-300"
              />
            )}
          </div>

          {/* Product Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
            <Input
              type="file"
              multiple
              onChange={handleFileChange}
              className="mb-2 text-black"
            />
          </div>

          {/* Basic Product Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
            <Input
              type="number"
              {...register("price")}
              placeholder="Enter product price"
              className="w-full text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Discount</label>
            <Input
              type="number"
              {...register("discount")}
              placeholder="Enter discount"
              className="w-full text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Code</label>
            <Input
              type="text"
              {...register("productCode")}
              placeholder="Enter product code"
              className="w-full text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <Textarea
              {...register("description")}
              placeholder="Enter product description"
              className="w-full text-black"
            />
          </div>

          {/* Category and Classification */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <Input
              type="text"
              {...register("category")}
              placeholder="Enter category"
              className="w-full text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory</label>
            <Input
              type="text"
              {...register("subcategory")}
              placeholder="Enter subcategory"
              className="w-full text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type of Product</label>
            <Input
              type="text"
              {...register("typeOfProduct")}
              placeholder="Enter type of product"
              className="w-full text-black"
            />
          </div>

          {/* Additional Product Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
            <Input
              type="text"
              {...register("size")}
              placeholder="Enter sizes (comma-separated)"
              className="w-full text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
            <Input
              type="number"
              {...register("quantity")}
              placeholder="Enter quantity"
              className="w-full text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">In Stock</label>
            <Input
              type="number"
              {...register("inStock")}
              placeholder="Enter stock quantity"
              className="w-full text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Descriptions</label>
            <Textarea
              {...register("productdescriptions")}
              placeholder="Enter additional product descriptions"
              className="w-full text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
            <Input
              type="text"
              {...register("color")}
              placeholder="Enter color"
              className="w-full text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type of Printing</label>
            <Input
              type="text"
              {...register("typeOfPrinting")}
              placeholder="Enter type of printing"
              className="w-full text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fabric</label>
            <Input
              type="text"
              {...register("fabric")}
              placeholder="Enter fabric"
              className="w-full text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Additional Info 1</label>
            <Input
              type="text"
              {...register("additionalInfo1")}
              placeholder="Enter additional info 1"
              className="w-full text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Additional Info 2</label>
            <Input
              type="text"
              {...register("additionalInfo2")}
              placeholder="Enter additional info 2"
              className="w-full text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Country of Origin</label>
            <Input
              type="text"
              {...register("countryOfOrigin")}
              placeholder="Enter country of origin"
              className="w-full text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Marketed By</label>
            <Input
              type="text"
              {...register("marketedBy")}
              placeholder="Enter marketed by"
              className="w-full text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Note</label>
            <Textarea
              {...register("note")}
              placeholder="Enter any notes"
              className="w-full text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Care Instructions</label>
            <Textarea
              {...register("careInstructions")}
              placeholder="Enter care instructions"
              className="w-full text-black"
            />
          </div>
        </div>
        <Button type="submit" color="blue">Add Product</Button>
      </form>
    </div>
  );
};

export default AddProduct;
