const express = require("express")
const Movie = require("./Movie") // new
const router = express.Router()

// Get all posts
router.get("/movies", async (req, res) => {
    Movie.find()
  .then(items => {
    res.status(200).json(items);
  })
  .catch(err => {
    console.error(err); // Detailed error
    res.status(500).json({ message: 'Error fetching data', error: err });
  });
})

module.exports = router 