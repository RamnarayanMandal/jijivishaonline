import React, { useState } from "react";
import Modal from "react-modal";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import axios from "axios";

Modal.setAppElement('#root'); // Ensure this is correct for your setup

const ProductDetails = ({ product, fetchProduct }) => {
  console.log("Product Details", product);
  const URI = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`${URI}api/admin/product/${product._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchProduct();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting product", error.message);
    }
  };

  console.log("images",product)

  return (
    <>
      <Card className={cn("w-full max-w-lg mx-auto shadow-md p-4")}>
        {/* Card Header with Product Title */}
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{product.title}</CardTitle>
          <p className="text-muted-foreground text-sm mt-1">
            SKU Code: {product.skuCode}
          </p>
        </CardHeader>

        {/* Card Content */}
        <CardContent className="space-y-4">
          {/* Product Images */}
          <div className="grid grid-cols-3 gap-2">
            <img
              src={`${URI}uploads/${product?.images[0]}`}
              alt={`Product image`}
              className="w-full  object-cover rounded-md"
            />
          </div>
          <div>
            <p>
              <strong>Description:</strong> {product.descriptions}
            </p>
          </div>
          {/* Product Details */}
          <div className="grid grid-cols-2 gap-2">
            <p>
              <strong>Category:</strong> {product.categories}
            </p>
            <p>
              <strong>Subcategory:</strong> {product.subcategory}
            </p>
            <p>
              <strong>Price:</strong> ₹{product.price}
            </p>

            <p>
              <strong>Discount:</strong> {product.discount}%
            </p>
            <p>
              <strong>Total Price:</strong> ${product.totalPrice}
            </p>
            <p>
              <strong>Rating:</strong> {product.rating} / 5
            </p>
            <p>
              <strong>Color:</strong> {product.color}
            </p>
            <p>
              <strong>Material:</strong> {product.material}
            </p>
            <p>
              <strong>End Use:</strong> {product.endUse}
            </p>
            <p>
              <strong>Compositions:</strong> {product.compositions}
            </p>
            <p>
              <strong>GSM:</strong> {product.gsm}
            </p>
          </div>
        </CardContent>

        {/* Card Footer with Action Buttons */}
        <CardFooter className="flex justify-between">
          <Button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => {
              navigate("/UpdateProduct", { state: { product } });
            }}
          >
            Update Product
          </Button>

          <Button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => setIsModalOpen(true)}
          >
            Delete Product
          </Button>
        </CardFooter>
      </Card>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Confirm Deletion"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div style={{ border: '1px solid red', padding:10, borderRadius:10 }}>
          <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
          <p className="mb-4">Are you sure you want to delete this product? This action cannot be undone.</p>
          <div className="flex justify-end  gap-5">
            <Button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleDelete}
            >
              Yes, delete it!
            </Button>
            <Button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProductDetails;
