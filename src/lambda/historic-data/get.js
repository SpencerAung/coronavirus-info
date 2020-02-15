const dynamoDb = require('../dynamodb')

module.exports.get = async (event, context) => {
  try {
    const { queryStringParameters: qs } = event
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      FilterExpression: 'createdDate = :this_date',
      ExpressionAttributeValues: {
        ':this_date': qs.date || ''
      }
    }

    const data = await dynamoDb.scan(params).promise()

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({ data, status: 'success' })
    }
  } catch (e) {
    console.error(e)

    return {
      statusCode: e.statusCode || 501,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({ error: 'error' })
    }
  }
}
