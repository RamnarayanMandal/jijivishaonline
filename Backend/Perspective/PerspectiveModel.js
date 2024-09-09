const mongoose = require('mongoose');

const perspectiveSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    description2: {
        type: String,
        required: true
    },
    description3: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
   
},
{timestamps: true}

)

const PerspectiveSchema = mongoose.model('Perspective',perspectiveSchema);
module.exports = PerspectiveSchema


