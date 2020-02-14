const dynamoDb = require('./dynamodb')

module.exports.get = async (event, context) => {
  try {
    const { queryStringParameters: qs } = event
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      FilterExpression: 'createdDate = :this_date',
      ExpressionAttributeValues: { ':this_date': qs.date },
      Limit: 1,
      ScanIndexForward: false
    }

    const data = await dynamoDb.query(params).promise()

    return {
      statusCode: 200,
      body: JSON.stringify({ data, status: 'success' })
    }
  } catch (e) {
    console.error(e)

    return {
      statusCode: e.statusCode || 501,
      body: JSON.stringify({ error: 'error' })
    }
  }
}
