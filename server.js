'use strict';

const PORT = process.env.PORT || 8080;

const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const yelpSearch = require('./yelpSearch');

const app = express();

const corsOptions = {
  origin: 'https://psdcode.github.io',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(helmet());

// Handle request for model data
app.get('/model', function (req, res, next) {
  const modelPath = path.join(__dirname, 'model/model.json');
  const modelStream = fs.createReadStream(modelPath);
  modelStream.pipe(res);
});

// Handle search request to yelp api
app.get('/yelp-search', function (req, res, next) {
  yelpSearch(req.query.term, req.query.lat, req.query.lng)
    .then(function (result) {
      // Yelp api search successful
      res.status(200).send(result);
    })
    // Catch any errors in the yelp api request process
    .catch(function (err) {
      console.log(err);
      res.status(404).send();
    });
});

app.listen(PORT, function () {
  console.log(`CORS-enabled web server listening on port ${PORT}`);
});
