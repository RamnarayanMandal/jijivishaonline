const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register", userController.register);

router.post("/login", userController.login);

// // Route to request OTP for password reset
// router.post("/forgot-password", userController.requestOtpForReset);

// // Route to reset the password using OTP
// router.post("/reset-password", userController.resetPassword);


router.post('/', userController.addItemToCart);

router.get('/getUser/:userId', userController.getUserDetails)

// Get cart by user ID
router.get('/:userId', userController.getCartByUserId);

// Update an existing cart
router.put('/', userController.updateCart);

// Delete a cart by user ID
router.delete('/:userId', userController.deleteCartByUserId);

router.post('/:userId/:productId', userController.removeItemFromCart)

router.put('/addProductQuantityByOne', userController.AddProductQuantity)

router.put('/subProductQuantityByOne', userController.subProductQuantity)

router.get('/totalProductQuantity/:userId', userController.getTotalQuantity)

module.exports = router;
