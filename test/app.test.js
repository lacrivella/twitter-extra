require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Tweet = require('../lib/models/Tweet');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('post a new tweet', () => {
    return request(app)
      .post('/api/v1/tweets')
      .send({ 
        handle: '@fake',
        text: 'this is only a test'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          handle: '@fake',
          text: 'this is only a test',
          __v: 0
        });
      });
  });

  it('gets all tweets', async() => {
    const tweets = await Tweet.create([
      { handle: '@fake', text: 'fake fake fake' },
      { handle: '@robyn', text: 'I KEEP DANCIN ON MY OWN' },
      { handle: '@lizzo', text: 'Why men great until they try to be great?'}
    ]);
    return request(app)
      .get('/api/v1/tweets')
      .then(res => {
        const tweetsJSON = JSON.parse(JSON.stringify(tweets));
        tweetsJSON.forEach((tweet) => {
          expect(res.body).toContainEqual({ 
            _id: tweet._id,
            handle: tweet.handle,
            text: tweet.text,
            __v: 0
          });
        });
      });
  });

  it('gets tweet by id', async() => {
    const tweet = await Tweet.create({ handle: '@JonLovett', text: 'What a week' });
    return request(app)
      .get(`/api/v1/tweets/${tweet._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          handle: tweet.handle,
          text: tweet.text,
          __v: 0
        });
      });
  });
});
