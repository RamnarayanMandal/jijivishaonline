const Perspective = require('./PerspectiveModel');
const upload = require('../modules/fileModule');

// Middleware to handle file upload
exports.uploadFiles = upload.single('image'); // Using single file upload for the image field

// Controller to create a blog with a featured image
exports.createPerspective = async (req, res) => {
  try {
    const { title, description, description2,description3 } = req.body;

    // Check if an image file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    // Delete the existing Perspective if it exists
    await Perspective.deleteMany({}); // This will delete all existing Perspective documents

    // Save the file path to the database
    const imagePath = req.file.path;

    // Create a new Perspective post
    const newPerspective = new Perspective({
      title,
      description,
      description2,description3,
      image: imagePath,
    });

    // Save the new Perspective post to the database
    await newPerspective.save();

    res.status(201).json({ message: 'Perspective created successfully', perspective: newPerspective });
  } catch (error) {
    console.error('Error creating Perspective:', error);
    res.status(500).json({ message: 'Error creating Perspective', error });
  }
};






// Get all blogs
exports.getAllPerspective = async (req, res) => {
  try {
    const blogs = await Perspective.find();
    res.status(200).json({ message: 'Blogs retrieved successfully', blogs });
  } catch (error) {
    console.error('Error retrieving blogs:', error);
    res.status(500).json({ message: 'Error retrieving blogs', error });
  }
};



// Update blog by ID
exports.updatePerspectiveById = async (req, res) => {
  try {
    const { title, description , description2,description3} = req.body;
    const updatedData = { title, description, description2,description3 };

    if (req.file) {
      updatedData.image = req.file.path; // Update image if a new one is uploaded
    }

    const blog = await Perspective.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({ message: 'Blog updated successfully', blog });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ message: 'Error updating blog', error });
  }
};

// Delete blog by ID
exports.deleteBlogById = async (req, res) => {
  try {
    const blog = await Perspective.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Optionally, delete the image file from the server
    if (blog.image) {
      const fs = require('fs');
      fs.unlink(blog.image, (err) => {
        if (err) console.error('Error deleting image file:', err);
      });
    }

    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ message: 'Error deleting blog', error });
  }
};
