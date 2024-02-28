const express = require('express');
const mongoose = require('mongoose');
const Item = require('./itemModel');

const app = express();
const port = process.env.PORT || 3008;

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB connection string
const dbURI = 'mongodb+srv://Root:Root@cluster-movies.cdga3ux.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-Movies';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(port, () => console.log(`Server running on port ${port}`)))
  .catch((err) => console.log(err));

// Fetch all items
app.get('/items', (req, res) => {
  Item.find()
    .then((items) => {
      res.status(200).json(items);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Error fetching data' });
    });
});
// More routes and models here...