require('dotenv').config()

module.exports = {
  env: {
    AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY,
    API_ENDPOINT: process.env.API_ENDPOINT,
    NEWS_API_ENDPOINT: process.env.NEWS_API_ENDPOINT,
    NEWS_API_KEY: process.env.NEWS_API_KEY
  }
}
