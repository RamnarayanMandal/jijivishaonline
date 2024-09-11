const mongoose = require("mongoose");
const navbarIconsSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("navbarIcons", navbarIconsSchema);
