'use strict';

const PORT = process.env.PORT || 8080;

const fs = require('fs');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const yelpSearch = require('./yelpSearch');

const app = express();

// var corsOptions = {
//   origin: 'https://psdcode.github.io',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

app.use(cors());
app.use(helmet());

app.get('/model', function (req, res, next) {
  // const model = fs.create;
});

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

// app.get('/baf', function (req, res, next) {
//   res.status(200).send('RESET');
// });

app.listen(PORT, function () {
  console.log(`CORS-enabled web server listening on port ${PORT}`);
});
