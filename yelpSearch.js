const yelp = require('yelp-fusion');

const yelpApiKey = `n9BZFWy_zC3jyQyNV9u0Tdc6IhfkwyV8b4JBg2NYD9AaQuHaUx6II9\
ukiEQp2Z03m7Cmycz29Lu2n4Gc5LPu1wDjVVCGyignkEoZn167yyq07sbPEN7gF5GzE20YWnYx`;
const client = yelp.client(yelpApiKey);

const yelpHoursLookup = function (yelpData) {
  return client.business(yelpData.id)
    .then(response => response.jsonBody)
    .then(function (responseJSON) {
      if (responseJSON.hours && responseJSON.hours[0] &&
        responseJSON.hours[0].hasOwnProperty('is_open_now')) {
        // 'is_open_now' property is present in response object
        const yelpDataAndHours = Object.assign(yelpData, {is_open_now: responseJSON.hours[0].is_open_now});
        return yelpDataAndHours;
      } else {
        // no 'hours' info present, so return yelpData unmodified
        return yelpData;
      }
    });
};

const yelpSearch = function (term, latitude, longitude) {
  return client.search({
    term,
    latitude,
    longitude
  })
    .then(response => response.jsonBody)
    .then(function (responseJSON) {
      if (responseJSON.businesses[0] !== undefined) {
        return yelpHoursLookup(responseJSON.businesses[0]);
      } else {
        return undefined; // responseJSON.businesses[0] === undefined
      }
    });
};

module.exports = yelpSearch;
