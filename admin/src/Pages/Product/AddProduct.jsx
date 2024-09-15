import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [colorInputs, setColorInputs] = useState([""]);
  const [sizeInputs, setSizeInputs] = useState([""]);
  const [materialCareInputs, setMaterialCareInputs] = useState([""]); // For material care
  const [shippingInfoInputs, setShippingInfoInputs] = useState([""]); // For shipping info
  const navigate = useNavigate();

  const URI = import.meta.env.VITE_API_URL;

  const onSubmit = async (data) => {
    if (!selectedFiles.length || !data.thumbnail) {
      setAlert({
        type: "error",
        message: "Please upload both thumbnail and product images.",
      });
      return;
    }

    try {
      const formData = new FormData();

      // Append image files to formData
      selectedFiles.forEach((file) => formData.append("images", file));

      // Process color inputs and save as an array
      formData.append("color", colorInputs.filter(c => c.trim()));  // Directly use array
      formData.append("size", sizeInputs.filter(s => s.trim()));    // Directly use array
  
      // Append other form fields to formData
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      await axios.post(`${URI}api/admin/products`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setAlert({
        type: "success",
        message: "Product added successfully!",
      });

      setTimeout(() => {
        navigate("/products");
      }, 2000);
    } catch (error) {
      console.error("Error adding product:", error);
      setAlert({
        type: "error",
        message: "Failed to add product.",
      });
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
      setValue("thumbnail", file); 
    }
  };

  const addColorInput = () => {
    setColorInputs([...colorInputs, ""]);
  };

  const removeColorInput = (index) => {
    setColorInputs(colorInputs.filter((_, i) => i !== index));
  };

  const addSizeInput = () => {
    setSizeInputs([...sizeInputs, ""]);
  };

  const removeSizeInput = (index) => {
    setSizeInputs(sizeInputs.filter((_, i) => i !== index));
  };

  const addMaterialCareInput = () => setMaterialCareInputs([...materialCareInputs, ""]);
  const removeMaterialCareInput = (index) => setMaterialCareInputs(materialCareInputs.filter((_, i) => i !== index));

  const addShippingInfoInput = () => setShippingInfoInputs([...shippingInfoInputs, ""]);
  const removeShippingInfoInput = (index) => setShippingInfoInputs(shippingInfoInputs.filter((_, i) => i !== index));


  return (
    <div className="container mx-auto p-6 bg-gray-100 shadow-lg rounded-lg">
      <div className="flex justify-between content-center items-center">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
          Add New Product
        </h2>
        <Button variant="dark" onClick={() => navigate("/products")}>
          Back
        </Button>
      </div>

      {/* Alert Message */}
      {alert.message && (
        <Alert
          variant={alert.type === "success" ? "success" : "error"}
          className="mb-4"
        >
          <AlertTitle>
            {alert.type === "success" ? "Success" : "Error"}
          </AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          {/* Title */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </Label>
            <Input
              type="text"
              {...register("title", { required: true })}
              placeholder="Enter product title"
              className="w-full text-black"
            />
          </div>

          {/* Thumbnail Image */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Thumbnail Image
            </Label>
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
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images
            </Label>
            <Input
              type="file"
              multiple
              onChange={handleFileChange}
              className="mb-2 text-black"
            />
          </div>

          {/* Description */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </Label>
            <Textarea
              {...register("description", { required: true })}
              placeholder="Enter product description"
              className="w-full text-black"
            />
          </div>

          {/* Price */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Price
            </Label>
            <Input
              type="number"
              {...register("price", { required: true })}
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
            <label className="block text-sm font-medium text-gray-700 mb-2">SKU</label>
            <Input
              type="text"
              {...register("SKU")}
              placeholder="Enter Sku code"
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Size
            </label>
            {sizeInputs.map((size, index) => (
              <div key={index} className="flex items-center mb-2">
                <Input
                  type="text"
                  value={size}
                  onChange={(e) => {
                    const updatedSizes = [...sizeInputs];
                    updatedSizes[index] = e.target.value;
                    setSizeInputs(updatedSizes);
                  }}
                  placeholder="Enter size"
                  className="w-full text-black"
                />
                <Button
                  type="button"
                  onClick={() => removeSizeInput(index)}
                  className="ml-2"
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" onClick={addSizeInput}>
              Add More Size
            </Button>
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
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Colors
            </Label>
            {colorInputs.map((color, index) => (
              <div key={index} className="flex items-center mb-2">
                <Input
                  type="text"
                  value={color}
                  onChange={(e) => {
                    const updatedColors = [...colorInputs];
                    updatedColors[index] = e.target.value;
                    setColorInputs(updatedColors);
                  }}
                  placeholder="Enter color"
                  className="w-full text-black"
                />
                <Button
                  type="button"
                  onClick={() => removeColorInput(index)}
                  className="ml-2"
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" onClick={addColorInput}>
              Add More Color
            </Button>
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

          <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">Material Care</Label>
          {materialCareInputs.map((care, index) => (
            <div key={index} className="flex items-center mb-2">
              <Input
                type="text"
                value={care}
                onChange={(e) => {
                  const updatedMaterialCare = [...materialCareInputs];
                  updatedMaterialCare[index] = e.target.value;
                  setMaterialCareInputs(updatedMaterialCare);
                }}
                placeholder="Enter material care instruction"
                className="w-full text-black"
              />
              <Button type="button" onClick={() => removeMaterialCareInput(index)} className="ml-2">
                Remove
              </Button>
            </div>
          ))}
          <Button type="button" onClick={addMaterialCareInput}>
            Add More Material Care
          </Button>
        </div>

        {/* Shipping Info */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">Shipping Info</Label>
          {shippingInfoInputs.map((info, index) => (
            <div key={index} className="flex items-center mb-2">
              <Input
                type="text"
                value={info}
                onChange={(e) => {
                  const updatedShippingInfo = [...shippingInfoInputs];
                  updatedShippingInfo[index] = e.target.value;
                  setShippingInfoInputs(updatedShippingInfo);
                }}
                placeholder="Enter shipping info"
                className="w-full text-black"
              />
              <Button type="button" onClick={() => removeShippingInfoInput(index)} className="ml-2">
                Remove
              </Button>
            </div>
          ))}
          <Button type="button" onClick={addShippingInfoInput}>
            Add More Shipping Info
          </Button>
        </div>
          

        </div>

        <Button type="submit"  variant="outline"  className="w-full mt-4">
          Add Product
        </Button>
      </form>
    </div>
  );
};

export default AddProduct;
