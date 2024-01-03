const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("e2fb96faea3a425cbc6af72aa592acea");

// adding the new api for the student
const newApi = async (req, res, next) => {
  try {
    newsapi.v2
      .sources({
        category: "technology",
        domains: "bbc.co.uk, techcrunch.com ,splunk.com, azure.microsoft.com",
        language: "en",
        country: "us",
      })
      .then((response) => {
        // console.log(response);
        res.status(200).json({
            response:response,
            message:"successfull"
        })
      });
  } catch (err) {}
};

module.exports = {
    newApi
};
