const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  banner1: { type: String, required: false },
  banner2: { type: String, required: false },
  banner3: { type: String, required: false },
  banner4: { type: String, required: false }
});

module.exports = mongoose.model('Banner', bannerSchema);
