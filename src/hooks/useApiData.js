import { useState, useEffect } from 'react'
import fetch from 'node-fetch'

export default function useApiData () {
  const api = 'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/2/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Confirmed%20desc%2CCountry_Region%20asc&resultOffset=0&resultRecordCount=100&cacheHint=true'
  const [data, updateData] = useState([])

  useEffect(() => {
    async function fetchData () {
      const fetched = await fetch(api)
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
    }
    fetchData()
  }, [])

  return data
}
