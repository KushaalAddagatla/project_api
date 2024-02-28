const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  show_id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  director: String,
  country: String,
  date_added: String, // Consider using Date type if you want to manipulate dates
  release_year: {
    type: String,
    required: true
  },
  rating: String,
  duration: String,
  listed_in: String,
  description: String
}, { timestamps: true }); // Optionally add timestamps for createdAt and updatedAt

module.exports = mongoose.model('Item', itemSchema);