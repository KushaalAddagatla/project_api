const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  show_id: String,
  type: String,
  title: String,
  date_added: String,
  release_year: String,
  rating: String,
  duration: String,
  description:String
})

module.exports = mongoose.model('Movie', movieSchema);

