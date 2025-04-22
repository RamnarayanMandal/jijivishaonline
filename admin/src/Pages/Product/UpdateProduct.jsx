import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const UpdateProduct = () => {
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      description: '',
      category: '',
      subcategory: '',
      price: '',
      discount: '',
      productCode: '',
      color: [],
      typeOfProduct: '',
      size: [],
      quantity: '',
      inStock: '',
      typeOfPrinting: '',
      fabric: '',
      additionalInfo1: '',
      additionalInfo2: '',
      countryOfOrigin: '',
      marketedBy: '',
      note: '',
      materialCare: '',
      disclaimer: '',
      shippingInfo: '',
    }
  });

  const { fields: colorFields, append: appendColor, remove: removeColor } = useFieldArray({
    control,
    name: 'color',
  });
  const { fields: sizeFields, append: appendSize, remove: removeSize } = useFieldArray({
    control,
    name: 'size',
  });

  const [images, setImages] = useState([]);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state || {};
  const URI = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (product) {
      reset({
        title: product.title || '',
        description: product.description || '',
        category: product.category || '',
        subcategory: product.subcategory || '',
        price: product.price || '',
        discount: product.discount || '',
        productCode: product.productCode || '',
        color: product.color || [],
        typeOfProduct: product.typeOfProduct || '',
        size: product.size || [],
        quantity: product.quantity || '',
        inStock: product.inStock || '',
        typeOfPrinting: product.typeOfPrinting || '',
        fabric: product.fabric || '',
        additionalInfo1: product.additionalInfo1 || '',
        additionalInfo2: product.additionalInfo2 || '',
        countryOfOrigin: product.countryOfOrigin || '',
        marketedBy: product.marketedBy || '',
        note: product.note || '',
        materialCare: product.materialCare || '',
        disclaimer: product.disclaimer || '',
        shippingInfo: product.shippingInfo || '',
      });

      setImages(product.images || []);
      setThumbnailPreview(product.thumbnail ? `${URI}/${product.thumbnail}` : null);
    }
  }, [product, reset, URI]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Append form fields to formData
    for (const key in data) {
      if (Array.isArray(data[key])) {
        data[key].forEach((item) => formData.append(key, item));
      } else {
        formData.append(key, data[key]);
      }
    }

    // Append images to formData
    images.forEach((image) => {
      formData.append('images', image);
    });

    if (thumbnailFile) {
      formData.append('thumbnail', thumbnailFile);
    }

    try {
      const response = await axios.put(`${URI}api/admin/product/${product._id}`, formData, {
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
      setThumbnailFile(file); // Save file for form submission
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
              {...register("title")}
              placeholder="Enter product title"
              className="w-full text-black"
            />
          </div>

          {/* Thumbnail Image */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail Image</Label>
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
            <Label className="block text-sm font-medium text-gray-700 mb-2">Product Images</Label>
            <Input
              type="file"
              multiple
              onChange={handleFileChange}
              className="mb-2 text-black"
            />
          </div>

          {/* Description */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Description</Label>
            <Textarea
              {...register("description")}
              placeholder="Enter product description"
              className="w-full text-black"
            />
          </div>

          {/* Price */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Price</Label>
            <Input
              type="number"
              {...register("price")}
              placeholder="Enter product price"
              className="w-full text-black"
            />
          </div>

          {/* Discount */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Discount</Label>
            <Input
              type="number"
              {...register("discount")}
              placeholder="Enter discount"
              className="w-full text-black"
            />
          </div>

          {/* Product Code */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Product Code</Label>
            <Input
              type="text"
              {...register("productCode")}
              placeholder="Enter product code"
              className="w-full text-black"
            />
          </div>

          {/* Color */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Colors</Label>
            {colorFields.map((item, index) => (
              <div key={item.id} className="flex items-center mb-2">
                <Input
                  type="text"
                  {...register(`color.${index}`)}
                  placeholder="Enter color"
                  className="w-full text-black"
                />
                <Button
                  type="button"
                  onClick={() => removeColor(index)}
                  className="ml-2"
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" onClick={() => appendColor('')}>
              Add More Color
            </Button>
          </div>

          {/* Type of Product */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Type of Product</Label>
            <Input
              type="text"
              {...register("typeOfProduct")}
              placeholder="Enter type of product"
              className="w-full text-black"
            />
          </div>

          {/* Size */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Sizes</Label>
            {sizeFields.map((item, index) => (
              <div key={item.id} className="flex items-center mb-2">
                <Input
                  type="text"
                  {...register(`size.${index}`)}
                  placeholder="Enter size"
                  className="w-full text-black"
                />
                <Button
                  type="button"
                  onClick={() => removeSize(index)}
                  className="ml-2"
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" onClick={() => appendSize('')}>
              Add More Size
            </Button>
          </div>

          {/* Quantity */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Quantity</Label>
            <Input
              type="number"
              {...register("quantity")}
              placeholder="Enter product quantity"
              className="w-full text-black"
            />
          </div>

          {/* In Stock */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">In Stock</Label>
            <Input
              type="text"
              {...register("inStock")}
              placeholder="Enter stock status"
              className="w-full text-black"
            />
          </div>

          {/* Type of Printing */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Type of Printing</Label>
            <Input
              type="text"
              {...register("typeOfPrinting")}
              placeholder="Enter type of printing"
              className="w-full text-black"
            />
          </div>

          {/* Fabric */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Fabric</Label>
            <Input
              type="text"
              {...register("fabric")}
              placeholder="Enter fabric type"
              className="w-full text-black"
            />
          </div>

          {/* Additional Info 1 */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Additional Info 1</Label>
            <Input
              type="text"
              {...register("additionalInfo1")}
              placeholder="Enter additional information"
              className="w-full text-black"
            />
          </div>

          {/* Additional Info 2 */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Additional Info 2</Label>
            <Input
              type="text"
              {...register("additionalInfo2")}
              placeholder="Enter additional information"
              className="w-full text-black"
            />
          </div>

          {/* Country of Origin */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Country of Origin</Label>
            <Input
              type="text"
              {...register("countryOfOrigin")}
              placeholder="Enter country of origin"
              className="w-full text-black"
            />
          </div>

          {/* Marketed By */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Marketed By</Label>
            <Input
              type="text"
              {...register("marketedBy")}
              placeholder="Enter marketed by"
              className="w-full text-black"
            />
          </div>

          {/* Note */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Note</Label>
            <Textarea
              {...register("note")}
              placeholder="Enter any additional notes"
              className="w-full text-black"
            />
          </div>

          {/* Material Care */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Material Care</Label>
            <Textarea
              {...register("materialCare")}
              placeholder="Enter material care instructions"
              className="w-full text-black"
            />
          </div>

          {/* Disclaimer */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Disclaimer</Label>
            <Textarea
              {...register("disclaimer")}
              placeholder="Enter product disclaimer"
              className="w-full text-black"
            />
          </div>

          {/* Shipping Info */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Shipping Info</Label>
            <Textarea
              {...register("shippingInfo")}
              placeholder="Enter shipping information"
              className="w-full text-black"
            />
          </div>

        </div>

        <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Update Product
        </Button>
      </form>
    </div>
  );
};
