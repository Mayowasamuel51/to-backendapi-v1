const axios = require('axios');
const Twit = require('twit');

const NEWSAPI_API_KEY = "your_newsapi_key";
const TWITTER_CONSUMER_KEY = "your_twitter_consumer_key";
const TWITTER_CONSUMER_SECRET = "your_twitter_consumer_secret";
const TWITTER_ACCESS_TOKEN = "your_twitter_access_token";
const TWITTER_ACCESS_TOKEN_SECRET = "your_twitter_access_token_secret";

const T = new Twit({
  consumer_key: TWITTER_CONSUMER_KEY,
  consumer_secret: TWITTER_CONSUMER_SECRET,
  access_token: TWITTER_ACCESS_TOKEN,
  access_token_secret: TWITTER_ACCESS_TOKEN_SECRET,
});

async function fetchNews(number=10) {
  // Fetch tech news from NewsAPI
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${NEWSAPI_API_KEY}`;
  const response = await axios.get(url);
  const news_items = response.data.articles;
  const news = news_items.map(item => {
    return {
      title: item.title,
      description: item.description,
      url: item.url,
    };
  });
  return news.slice(0, number);
}

async function tweetNews() {
  const news = await fetchNews();
  const tweet = news.map(item => {
    return `${item.title}\n${item.description}\n${item.url}`;
  }).join('\n\n');
  T.post('statuses/update', { status: tweet }, function(err, data, response) {
    console.log(data);
  });
}

tweetNews();
