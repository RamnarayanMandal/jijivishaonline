import { Button, Modal, Box, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

const ManageNavIcons = () => {
  const URI = import.meta.env.VITE_API_URL;
  const [icons, setIcons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [newFile, setNewFile] = useState(null);

  const fetchIcons = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${URI}api/navbarIcons/getAll`);
      setIcons(response.data);
    } catch (err) {
      setError("Error fetching icons");
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (event, icon) => {
    setSelectedIcon(icon);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedIcon(null);
    setNewFile(null);
  };

  const handleFileChange = (event) => {
    setNewFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (selectedIcon && newFile) {
      const formData = new FormData();
      formData.append("file", newFile);

      try {
        await axios.put(
          `${URI}api/navbarIcons/update-files/${selectedIcon._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        fetchIcons();
        handleClose();
      } catch (err) {
        setError("Error updating icon");
      }
    }
  };

  return (
    <div>
      <h1>Manage Icons</h1>
      <Button variant="contained" onClick={fetchIcons}>
        Show Icons
      </Button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="icon-container mt-4">
        {icons.length > 0
          ? icons.map((icon) => (
              <div key={icon._id} className="relative inline-block">
                <img
                  src={`${URI}uploads/${icon.filename}`}
                  alt="Icon"
                  className="w-full h-16 object-cover cursor-pointer"
                  onClick={(event) => handleClick(event, icon)}
                />
              </div>
            ))
          : !loading && <p>No icons found</p>}
      </div>

      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            className="text-black"
          >
            Update Icon
          </Typography>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <Button
            variant="contained"
            color="primary"
            onClick={handleFileUpload}
            sx={{ mt: 2 }}
          >
            Upload
          </Button>
          {error && <p>{error}</p>}
        </Box>
      </Modal>
    </div>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default ManageNavIcons;
