import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import fetch from 'node-fetch'

import Summary from './summary'

const Table = styled.table`
  width: 100%;
  border: none;
  outline: none;
  border-collapse: collapse;

  th, td {
    padding: 8rem;

    @media (max-width: 420px) {
      padding: 5rem;
    }
  }

  th {
    background-color: #d1d1e9;
  }

  td {
    border: 1px solid #d1d1e9;

    &.number {
      text-align: right;
    }

    &.zero-case {
      color: #72757e;
      font-weight: 200;
    }
  }
`

function useApiData () {
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

const StatusTable = () => {
  const fetchedData = useApiData()
  const infectedCountries = fetchedData.length
  const { totalRecovered, totalConfirmed, totalDeaths, time } = fetchedData.reduce((acc, cur) => {
    acc.totalConfirmed = acc.totalConfirmed + cur.confirmed || cur.confirmed
    acc.totalDeaths = acc.totalDeaths + cur.deaths || cur.deaths
    acc.totalRecovered = acc.totalRecovered + cur.recovered || cur.recovered
    acc.time = cur.lastUpdate

    return acc
  }, {})

  const lastUpdated = new Date(time)

  return (
    <div style={{ width: '100%' }}>
      <Summary numberOfCountries={infectedCountries} totalRecovered={totalRecovered} totalConfirmed={totalConfirmed} totalDeaths={totalDeaths} />
      <p><small>Updated on: {lastUpdated.toString()}</small></p>
      <Table>
        <thead>
          <tr>
            <th>Country</th>
            <th>Confirmed</th>
            <th>Recovered</th>
            <th>Deaths</th>
          </tr>
        </thead>
        <tbody>
          {fetchedData.map(({ country, confirmed, recovered, deaths }) => (
            <tr key={country}>
              <td>{country}</td>
              <td className={`number ${!confirmed && 'zero-case'}`}>{confirmed}</td>
              <td className={`number ${!recovered && 'zero-case'}`}>{recovered}</td>
              <td className={`number ${!deaths && 'zero-case'}`}>{deaths}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <p>
        <small>
        Data source: <a href='https://docs.google.com/spreadsheets/d/1yZv9w9zRKwrGTaR-YzmAqMefw4wMlaXocejdxZaTs6w/htmlview?usp=sharing&sle=true#' target='blank' rel='noreferer nofollow noopener'>Novel Coronavirus (2019-nCoV) Cases, provided by JHU CSSE</a>
        </small>
      </p>
    </div>
  )
}

export default StatusTable
