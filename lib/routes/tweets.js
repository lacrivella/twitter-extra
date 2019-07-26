const { Router } = require('express');
const Tweet = require('../models/Tweet');
const getRandomTweet = require('../middleware/getRandomTweet');

module.exports = Router()
  .post('/', getRandomTweet, (req, res, next) => {
    const {
      handle,
      text
    } = req.body;

    const { random } = req.query;

    if(random) {
      Tweet
        .create(({ handle, text: req.quote }))
        .then(tweet => res.send(tweet))
        .catch(next);
    } else {
      Tweet
        .create(({ handle, text }))
        .then(tweet => res.send(tweet))
        .catch(next);
    }
  })
  .get('/', (req, res, next) => {
    Tweet
      .find()
      .then(tweets => res.send(tweets))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Tweet
      .findById(req.params.id)
      .then(tweet => res.send(tweet))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    Tweet
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(updatedTweet => res.send(updatedTweet))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Tweet
      .findByIdAndDelete(req.params.id)
      .then(tweet => res.send(tweet))
      .catch(next);
  });

