'use strict';

const PORT = process.env.PORT || 8080;

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
app.get('/yelp-search', function (req, res, next) {
  yelpSearch(req.query.term, req.query.lat, req.query.lng)
    .then(function (result) {
      res.status(200).send(result);
    })
    .catch(function (err) {
      console.log(err);
      res.status(400).send('failed!');
    });
});

// app.get('/baf', function (req, res, next) {
//   res.status(200).send('RESET');
// });

app.listen(PORT, function () {
  console.log(`'CORS-enabled web server listening on port ${PORT}`);
});
