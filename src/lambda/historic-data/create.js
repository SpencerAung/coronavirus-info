const uuid = require('uuid')
const dynamoDb = require('../dynamodb')
const fetchData = require('../api')
const { getDateString } = require('../helpers')

module.exports.create = async (event, context) => {
  try {
    const today = new Date()
    const timestamp = today.getTime()
    const createdDate = getDateString(today)

    const fetchedData = await fetchData()

    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Item: {
        id: uuid.v1(),
        data: fetchedData,
        createdAt: timestamp,
        createdDate
      }
    }

    // write the todo to the database
    const data = await dynamoDb.put(params).promise()
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({ data, status: 'success' })
    }

    return response
  } catch (e) {
    console.log(e)

    return {
      statusCode: e.statusCode || 501,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: 'Could\'t create the historic data item.'
    }
  }
}
