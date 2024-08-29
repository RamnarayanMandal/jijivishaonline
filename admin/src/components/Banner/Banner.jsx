import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2
import f1 from "../../assets/f1.png";
import fb1 from "../../assets/fb1.png";
import fb2 from "../../assets/fb2.png";
import r1 from "../../assets/r1.png";

const Banner = () => {
  const [banners, setBanners] = useState({
    banner1: f1,
    banner2: fb1,
    banner3: fb2,
    banner4: r1,
  });

  const [uploadedBanners, setUploadedBanners] = useState({});
  const URI = import.meta.env.VITE_API_URL;

  // Function to handle image upload
  const handleFileChange = (e) => {
    setUploadedBanners({
      ...uploadedBanners,
      [e.target.name]: e.target.files[0],
    });
  };

  // Function to upload banners
  const postBanners = async () => {
    // Show confirmation dialog before upload
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to upload the selected banners?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, upload it!",
      cancelButtonText: "No, cancel",
    });

    if (result.isConfirmed) {
      const formData = new FormData();
      Object.keys(uploadedBanners).forEach((key) => {
        formData.append(key, uploadedBanners[key]);
      });

      // Show loading indicator
      Swal.fire({
        title: "Uploading...",
        text: "Please wait while your banners are being uploaded.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        await axios.post(`${URI}api/admin/upload-banner`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        fetchBanners(); // Fetch banners after uploading new ones

        // Show success message
        Swal.fire(
          "Uploaded!",
          "Your banners have been uploaded successfully.",
          "success"
        );
      } catch (error) {
        console.error(error);

        // Show error message
        Swal.fire(
          "Error!",
          "An error occurred while uploading banners. Please try again later.",
          "error"
        );
      }
    }
  };

  // Function to fetch all banners
  const fetchBanners = async () => {
    try {
      const response = await axios.get(`${URI}api/admin/get-all-banners`);
      setBanners({
        banner1: `${URI}${response.data.data[0].banner1}`,
        banner2: `${URI}${response.data.data[0].banner2}`,
        banner3: `${URI}${response.data.data[0].banner3}`,
        banner4: `${URI}${response.data.data[0].banner4}`,
      });
      console.log(response.data.data[0].banner1);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle deletion of banners
  const handleDelete = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover these banners!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, keep it",
      });

      if (result.isConfirmed) {
        await axios.delete(`${URI}api/admin/delete-banner`);
        fetchBanners(); // Refresh the banners after deletion

        Swal.fire("Deleted!", "Your banners have been deleted.", "success");
      }
    } catch (error) {
      console.error(error);

      Swal.fire(
        "Error!",
        "An error occurred while deleting banners. Please try again later.",
        "error"
      );
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between px-4 sm:px-[6%] py-6 sm:py-10 gap-4">
        <div className="flex flex-col w-full sm:w-9/12">
          {banners.banner1 && (
            <>
              <div className="mb-4">
                <img
                  src={banners.banner1}
                  alt="Main Banner"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                {banners.banner2 && (
                  <img
                    src={banners.banner2}
                    alt="Facebook Banner 1"
                    className="w-full sm:w-1/2 h-auto object-cover"
                  />
                )}
                {banners.banner3 && (
                  <img
                    src={banners.banner3}
                    alt="Facebook Banner 2"
                    className="w-full sm:w-1/2 h-auto object-cover pr-4"
                  />
                )}
              </div>
            </>
          )}
        </div>
        <div className="w-full sm:w-1/4 flex-shrink-0">
          {banners.banner4 && (
            <img
              src={banners.banner4}
              alt="Right Banner"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Input fields for uploading new images */}
      </div>
      <div className="flex flex-col justify-between px-4 sm:px-[6%] py-6 sm:py-10 gap-4">
        <div className="w-full flex">
        <input
          type="file"
          name="banner1"
          onChange={handleFileChange}
          className="mb-2"
        />
        <input
          type="file"
          name="banner2"
          onChange={handleFileChange}
          className="mb-2"
        />
        <input
          type="file"
          name="banner3"
          onChange={handleFileChange}
          className="mb-2"
        />
        <input
          type="file"
          name="banner4"
          onChange={handleFileChange}
          className="mb-2"
        />
        </div>
        <div className="flex justify-center content-center items-center gap-4">
          <button
            onClick={postBanners}
            className="mt-2 p-2 bg-blue-500 text-white rounded"
          >
            Upload Banners
          </button>
          <button
            onClick={handleDelete}
            className="mt-2 p-2 bg-red-500 text-white rounded"
          >
            Delete Banners
          </button>
        </div>
      </div>
    </>
  );
};

export default Banner;
