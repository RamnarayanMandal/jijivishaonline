const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const cors = require("cors");
const userRoutes = require("./user/routes/userRoutes");
const adminRoutes = require("./admin/routes/adminRoutes");


const path = require("path");

connectDB();
const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get("/", (req, res) => {
  res.send("API is running successfully");
});


app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
