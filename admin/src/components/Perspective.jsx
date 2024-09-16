import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';

const Perspective = () => {
    const URI = import.meta.env.VITE_API_URL;
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false); // For modal
  const [selectedBlog, setSelectedBlog] = useState(null); // To store the selected blog
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    description2: '',
    description3: '',
    image: null,
  });


  const fetchData = async () => {
    try {
      const response = await axios.get(`${URI}api/perspective/get-Perspective`);
      setBlogs(response.data.blogs); // Set the blogs data
    } catch (err) {
      setError('Failed to fetch data');
    }
  };

  useEffect(() => {
   

    fetchData();
  }, []);

  const handleOpen = (blog) => {
    setSelectedBlog(blog);
    setFormData({
      title: blog.title,
      description: blog.description,
      description2: blog.description2,
      description3: blog.description3,
      image: null, // Image will be updated separately
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBlog(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleUpdate = async () => {
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('description2', formData.description2);
    data.append('description3', formData.description3);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      await axios.put(`${URI}api/perspective/update-Perspective/${selectedBlog._id}`, data);
      // Update UI after successful update
      const updatedBlogs = blogs.map((blog) =>
        blog._id === selectedBlog._id ? { ...blog, ...formData, image: blog.image } : blog
      );
      setBlogs(updatedBlogs);
      fetchData()
      handleClose();
    } catch (err) {
      console.error('Failed to update blog', err);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      {blogs.map((blog) => (
        <BlogCard key={blog._id}>
          <ContentWrapper>
            <TextWrapper>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                {blog.title}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: '8px' }}>
                {blog.description}
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: '8px' }}>
                {blog.description2}
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: '8px' }}>
                {blog.description3}
              </Typography>
              <Button variant="contained" color="primary" onClick={() => handleOpen(blog)}>
                Edit
              </Button>
            </TextWrapper>
            <ImageWrapper>
              <img
                src={`${URI}${blog.image}`}
                alt={blog.title}
                style={{ width: '100%', maxWidth: '400px', borderRadius: '8px' }}
              />
            </ImageWrapper>
          </ContentWrapper>
        </BlogCard>
      ))}

      {/* Modal for editing */}
      <Modal open={open} onClose={handleClose}>
        <StyledModal>
          <Typography variant="h6" component="h2" sx={{ marginBottom: '16px' }}>
            Edit Blog
          </Typography>
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={3}
          />
          <TextField
            label="Description 2"
            name="description2"
            value={formData.description2}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={3}
          />
          <TextField
            label="Description 3"
            name="description3"
            value={formData.description3}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={3}
          />
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ marginTop: '16px', marginBottom: '16px' }}
          >
            Upload Image
            <input type="file" hidden onChange={handleImageChange} />
          </Button>
          <Button variant="contained" color="primary" onClick={handleUpdate} fullWidth>
            Update
          </Button>
        </StyledModal>
      </Modal>
    </Container>
  );
};

// Styled components using Material-UI's styled API
const Container = styled('div')({
    margin: '10px 10px 10px 20px',
  padding: '16px',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '16px',
});

const BlogCard = styled('div')({
  padding: '16px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
  transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
  },
});

const ContentWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '16px',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
  },
});

const TextWrapper = styled('div')({
  flex: 1,
});

const ImageWrapper = styled('div')({
  flexShrink: 0,
  maxWidth: '400px',
  img: {
    width: '100%',
    borderRadius: '8px',
  },
});

const StyledModal = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: '600px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: 24,
  padding: '24px',
  outline: 'none',
  [theme.breakpoints.down('sm')]: {
    width: '95%',
  },
}));

export default Perspective;
