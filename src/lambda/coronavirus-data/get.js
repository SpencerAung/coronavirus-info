const dynamoDb = require('../dynamodb')
const fetchData = require('../api')
const { getYesterdayDateString } = require('../helpers')

const getHistoricDataMap = async () => {
  const yesterdayDateString = getYesterdayDateString(new Date())
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    FilterExpression: 'createdDate = :this_date',
    ExpressionAttributeValues: {
      ':this_date': yesterdayDateString
    }
  }

  const { Items: items } = await dynamoDb.scan(params).promise()

  if (items.length) {
    const lastEntry = items[items.length - 1]

    return lastEntry.data.reduce((acc, value) => {
      acc[value.country] = {
        ...value
      }

      return acc
    }, {})
  }

  return {}
}

module.exports.get = async (event, context) => {
  try {
    const [fetchedData, historicDataMap] = await Promise.all([
      fetchData(),
      getHistoricDataMap()
    ])

    const parsedData = fetchedData
      .filter(item => item.confirmed > 0 && item.country !== 'Fench Guiana')
      .map((item) => {
        const previous = historicDataMap[item.country]
        let changeInConfirmed = item.confirmed
        let changeInRecovered = item.recovered
        let changeInDeaths = item.deaths
        let confirmedRate = 100

        if (previous) {
          changeInConfirmed = item.confirmed - previous.confirmed
          changeInRecovered = item.recovered - previous.recovered
          changeInDeaths = item.deaths - previous.deaths

          confirmedRate = ((item.confirmed - previous.confirmed) / previous.confirmed) * 100
        }

        return {
          ...item,
          previous,
          changeInConfirmed,
          changeInRecovered,
          changeInDeaths,
          confirmedRate
        }
      })

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({ data: parsedData, status: 'success' })
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
