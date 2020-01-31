import styled from '@emotion/styled'

import data from '../data'

const Table = styled.table`
  width: 100%;
  border: none;
  outline: none;
  border-collapse: collapse;

  th, td {
    padding: 8rem;
  }

  th {
    background-color: #d1d1e9;
  }

  td {
    border: 1px solid #d1d1e9;
  }
`

const StatusTable = () => {
  const infectedCountries = data.length
  const { totalInfected, totalDeaths } = data.reduce((acc, cur) => {
    acc.totalInfected = acc.totalInfected + cur.infected || cur.infected
    acc.totalDeaths = acc.totalDeaths + cur.deaths || cur.deaths

    return acc
  }, {})
  return (
    <div
      style={{
        width: '300px',
        margin: '0 auto'
      }}
    >
      <div>
        <p>Infected Countries: {infectedCountries}</p>
        <p>Total Infected: {totalInfected}</p>
        <p>Total Deaths: {totalDeaths}</p>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Country</th>
            <th>Infected</th>
            <th>Deaths</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ country, infected, deaths }) => (
            <tr key={country}>
              <td>{country}</td>
              <td style={{ textAlign: 'right' }}>{infected}</td>
              <td style={{ textAlign: 'right' }}>{deaths}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default StatusTable
