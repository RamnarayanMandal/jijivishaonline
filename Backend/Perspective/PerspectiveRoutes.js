const express = require('express');
const router = express.Router();
const PerspectiveController = require('./PerspectiveController');
const upload = require('../modules/fileModule');

// Route to create a new perspective post
router.post('/create-Perspective', upload.single('image'), PerspectiveController.createPerspective);

router.get('/get-Perspective' ,PerspectiveController.getAllPerspective);

router.put('/update-Perspective/:id', upload.single('image'), PerspectiveController.updatePerspectiveById);

module.exports = router;
