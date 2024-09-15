import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaPlus, FaTrash } from "react-icons/fa"; // Importing icons

const UpdateCategoryModal = ({ isOpen, onClose, onSave, category }) => {
  const [formData, setFormData] = useState({
    category: "",
    images: null, // For file upload
    subcategories: [] // To manage subcategories
  });

  // Initialize form data when category prop changes
  useEffect(() => {
    if (category) {
      setFormData({
        category: typeof category.category === "string" ? category.category : "",
        images: category.images || null,
        subcategories: category.subcategories || [] // Initialize subcategories
      });
    }
  }, [category]);

  // Clean up object URL when images change
  useEffect(() => {
    return () => {
      if (formData.images && formData.images instanceof File) {
        URL.revokeObjectURL(formData.images.previewUrl);
      }
    };
  }, [formData.images]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images" && files[0]) {
      const file = files[0];
      const previewUrl = URL.createObjectURL(file);
      setFormData({
        ...formData,
        [name]: file,
        previewUrl: previewUrl,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubcategoryChange = (index, e) => {
    const { value } = e.target;
    const newSubcategories = [...formData.subcategories];
    newSubcategories[index] = value;
    setFormData({ ...formData, subcategories: newSubcategories });
  };

  const addSubcategory = () => {
    setFormData({ ...formData, subcategories: [...formData.subcategories, ""] });
  };

  const removeSubcategory = (index) => {
    setFormData({
      ...formData,
      subcategories: formData.subcategories.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = () => {
    const data = new FormData();
    data.append("category", formData.category);
    if (formData.images) {
      data.append("files", formData.images);
    }
    data.append("subcategories", JSON.stringify(formData.subcategories)); // Serialize subcategories
    onSave(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Category</DialogTitle>
          <DialogDescription>
            Modify the category details and save the changes.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="category">Category Name</Label>
            <Input
              type="text"
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Enter category name"
            />
          </div>
          <div>
            <Label htmlFor="images">Upload Image</Label>
            <Input
              type="file"
              name="images"
              id="images"
              onChange={handleChange}
              accept="image/*"
            />
          </div>
          {formData.previewUrl && (
            <div className="mt-4">
              <img
                src={formData.previewUrl}
                alt="Selected category"
                className="h-40 w-full object-cover rounded-lg"
              />
            </div>
          )}
          <div>
            <Label htmlFor="subcategories">Subcategories</Label>
            {formData.subcategories.map((sub, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <Input
                  type="text"
                  name={`subcategory-${index}`}
                  value={sub}
                  onChange={(e) => handleSubcategoryChange(index, e)}
                  placeholder="Enter subcategory"
                />
                <Button
                  type="button"
                  onClick={() => removeSubcategory(index)}
                  variant="destructive"
                >
                  <FaTrash />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={addSubcategory}
              variant="primary"
              className="mt-2"
            >
              <FaPlus /> Add Subcategory
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button variant="primary" onClick={handleSubmit}>
            <FaPlus /> Save Changes
          </Button>
          <Button variant="destructive" onClick={onClose}>
            <FaTrash /> Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCategoryModal;
