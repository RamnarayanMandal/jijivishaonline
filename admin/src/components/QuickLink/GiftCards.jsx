import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const GiftCards = () => {
  const URI = import.meta.env.VITE_API_URL; // Ensure this is correctly set
  const [giftCards, setGiftCards] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  // Fetch gift cards data from API
  useEffect(() => {
    const fetchGiftCards = async () => {
      try {
        const response = await axios.get(`${URI}api/quickLink/giftCards`);
        setGiftCards(response.data.giftCards);
      } catch (error) {
        console.error("Error fetching gift cards:", error);
      }
    };

    fetchGiftCards();
  }, [URI]);

  // Handle opening and closing the modals
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setPrice("");
    setImage(null);
  };
  const handleEditOpen = (card) => {
    setSelectedCard(card);
    setPrice(card.price);
    setEditOpen(true);
  };
  const handleEditClose = () => {
    setEditOpen(false);
    setSelectedCard(null);
    setPrice("");
    setImage(null);
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle submitting the gift card creation
  const handleCreateGiftCard = async () => {
    if (!price || !image) {
      alert("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("price", price);
    formData.append("file", image);

    try {
      await axios.post(`${URI}api/quickLink/giftCards`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Gift Card Created Successfully!");
      handleClose(); // Close the modal and reset fields

      // Fetch the gift cards again to reflect the newly added one
      const response = await axios.get(`${URI}api/quickLink/giftCards`);
      setGiftCards(response.data.giftCards);
    } catch (error) {
      console.error("Error creating gift card:", error);
      alert("Failed to create gift card");
    }
  };

  // Handle updating the gift card
  const handleUpdateGiftCard = async () => {
    if (!price) {
      alert("Please fill in the price");
      return;
    }

    const formData = new FormData();
    formData.append("price", price);
    if (image) {
      formData.append("file", image);
    }

    try {
      await axios.put(
        `${URI}api/quickLink/giftCards/${selectedCard._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Gift Card Updated Successfully!");
      handleEditClose(); // Close the edit modal and reset fields

      // Fetch the gift cards again to reflect the updated one
      const response = await axios.get(`${URI}api/quickLink/giftCards`);
      setGiftCards(response.data.giftCards);
    } catch (error) {
      console.error("Error updating gift card:", error);
      alert("Failed to update gift card");
    }
  };

  // Handle deleting a gift card
  // Handle deleting a gift card
  const handleDeleteGiftCard = async (id) => {
    if (window.confirm("Are you sure you want to delete this gift card?")) {
      try {
        // Perform the deletion
        await axios.delete(`${URI}api/quickLink/giftCards/${id}`);

        // Fetch the updated list after deletion
        const response = await axios.get(`${URI}api/quickLink/giftCards`);
        console.log("====================================");
        console.log(response.data.giftCards);
        console.log("====================================");
        setGiftCards(response.data.giftCards);

        // Show success message after deletion is complete
        alert("Gift Card Deleted Successfully!");
      } catch (error) {
        console.error("Error deleting gift card:", error);
        alert("Failed to delete gift card");
      }
    }
  };

  return (
    <div className="container mx-auto px-4">
      {/* Heading */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-red-600">e-Gift Cards</h1>
      </div>

      {/* Button to open the modal */}
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Create Gift Card
      </Button>

      {/* Modal for creating gift cards */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Gift Card</DialogTitle>
        <DialogContent>
          <TextField
            label="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            fullWidth
            margin="normal"
          />
          <input
            accept="image/*"
            type="file"
            onChange={handleImageChange}
            style={{ marginTop: "16px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCreateGiftCard} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal for editing gift cards */}
      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Gift Card</DialogTitle>
        <DialogContent>
          <TextField
            label="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            fullWidth
            margin="normal"
          />
          <input
            accept="image/*"
            type="file"
            onChange={handleImageChange}
            style={{ marginTop: "16px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateGiftCard} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Gift Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-8">
        {giftCards.map((card) => (
          <div
            key={card._id}
            className="border rounded-lg shadow-lg p-4 text-center m-2"
          >
            <img
              src={`${URI}uploads/${card.image}`}
              alt={`${card.price} E-Gift Card`}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <h2 className="mt-4 text-xl font-semibold">
              Rs {card.price} E-Gift Card
            </h2>
            <div className="mt-4">
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleEditOpen(card)}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleDeleteGiftCard(card._id)}
                style={{ marginLeft: "8px" }}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GiftCards;
