const request = require('superagent');

const getRandomTweet = () => {
  return request
    .get('https://ron-swanson-quotes.herokuapp.com/v2/quotes')
    .then(res => res.body);
};

module.exports = { getRandomTweet };
