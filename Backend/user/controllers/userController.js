const User = require("../models/User");
const bcrypt = require("bcrypt");
const transporter = require("../mailer"); // Your configured nodemailer transporter
const { generateUserId, generatePassword } = require("../utils/otp"); // Utility functions for generating user ID and password

const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send("Email is required.");
  }

  try {
    let user = await User.findOne({ email });

    if (user) {
      if (!user.isVerified) {
        // If user exists but is not verified, resend a simple notification
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: user.email,
          subject: "Account Verification Reminder",
          text: "Your account is not yet verified. Please check your email for the OTP to complete the verification.",
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
            return res.status(500).send("Error sending email.");
          }
          return res
            .status(200)
            .send("Verification reminder sent to your email.");
        });
      } else {
        return res.status(400).send("User already exists and is verified.");
      }
    } else {
      // Generate a 6-digit password and a custom user ID
      const password = generatePassword();
      const hashedPassword = await bcrypt.hash(password, 10);
      const customUserId = generateUserId();

      // Create a new user
      user = new User({
        email,
        password: hashedPassword,
        customUserId,
      });

      await user.save();

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Account Registration Details",
        text: `Your account has been created successfully.\nUser ID: ${customUserId}\nPassword: ${password}\n\nPlease keep this information safe.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          return res.status(500).send("Error sending email.");
        }
        res
          .status(200)
          .send("Account registration details sent to your email.");
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
};

exports.login = async (req, res) => {
  const { userId, email, password } = req.body;

  if (!password) {
    return res.status(400).send("Password is required.");
  }

  try {
    // Find user by customUserId or email
    const user = await User.findOne({
      $or: [{ customUserId: userId }, { email }],
    });

    if (!user) {
      return res.status(400).send("Invalid userId/email or password.");
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send("Invalid userId/email or password.");
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .json({ message: "Login successful", token, userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
};

exports.getUserDetails = async (req, res) => {
  const userId = req.params.userId; // Correctly extract userId
  try {
    // Find the user and exclude password, address, and cart
    const newUser = await User.findById(userId).select(
      "-password -addresses -cart"
    );

    if (!newUser) {
      return res.status(404).json({ message: "User not found" }); // 404 for not found
    }

    return res.status(200).json({
      message: "User fetched successfully",
      userDetails: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while fetching user details",
      error,
    });
  }
};

// Add a new item to the cart
exports.addItemToCart = async (req, res) => {
  const {
    userId,
    productId,
    productName,
    quantity,
    price,
    attributes,
    discount,
    Image,
  } = req.body;

  console.log(productId, productName, quantity, price, attributes, Image);

  try {
    // Find the user by userId
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the product already exists in the cart
    const existingItemIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingItemIndex !== -1) {
      // If product exists, update quantity and price
      user.cart[existingItemIndex].quantity += quantity;
      user.cart[existingItemIndex].price += price;
    } else {
      // If product does not exist, add new item to cart
      user.cart.push({
        userId,
        productId,
        productName,
        quantity,
        price,
        attributes,
        discount,
        thumbnail: Image,
      });
    }

    // Calculate total price
    user.totalPrice = user.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // Save the updated user document
    user = await user.save();

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error adding item to cart", error });
  }
};

// Remove an item from the cart
exports.removeItemFromCart = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    // Find the user by userId and update cart by removing the item
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { cart: { productId } } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Recalculate total price after removing item
    user.totalPrice = user.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // Save the updated user document
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error removing item from cart", error });
  }
};

exports.AddProductQuantity = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    // Find the user by userId
    let user = await User.findById(userId);

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    // Update the quantity of the specified product
    const productIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex !== -1) {
      user.cart[productIndex].quantity += 1; // Increase quantity by 1
    } else {
      console.log("Product not found in cart");
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Save the updated user document
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating product quantity:", error);
    res.status(500).json({ message: "Error updating product quantity", error });
  }
};

exports.subProductQuantity = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    // Find the user by userId
    let user = await User.findById(userId);

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    // Update the quantity of the specified product
    const productIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex !== -1) {
      // Decrease quantity by 1
      user.cart[productIndex].quantity -= 1;

      // Remove the item from cart if quantity is zero
      if (user.cart[productIndex].quantity === 0) {
        user.cart.splice(productIndex, 1);
      }
    } else {
      console.log("Product not found in cart");
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Save the updated user document
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating product quantity:", error);
    res.status(500).json({ message: "Error updating product quantity", error });
  }
};

// Get cart by user ID
exports.getCartByUserId = async (req, res) => {
  const { userId } = req.params; // Correct parameter name

  try {
    // Find the user by userId and populate the cart items with product details
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.cart);
    console.log(user.cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Error fetching cart", error });
  }
};

// Update an existing cart
exports.updateCart = async (req, res) => {
  const { userId, cartItems, promotionCode, totalPrice } = req.body;

  try {
    // Find the user by userId and update cart details
    const user = await User.findByIdAndUpdate(
      userId,
      { cart: cartItems, promotionCode, totalPrice },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Recalculate total price after updating cart items
    user.totalPrice = user.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // Save the updated user document
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error updating cart", error });
  }
};

// Delete a cart by user ID
exports.deleteCartByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user by userId and delete the cart
    const user = await User.findByIdAndUpdate(userId, {
      cart: [],
      totalPrice: 0,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting cart", error });
  }
};

exports.getTotalQuantity = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming userId is passed as a route parameter

    // Fetch the user from database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Calculate total quantity of products in the cart
    const totalQuantity = user.cart.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    res.json({ totalQuantity });
  } catch (error) {
    console.error("Error fetching user cart:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getTotalQuantity = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming userId is passed as a route parameter

    // Fetch the user from database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Calculate total quantity of products in the cart and include productId
    const productDetails = user.cart.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      productName: item.productName,
      price: item.price,
      attributes: item.attributes,
      discountPercentage: item.discountPercentage,
      promotionCode: item.promotionCode,

      thumbnail: item.thumbnail,
    }));

    const totalQuantity = user.cart.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    res.json({ totalQuantity, product: productDetails });
  } catch (error) {
    console.error("Error fetching user cart:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
