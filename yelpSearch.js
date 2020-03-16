const yelp = require('yelp-fusion')

const yelpApiKey = process.env.YELP_API_KEY

const client = yelp.client(yelpApiKey)

const yelpHoursLookup = function(yelpData) {
  return client
    .business(yelpData.id)
    .then(res => res.jsonBody)
    .then(({ hours }) => {
      if (hours && hours[0] && hours[0].hasOwnProperty('is_open_now')) {
        return {
          ...yelpData,
          is_open_now: hours[0].is_open_now,
        }
      }
      // no 'hours' info present, so return yelpData unmodified
      else return yelpData
    })
}

const yelpSearch = function(term, latitude, longitude) {
  return client
    .search({
      term,
      latitude,
      longitude,
    })
    .then(response => response.jsonBody)
    .then(({ businesses }) => {
      // Check if search result exists
      if (businesses[0] !== undefined) return yelpHoursLookup(businesses[0])
      // Otherwise send back empty object
      else return {} // businesses[0] === undefined
    })
}

module.exports = yelpSearch
