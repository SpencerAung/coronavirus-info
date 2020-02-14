const fetch = require('node-fetch')
const uuid = require('uuid')
const dynamoDb = require('./dynamodb')

const fetchData = async () => {
  const fetched = await fetch(process.env.JHU_API_ENDPOINT)
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

module.exports.create = async (event, context) => {
  try {
    const timestamp = new Date().getTime()
    const fetchedData = await fetchData()

    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Item: {
        id: uuid.v1(),
        data: fetchedData,
        createdAt: timestamp
      }
    }

    // write the todo to the database
    const data = await dynamoDb.put(params).promise()
    const response = {
      statusCode: 200,
      body: JSON.stringify({ data, status: 'success' })
    }

    return response
  } catch (e) {
    console.log(e)

    return {
      statusCode: e.statusCode || 501,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Could\'t create the historic data item.'
    }
  }
}
