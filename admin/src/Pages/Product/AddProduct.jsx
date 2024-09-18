import React, { useEffect, useState } from "react";
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
  const [materialCareInputs, setMaterialCareInputs] = useState([]);
  const [shippingInfoInputs, setShippingInfoInputs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [categoriesData, setCategoriesData] = useState([]);
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
      selectedFiles.forEach((file) => formData.append("images", file));
      formData.append("thumbnail", data.thumbnail);
      formData.append("color", colorInputs.filter((c) => c.trim()));
      formData.append("size", sizeInputs.filter((s) => s.trim()));
      formData.append("category", selectedCategory?.category || "");
      formData.append("subcategory", selectedSubCategory?.name || "");
      formData.append("typeOfProduct", selectedType || "");  // Ensure this line is included
      formData.append("materialCare", materialCareInputs.filter((m) => m.trim()));
      formData.append("shippingInfo", shippingInfoInputs.filter((s) => s.trim()));
  
      Object.keys(data).forEach((key) => {
        if (key !== "thumbnail") {
          formData.append(key, data[key]);
        }
      });
  
      await axios.post(`${URI}api/admin/products`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      setAlert({ type: "success", message: "Product added successfully!" });
      setTimeout(() => navigate("/products"), 2000);
    } catch (error) {
      console.error("Error adding product:", error);
      setAlert({ type: "error", message: "Failed to add product." });
    }
  };
  

  useEffect(() => {
    fetch(`${URI}api/navbar/categories`)
      .then((response) => response.json())
      .then((data) => setCategoriesData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setThumbnailPreview(reader.result);
      reader.readAsDataURL(file);
      setValue("thumbnail", file);
    }
  };

  const addColorInput = () => setColorInputs([...colorInputs, ""]);
  const removeColorInput = (index) =>
    setColorInputs(colorInputs.filter((_, i) => i !== index));
  const addSizeInput = () => setSizeInputs([...sizeInputs, ""]);
  const removeSizeInput = (index) =>
    setSizeInputs(sizeInputs.filter((_, i) => i !== index));
  const addMaterialCareInput = () =>
    setMaterialCareInputs([...materialCareInputs, ""]);
  const removeMaterialCareInput = (index) =>
    setMaterialCareInputs(materialCareInputs.filter((_, i) => i !== index));
  const addShippingInfoInput = () =>
    setShippingInfoInputs([...shippingInfoInputs, ""]);
  const removeShippingInfoInput = (index) =>
    setShippingInfoInputs(shippingInfoInputs.filter((_, i) => i !== index));

  const handleCategoryChange = (e) => {
    const category = categoriesData.find(
      (cat) => cat.category === e.target.value
    );
    if (category) {
      setSelectedCategory(category);
      setSelectedSubCategory(null); // Reset subcategory when category changes
      setSelectedType(null); // Reset type when category changes
    }
  };

  const handleSubCategoryChange = (e) => {
    const subCategory = selectedCategory?.subCategoryData.find(
      (subCat) => subCat.name === e.target.value
    );
    setSelectedSubCategory(subCategory);
    setSelectedType(null); // Reset type when subcategory changes
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  return (
    <div className="container mx-10 my-5 p-6 bg-gray-100 shadow-lg rounded-lg overflow-hidden">
      <div className="flex justify-between content-center items-center">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
          Add New Product
        </h2>
        <Button variant="outline" onClick={() => navigate("/products")}>
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

          {/* Discount */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Discount
            </Label>
            <Input
              type="number"
              {...register("discount")}
              placeholder="Enter discount"
              className="w-full text-black"
            />
          </div>

          {/* SKU */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              SKU
            </Label>
            <Input
              type="text"
              {...register("SKU")}
              placeholder="Enter SKU code"
              className="w-full text-black"
            />
          </div>

          {/* Category */}
          <div className="text-gray-700">
            <Label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Category
            </Label>
            <select
              id="category"
              onChange={handleCategoryChange}
              className="w-full bg-gray-200 border border-gray-300 rounded-md py-2 px-3 text-gray-900"
            >
              <option value="">Select Category</option>
              {categoriesData.map((cat) => (
                <option key={cat._id} value={cat.category}>
                  {cat.category.charAt(0).toUpperCase() +
                    cat.category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory */}
          {selectedCategory && (
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Subcategory
              </Label>
              <select
                id="subcategory"
                onChange={handleSubCategoryChange}
                className="w-full bg-gray-200 border border-gray-300 rounded-md py-2 px-3 text-gray-900"
              >
                <option value="">Select Subcategory</option>
                {selectedCategory?.subCategoryData?.map((subCat) => (
                  <option key={subCat._id} value={subCat.name}>
                    {subCat.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Type */}
          {selectedSubCategory && (
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </Label>
              <select
                id="type"
                onChange={handleTypeChange}
                className="w-full bg-gray-200 border border-gray-300 rounded-md py-2 px-3 text-gray-900"
              >
                <option value="">Select Type</option>
                {selectedSubCategory?.types?.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Color Inputs */}
        <div className="mt-6">
          <Label className="block text-sm font-medium text-gray-700 mb-2">
            Available Colors
          </Label>
          {colorInputs.map((color, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <Input
                type="text"
                value={color}
                onChange={(e) => {
                  const updatedColors = [...colorInputs];
                  updatedColors[index] = e.target.value;
                  setColorInputs(updatedColors);
                }}
                className="flex-1 text-black"
                placeholder="Enter color"
              />
              <Button variant="destructive" onClick={() => removeColorInput(index)}>
                Remove
              </Button>
            </div>
          ))}
          <Button variant="outline" onClick={addColorInput}>
            Add Color
          </Button>
        </div>

        {/* Size Inputs */}
        <div className="mt-6">
          <Label className="block text-sm font-medium text-gray-700 mb-2">
            Available Sizes
          </Label>
          {sizeInputs.map((size, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <Input
                type="text"
                value={size}
                onChange={(e) => {
                  const updatedSizes = [...sizeInputs];
                  updatedSizes[index] = e.target.value;
                  setSizeInputs(updatedSizes);
                }}
                className="flex-1 text-black"
                placeholder="Enter size"
              />
              <Button variant="destructive" onClick={() => removeSizeInput(index)}>
                Remove
              </Button>
            </div>
          ))}
          <Button variant="outline" onClick={addSizeInput}>
            Add Size
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

        {/* Material & Care Inputs */}
        <div className="mt-6">
          <Label className="block text-sm font-medium text-gray-700 mb-2">
            Material & Care Instructions
          </Label>
          {materialCareInputs.map((input, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <Input
                type="text"
                value={input}
                onChange={(e) => {
                  const updatedInputs = [...materialCareInputs];
                  updatedInputs[index] = e.target.value;
                  setMaterialCareInputs(updatedInputs);
                }}
                className="flex-1 text-black"
                placeholder="Enter material or care instruction"
              />
              <Button variant="destructive" onClick={() => removeMaterialCareInput(index)}>
                Remove
              </Button>
            </div>
          ))}
          <Button variant="outline" onClick={addMaterialCareInput}>
            Add Material/Care Instruction
          </Button>
        </div>

        {/* Shipping Information Inputs */}
        <div className="mt-6">
          <Label className="block text-sm font-medium text-gray-700 mb-2">
            Shipping Information
          </Label>
          {shippingInfoInputs.map((input, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <Input
                type="text"
                value={input}
                onChange={(e) => {
                  const updatedInputs = [...shippingInfoInputs];
                  updatedInputs[index] = e.target.value;
                  setShippingInfoInputs(updatedInputs);
                }}
                className="flex-1 text-black"
                placeholder="Enter shipping info"
              />
              <Button variant="destructive" onClick={() => removeShippingInfoInput(index)}>
                Remove
              </Button>
            </div>
          ))}
          <Button variant="outline" onClick={addShippingInfoInput}>
            Add Shipping Info
          </Button>
        </div>

        <div className="mt-6 flex justify-center ">
          <Button  variant="outline"  type="submit" className="w-11/12">
            Add Product
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
