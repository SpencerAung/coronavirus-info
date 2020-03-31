const fetch = require('node-fetch')

const getFields = fetchedStatuses => fetchedStatuses.map(status => ({ ...status.fields }))

// https://codepen.io/airtable/full/rLKkYB
const URL = 'https://api.airtable.com/v0/appYR4mmID6oPVAlx/PatientPath?sort%5B0%5D%5Bfield%5D=patientId&sort%5B0%5D%5Bdirection%5D=desc'
const OPTIONS = {
  headers: {
    Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`
  }
}

export default async (req, res) => {
  if (req.method === 'GET') {
    const { offset = null, pageSize = 10 } = req.query

    try {
      const urlWithOffset = offset ? `${URL}&offset=${offset}&pageSize=${pageSize}` : `${URL}&pageSize=${pageSize}`
      const fetched = await fetch(urlWithOffset, OPTIONS)
      const statuses = await fetched.json()

      res.send({ records: getFields(statuses.records), offset: statuses.offset })
    } catch (e) {
      console.error(e)
      res.send({ error: e, records: [] })
    }
  } else {
    res.send(`${req.method} route does not exist`)
  }
}
