const mongoose = require('mongoose');

const blogsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
      
    }
},
{timestamps: true}

)

const blogSchema = mongoose.model('Blogs',blogsSchema);
module.exports = blogSchema


