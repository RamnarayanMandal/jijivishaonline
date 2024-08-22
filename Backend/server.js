const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const cors = require("cors");
const userRoutes = require("./user/routes/userRoutes");
const productRoutes = require("./user/routes/productRoutes");

const addToCartRoutes = require("./user/routes/addToCartRoutes");
const userAddress = require("./user/routes/addressRoutes");
const productOrderRoutes = require("./user/routes/productOrder");


const admin = require("./admin/routes/userRoutes");

const order = require("./admin/routes/orderRouters");

const banner = require("./admin/routes/bannerRouters");
const path = require("path");

connectDB();
const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get("/", (req, res) => {
  res.send("API is running successfully");
});
// Routes
app.use("/api/users", userAddress);

app.use("/api/user", userRoutes);

// Use the product routes
app.use("/api", productRoutes);

// // Use the cart routes
app.use("/api/cart", addToCartRoutes);

app.use("/api/products", productOrderRoutes);



//admin

app.use("/api/admin", admin);
app.use("/api/admin", order);
app.use("/api/admin",banner);





const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
