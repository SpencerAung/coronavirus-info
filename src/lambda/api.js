const fetch = require('node-fetch')

const fetchData = async () => {
  const fetched = await fetch(process.env.API_ENDPOINT)
  const result = await fetched.json()
  return parseData(result.features)
}

const parseData = (data = []) => data.map(({ attributes: country }) => {
  return {
    country: country.Country_Region,
    lastUpdate: country.Last_Update,
    lat: country.Lat,
    long: country.Long_,
    confirmed: country.Confirmed,
    deaths: country.Deaths || 0,
    recovered: country.Recovered || 0
  }
})

module.exports = fetchData
