const { getRandomTweet } = require('../services/ronswansonApi');

module.exports = (req, res, next) => {
  getRandomTweet(1)
    .then(quote => {
      req.quote = quote(0);
      next();
    });
};
