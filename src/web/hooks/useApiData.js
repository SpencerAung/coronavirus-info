import { useState, useEffect } from 'react'
import fetch from 'node-fetch'

export default function useApiData () {
  const [data, updateData] = useState([])

  useEffect(() => {
    async function fetchData () {
      try {
        const fetched = await fetch(process.env.JHU_API_ENDPOINT)
        const result = await fetched.json()

        const infectedCountries = result.features.map(({ attributes: country }) => {
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

        updateData(infectedCountries)
      } catch (e) {

      }
    }
    fetchData()
  }, [])

  return data
}
