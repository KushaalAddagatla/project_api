const express = require("express")
const Movie = require("./Movie") // new
const router = express.Router()

// Get all posts
router.get("/all", async (req, res) => {
    Movie.find()
  .then(items => {
    res.status(200).json(items);
  })
  .catch(err => {
    console.error(err); // Detailed error
    res.status(500).json({ message: 'Error fetching data', error: err });
  });
})

router.get("/tvshows", async (req, res) => {
    const filterCriteria = { type: 'TV Show' }; // Example filter criteria

    Movie.find(filterCriteria)
        .then(items => {
            res.status(200).json(items);
        })
        .catch(err => {
            console.error(err); // Detailed error
            res.status(500).json({ message: 'Error fetching data', error: err });
        });
});

router.get("/movies", async (req, res) => {
    const filterCriteria = { type: 'Movie' }; // Example filter criteria

    Movie.find(filterCriteria)
        .then(items => {
            res.status(200).json(items);
        })
        .catch(err => {
            console.error(err); // Detailed error
            res.status(500).json({ message: 'Error fetching data', error: err });
        });
});

router.get("/releaseyear", async (req, res) => {
    // Extract startYear and endYear from query parameters
    const { startYear, endYear } = req.query;
    console.log(startYear,endYear)

    const filterCriteria = {
        release_year: {
            $gte: "${startYear}", // greater than or equal to startYear
            $lte: "${endYear}" // less than or equal to endYear
        }
    };

    Movie.find(filterCriteria)
        .then(items => {
            res.status(200).json(items);
        })
        .catch(err => {
            console.error(err); // Detailed error
            res.status(500).json({ message: 'Error fetching data', error: err });
        });
});

module.exports = router 