const upload = require("../../modules/fileModule");
const File = require("../models/navbarIcons");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Upload and replace existing file if any
const uploadNavIcons = (req, res, next) => {
  upload.single("file")(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).send(err.message);
    } else if (err) {
      return res.status(500).send("An unknown error occurred.");
    }

    try {
      // Check if there is an existing file with the same filename in the database
      const existingFile = await File.findOne({
        filename: req.file.filename,
      });

      if (existingFile) {
        // Delete the existing file from the file system
        const filePath = path.join(
          __dirname,
          "../uploads",
          existingFile.filename
        );

        try {
          await fs.promises.unlink(filePath);
          console.log("Previous file deleted:", filePath);
        } catch (deleteError) {
          console.error("Error deleting file:", deleteError);
        }

        // Remove file entry from database
        await File.deleteOne({ _id: existingFile._id });
      }

      // Save new file metadata to the database
      const fileData = new File({
        filename: req.file.filename,
        path: req.file.path,
        mimetype: req.file.mimetype,
        size: req.file.size,
      });

      await fileData.save();

      const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
      res.json({ message: "Upload successful", file: req.file, url: fileUrl });
    } catch (error) {
      res.status(500).send("Error handling file upload.");
    }
  });
};

const getFileAll = async (req, res) => {
  try {
    const files = await File.find({});
    res.json(files);
  } catch (error) {
    res.status(500).send("Error retrieving files.");
  }
};

// Update an existing file by ID
const updateFileById = (req, res) => {
  upload.single("file")(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).send(err.message);
    } else if (err) {
      return res.status(500).send("An unknown error occurred.");
    }

    try {
      const { id } = req.params;

      // Find the file by ID
      const existingFile = await File.findById(id);

      if (!existingFile) {
        return res.status(404).send("File not found.");
      }

      // Construct the file path
      const filePath = path.join(
        __dirname,
        "../uploads",
        existingFile.filename
      );

      // Check if the file exists before attempting to delete it
      fs.access(filePath, fs.constants.F_OK, async (accessErr) => {
        if (accessErr) {
          // File does not exist, no need to delete
          console.warn("File not found for deletion:", filePath);
        } else {
          // File exists, attempt to delete
          try {
            await fs.promises.unlink(filePath);
            console.log("Old file deleted:", filePath);
          } catch (deleteError) {
            console.error("Error deleting old file:", deleteError);
          }
        }

        // Remove old file from the database
        await File.deleteOne({ _id: id });

        // Save the new file
        const fileData = new File({
          filename: req.file.filename,
          path: req.file.path,
          mimetype: req.file.mimetype,
          size: req.file.size,
        });

        await fileData.save();

        // Generate file URL
        const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${
          req.file.filename
        }`;

        // Send response
        res.json({
          message: "File updated successfully",
          file: req.file,
          url: fileUrl,
        });
      });
    } catch (error) {
      res.status(500).send("Error updating the file.");
    }
  });
};

// Get a file by ID
const getFileById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the file by ID in the database
    const file = await File.findById(id);

    if (!file) {
      return res.status(404).send("File not found.");
    }

    res.json(file);
  } catch (error) {
    res.status(500).send("Error retrieving the file by ID.");
  }
};

module.exports = { uploadNavIcons, updateFileById, getFileById, getFileAll };
