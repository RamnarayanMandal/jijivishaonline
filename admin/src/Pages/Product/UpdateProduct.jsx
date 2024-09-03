import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Label, Input, Textarea } from '@/components/ui/button'; // Adjust import if necessary

export const UpdateProduct = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      title: '',
      descriptions: '',
      category: '',
      subcategory: '',
      price: '',
      discount: '',
      totalPrice: '',
      skuCode: '',
      rating: '',
      productCollection: '',
      patternNumber: '',
      rollSize: '',
      mrpRoll: '',
      quality: '',
      color: '',
      endUse: '',
      compositions: '',
      gsm: '',
      martindale: '',
      material: ''
    }
  });
  
  const [images, setImages] = useState([]);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const navigate = useNavigate(); 
  const location = useLocation();
  const { product } = location.state || {};

  const URI = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (product) {
      reset({
        title: product.title || '',
        descriptions: product.descriptions || '',
        category: product.category || '',
        subcategory: product.subcategory || '',
        price: product.price || '',
        discount: product.discount || '',
        totalPrice: product.totalPrice || '',
        skuCode: product.skuCode || '',
        rating: product.rating || '',
        productCollection: product.productCollection || '',
        patternNumber: product.patternNumber || '',
        rollSize: product.rollSize || '',
        mrpRoll: product.mrpRoll || '',
        quality: product.quality || '',
        color: product.color || '',
        endUse: product.endUse || '',
        compositions: product.compositions || '',
        gsm: product.gsm || '',
        martindale: product.martindale || '',
        material: product.material || ''
      });
    }
  }, [product, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Append form fields to formData
    for (const key in data) {
      formData.append(key, data[key]);
    }

    // Append images to formData
    images.forEach((image) => {
      formData.append('files', image);
    });

    try {
      const response = await axios.put(`${URI}api/admin/products/${product._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Product updated successfully', response.data);
      navigate("/products");
    } catch (error) {
      console.error('Error updating product', error);
    }
  };

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between content-center items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Update Product</h2>
        <Button variant="dark" onClick={() => navigate("/products")}>Back</Button>
      </div>

      {/* Alert Message */}
      {errors && (
        <div className="mb-4">
          <p className="text-red-500">There are errors in your form submission.</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4">
          {/* Title */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Title</Label>
            <Input
              type="text"
              {...register("title", { required: "Title is required" })}
              placeholder="Enter product title"
              className="w-full"
            />
            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
          </div>

          {/* Thumbnail Image */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail Image</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="mb-2"
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
            <Label className="block text-sm font-medium text-gray-700 mb-2">Product Images</Label>
            <Input
              type="file"
              multiple
              onChange={handleFileChange}
              className="mb-2"
            />
          </div>

          {/* Description */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Description</Label>
            <Textarea
              {...register("descriptions", { required: "Description is required" })}
              placeholder="Enter product description"
              className="w-full"
            />
            {errors.descriptions && <p className="text-red-500">{errors.descriptions.message}</p>}
          </div>

          {/* Price */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Price</Label>
            <Input
              type="number"
              {...register("price", { required: "Price is required" })}
              placeholder="Enter product price"
              className="w-full"
            />
            {errors.price && <p className="text-red-500">{errors.price.message}</p>}
          </div>

          {/* Discount */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Discount</Label>
            <Input
              type="number"
              {...register("discount")}
              placeholder="Enter discount"
              className="w-full"
            />
          </div>

          {/* Total Price */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Total Price</Label>
            <Input
              type="number"
              {...register("totalPrice")}
              placeholder="Enter total price"
              className="w-full"
            />
          </div>

          {/* SKU Code */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">SKU Code</Label>
            <Input
              type="text"
              {...register("skuCode")}
              placeholder="Enter SKU code"
              className="w-full"
            />
          </div>

          {/* Rating */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Rating</Label>
            <Input
              type="number"
              {...register("rating")}
              placeholder="Enter rating"
              className="w-full"
            />
          </div>

          {/* Product Collection */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Product Collection</Label>
            <Input
              type="text"
              {...register("productCollection")}
              placeholder="Enter product collection"
              className="w-full"
            />
          </div>

          {/* Pattern Number */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Pattern Number</Label>
            <Input
              type="text"
              {...register("patternNumber")}
              placeholder="Enter pattern number"
              className="w-full"
            />
          </div>

          {/* Roll Size */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Roll Size</Label>
            <Input
              type="text"
              {...register("rollSize")}
              placeholder="Enter roll size"
              className="w-full"
            />
          </div>

          {/* MRP Roll */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">MRP Roll</Label>
            <Input
              type="number"
              {...register("mrpRoll")}
              placeholder="Enter MRP roll"
              className="w-full"
            />
          </div>

          {/* Quality */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Quality</Label>
            <Input
              type="text"
              {...register("quality")}
              placeholder="Enter quality"
              className="w-full"
            />
          </div>

          {/* Color */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Color</Label>
            <Input
              type="text"
              {...register("color")}
              placeholder="Enter color"
              className="w-full"
            />
          </div>

          {/* End Use */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">End Use</Label>
            <Input
              type="text"
              {...register("endUse")}
              placeholder="Enter end use"
              className="w-full"
            />
          </div>

          {/* Compositions */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Compositions</Label>
            <Input
              type="text"
              {...register("compositions")}
              placeholder="Enter compositions"
              className="w-full"
            />
          </div>

          {/* GSM */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">GSM</Label>
            <Input
              type="number"
              {...register("gsm")}
              placeholder="Enter GSM"
              className="w-full"
            />
          </div>

          {/* Martindale */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Martindale</Label>
            <Input
              type="number"
              {...register("martindale")}
              placeholder="Enter Martindale"
              className="w-full"
            />
          </div>

          {/* Material */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Material</Label>
            <Input
              type="text"
              {...register("material")}
              placeholder="Enter material"
              className="w-full"
            />
          </div>
        </div>

        <Button type="submit" variant="dark">Update Product</Button>
      </form>
    </div>
  );
};
