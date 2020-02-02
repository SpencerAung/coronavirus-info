const Airtable = require('airtable')
Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_API_KEY
})

const base = Airtable.base('appbPNf9mGxdVDQko')

const fetchMyanmarNews = () => {
  return new Promise((resolve, reject) => {
    base('MyanmarNews').select({
      view: 'Grid view',
      sort: [{ field: 'date', direction: 'desc' }]
    }).firstPage(function (err, records) {
      if (err) {
        reject(err)
      }
      resolve(records)
    })
  })
}

const getFields = fetchedNews => fetchedNews.map(news => ({ ...news.fields }))

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const news = await fetchMyanmarNews()

      res.send(getFields(news))
    } catch (e) {
      res.send({ error: e })
    }
  } else {
    res.send(`${req.method} route does not exist`)
  }
}
