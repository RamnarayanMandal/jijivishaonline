import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import AddCategoryModal from "./AddCategoryModal"; // Adjust the path as needed
import UpdateCategoryModal from "./UpdateCategoryModal"; // New Update Modal Component
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // Import the Alert components

const MangeCatogry = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // New state for update modal
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null); // For update
  const [alert, setAlert] = useState(null); // For alert

  const URI = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const resp = await axios.get(`${URI}api/categories/`);
      setCategoriesData(resp.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSaveCategory = async (formData) => {
    try {
      const resp = selectedCategory
        ? await axios.put(
            `${URI}api/categories/${selectedCategory._id}`,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          )
        : await axios.post(`${URI}api/categories/`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

      window.location.reload();

      if (selectedCategory) {
        setCategoriesData(
          categoriesData.map((cat) =>
            cat._id === selectedCategory._id ? resp.data : cat
          )
        );
        setAlert({
          type: "success",
          message: "Category updated successfully!",
        });
      } else {
        setCategoriesData([...categoriesData, resp.data]); // Add new category
        setAlert({
          type: "success",
          message: "Category added successfully!",
        });
      }

      setSelectedCategory(null);
    } catch (error) {
      console.error("Error saving category:", error);
      setAlert({
        type: "error",
        message: "Failed to save category.",
      });
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`${URI}api/categories/${categoryId}`);
      setCategoriesData(categoriesData.filter((cat) => cat._id !== categoryId));
      setAlert({
        type: "success",
        message: "Category deleted successfully!",
      });
    } catch (error) {
      console.error("Error deleting category:", error);
      setAlert({
        type: "error",
        message: "Failed to delete category.",
      });
    }
  };

  const handleUpdateCategory = (category) => {
    setSelectedCategory(category);
    setIsUpdateModalOpen(true); // Open the update modal
  };

  const filteredCategories = categoriesData.filter((category) =>
    category.category?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  return (
    <div className="lg:py-5 py-4 px-4 font-sans text-white w-full">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 w-full">
        <div className="w-full lg:w-1/2">
          <input
            type="text"
            placeholder="Search Category"
            className="px-4 py-2 border text-black rounded-lg w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full lg:w-1/2 flex justify-end">
          <Button
            className="my-4"
            onClick={() => {
              setSelectedCategory(null);
              setIsModalOpen(true);
            }}
          >
            ADD Category
          </Button>
        </div>
      </div>

      {/* Display alert message */}
      {alert && (
        <Alert
          variant={alert.type === "success" ? "success" : "destructive"}
          className="my-4"
        >
          <AlertTitle>
            {alert.type === "success" ? "Success" : "Error"}
          </AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}

      {/* Display categories in a full-screen table */}
      <div className="overflow-x-auto max-h-screen">
        <table className="min-w-full  text-white border-collapse">
          <thead className="bg-gray-600">
            <tr>
              <th className="sticky top-0 px-6 py-3 border-b-2 border-gray-700 ">Image</th>
              <th className="sticky top-0 px-6 py-3 border-b-2 border-gray-700 ">Category</th>
              <th className="sticky top-0 px-6 py-3 border-b-2 border-gray-700 ">Subcategories</th>
              <th className="sticky top-0 px-6 py-3 border-b-2 border-gray-700 ">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-400 text-center">
            {filteredCategories.map((data, index) => (
              <tr key={index}>
                <td className="px-6 py-4 border-b border-gray-700">
                  <img
                    src={`${URI}${data.images?.[0] || "placeholder-image.jpg"}`}
                    alt={data.category}
                    className="h-16 w-16 object-cover rounded-lg"
                  />
                </td>
                <td className="px-6 py-4 border-b border-gray-700">{data.category}</td>
                <td className="px-6 py-4 border-b border-gray-700">
                  {data.subcategories.join(", ")}
                </td>
                <td className="px-6 py-4 border-b border-gray-700">
                  <Button
                    className="bg-red-600 mr-2"
                    onClick={() => handleDeleteCategory(data._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    className="bg-yellow-600"
                    onClick={() => handleUpdateCategory(data)}
                  >
                    Update
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCategory}
        category={selectedCategory} // Pass selected category for updating
      />
      <UpdateCategoryModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onSave={handleSaveCategory}
        category={selectedCategory} // Pass selected category for updating
      />
    </div>
  );
};

export default MangeCatogry;
