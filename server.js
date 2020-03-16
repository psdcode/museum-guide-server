'use strict'

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 8080

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const yelpSearch = require('./yelpSearch')

const app = express()

const corsOptions = {
  origin: 'https://psdcode.github.io',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))
app.use(helmet())

// Wake Heroku server up into ready state
app.get('/wakeup', function(req, res) {
  res.send()
})

// Handle search request to yelp api
app.get('/yelp-search', function(req, res) {
  const { term, lat, lng } = req.query

  yelpSearch(term, lat, lng)
    .then(function(result) {
      // Yelp api search successful
      res.send(result)
    })
    // Catch any errors in the yelp api request process
    .catch(function(err) {
      console.log(err)
      res.status(404).send()
    })
})

app.listen(PORT, HOST, function() {
  console.log(`CORS-enabled web server listening on port ${HOST}:${PORT}`)
})
