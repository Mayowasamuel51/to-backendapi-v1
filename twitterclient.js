const { TwitterApi } = require("twitter-api-v2");
const dotenv = require("dotenv");
const Twit = require("twit");
const { default: axios } = require("axios");
// const fetch = require('node-fetch');

const client = new TwitterApi({
  appKey: process.env.API_KEY,
  appSecret: process.env.API_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_SECRET,
  clientId: process.env.TWITTER_CLIENT_ID,
  clientSecret: process.env.TWITTER_CLIENT_SECRET,
});

// const client = new Twit ({
//   consumer_key: process.env.API_KEY,
//   consumer_secret: process.env.API_SECRET,
//   access_token: process.env.ACCESS_TOKEN,
//   access_token_secret: process.env.ACCESS_SECRET,
//   timeout_ms:60 * 1000,
//   strictSSL:true,

// });
const bearer = new TwitterApi(process.env.BEARER_TOKEN);

const twitterClient = client.readWrite;
const twitterBearer = bearer.readOnly;
const twitterNews = client.readOnly;


let searchTerm = "tech";
const url = `https://api.twitter.com/2/tweets/search/recent?query=${searchTerm}`;

const fetchTechNews = async () => {
  try {
    // https://api.twitter.com/2/tweets/search/recent?query=${encodeURIComponent(searchTerm)}
    // https://api.twitter.com/2/tweets/search/all?query=from:twitterdev'
    // https://twitter.com/hashtag/SplunkNews?src=hashtag_click
    const fetch = await axios.get(
      `https://twitter.com/TwitterDev`,

      {
        headers: {
          Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (fetch.status === 201 || fetch.status === 200) {
      console.log(fetch.data.data);
    }
  } catch (err) {
    console.log(err);
  }
};
// fetchTechNews();

module.exports = {
  twitterClient,
  twitterNews,
  twitterBearer,
};
