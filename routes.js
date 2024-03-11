const express = require("express")
const Movie = require("./Movie") // new
const router = express.Router()
const natural = require('natural');
const TfIdf = natural.TfIdf;
const tfidf = new TfIdf();
router.use(express.json())

// Get all posts
router.get("/all", async (req, res) => {
    Movie.find({}, '-_id')
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

    Movie.find(filterCriteria,'-_id')
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

    Movie.find(filterCriteria,'-_id')
        .then(items => {
            res.status(200).json(items);
        })
        .catch(err => {
            console.error(err); // Detailed error
            res.status(500).json({ message: 'Error fetching data', error: err });
        });
});

router.get("/releaseyear", async (req, res) => {

    const { startYear, endYear } = req.query;
    console.log(startYear,endYear)

    const filterCriteria = {
        release_year: {
            $gte: startYear, 
            $lte: endYear
        }
    };


    Movie.find(filterCriteria,'-_id')
        .then(items => {
            res.status(200).json(items);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Error fetching data', error: err });
        });
});

const stopWords = new Set([
    "i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your", "yours",
    "yourself", "yourselves", "he", "him", "his", "himself", "she", "her", "hers",
    "herself", "it", "its", "itself", "they", "them", "their", "theirs", "themselves",
    "what", "which", "who", "whom", "this", "that", "these", "those", "am", "is", "are",
    "was", "were", "be", "been", "being", "have", "has", "had", "having", "do", "does",
    "did", "doing", "a", "an", "the", "and", "but", "if", "or", "because", "as", "until",
    "while", "of", "at", "by", "for", "with", "about", "against", "between", "into",
    "through", "during", "before", "after", "above", "below", "to", "from", "up", "down",
    "in", "out", "on", "off", "over", "under", "again", "further", "then", "once", "here",
    "there", "when", "where", "why", "how", "all", "any", "both", "each", "few", "more",
    "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "so",
    "than", "too", "very", "s", "t", "can", "will", "just", "don", "should", "now"
]);

function removeStopWords(text) {
    return text.split(' ')
               .filter(word => !stopWords.has(word.toLowerCase()))
               .join(' ');
}


router.post('/search', async (req, res) => {
    
    const searchQuery = req.body.key || '';

    try {
        // Fetch all movie descriptions
        const movies = await Movie.find({}, 'description title type show_id date_added release_year rating -_id').lean();

        // Add each movie description to the TF-IDF instance
        movies.forEach(movie => {
            tfidf.addDocument(movie.description);
        });

        // Find the similarity of each document to the search query
        const similarities = [];
        tfidf.tfidfs(searchQuery, (i, measure) => {
            if (movies[i]) {  // Check if the movie exists at index i
                similarities.push({
                    title: movies[i].title,
                    type: movies[i].type,
                    show_id: movies[i].show_id,
                    date_added: movies[i].date_added,
                    release_year: movies[i].release_year,
                    rating: movies[i].rating,
                    similarity: measure
                });
            }
        });

        // Sort the results by similarity in descending order
        similarities.sort((a, b) => b.similarity - a.similarity);

        // Respond with the sorted list of movies based on their similarity score
        res.status(200).json(similarities);
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ message: 'Error processing your search', error: error.message });
    }
});

module.exports = router 