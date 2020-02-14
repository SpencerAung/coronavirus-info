const Airtable = require('airtable')

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_API_KEY
})

const base = Airtable.base('appwCqMJOK5qf6l6l')

const fetchStatus = () => {
  return new Promise((resolve, reject) => {
    base('StatusByCountry').select({
      view: 'Grid view'
    }).firstPage(function (err, records) {
      if (err) {
        reject(err)
      }
      resolve(records)
    })
  })
}

const getFields = fetchedStatuses => fetchedStatuses.map(status => ({ ...status.fields }))

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const statuses = await fetchStatus()
      res.send(getFields(statuses))
    } catch (e) {
      console.error(e)
      res.send({ error: e })
    }
  } else {
    res.send(`${req.method} route does not exist`)
  }
}
