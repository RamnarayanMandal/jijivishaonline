const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    banner1: {
      type: String,
      required: true,
    },
    banner2: {
      type: String,
      required: true,
    },
    banner3: {
      type: String,
      required: true,
    },
    banner4: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Banner = mongoose.model("Banner", bannerSchema);
module.exports = Banner;
