const Blogs = require('./blogsModel');
const upload = require('../modules/fileModule');

// Middleware to handle file upload
exports.uploadFiles = upload.single('image'); // Using single file upload for the image field

// Controller to create a blog with a featured image
exports.createBlog = async (req, res) => {
  try {
    const { title, description, author } = req.body;

    // Check if an image file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    // Save the file path to the database
    const imagePath = req.file.path;

    // Create a new blog post
    const newBlog = new Blogs({
      title,
      description,
      author,
      image: imagePath,
    });

    // Save the blog post to the database
    await newBlog.save();

    res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ message: 'Error creating blog', error });
  }
};





// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.find();
    res.status(200).json({ message: 'Blogs retrieved successfully', blogs });
  } catch (error) {
    console.error('Error retrieving blogs:', error);
    res.status(500).json({ message: 'Error retrieving blogs', error });
  }
};

// Get blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blogs.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json({ message: 'Blog retrieved successfully', blog });
  } catch (error) {
    console.error('Error retrieving blog:', error);
    res.status(500).json({ message: 'Error retrieving blog', error });
  }
};

// Update blog by ID
exports.updateBlogById = async (req, res) => {
  try {
    const { title, description, author } = req.body;
    const updatedData = { title, description, author };

    if (req.file) {
      updatedData.image = req.file.path; // Update image if a new one is uploaded
    }

    const blog = await Blogs.findByIdAndUpdate(req.params.id, updatedData, { new: true });

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
    const blog = await Blogs.findByIdAndDelete(req.params.id);

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
