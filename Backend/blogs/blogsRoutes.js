const express = require('express');
const router = express.Router();
const blogsController = require('./blogsController');
const upload = require('../modules/fileModule');

// Route to create a new blog post
router.post('/create-blog', blogsController.uploadFiles, blogsController.createBlog);


// Route to get all blogs
router.get('/blogs', blogsController.getAllBlogs);

// Route to get a blog by ID
router.get('/blogs/:id', blogsController.getBlogById);

// Route to update a blog by ID
router.put('/blogs/:id', upload.single('image'), blogsController.updateBlogById);

// Route to delete a blog by ID
router.delete('/blogs/:id', blogsController.deleteBlogById);


module.exports = router;
