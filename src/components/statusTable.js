import styled from '@emotion/styled'

import Summary from './summary'
import useApiData from '../hooks/useApiData'
import { toLocaleString } from '../helpers'

const TableWrapper = styled.div`
  width: 450px;
  margin: 0 auto;

  @media (max-width: 420px) {
    width: 100%;
  }
`

const Table = styled.table`
  width: 100%;
  border: none;
  outline: none;
  border-collapse: collapse;

  th, td {
    padding: 8rem;
    border: 1px solid #d1d1e9;
    text-align: right;

    @media (max-width: 420px) {
      padding: 5rem;
    }
  }

  th:first-child,
  td:first-child {
    text-align: left;
  }

  th {
    background-color: #d1d1e9;
    font-weight: 200;
    font-size: 12rem;
  }

  td.zero-case {
    color: ${props => props.theme.colors.offWhite};
    font-weight: 200;
  }
`

const StatusTable = () => {
  const fetchedData = useApiData()
  const infectedCountries = fetchedData.length
  const { totalRecovered, totalConfirmed, totalDeaths, time } = fetchedData.reduce((acc, cur) => {
    acc.totalConfirmed = acc.totalConfirmed + cur.confirmed || cur.confirmed
    acc.totalDeaths = acc.totalDeaths + cur.deaths || cur.deaths
    acc.totalRecovered = acc.totalRecovered + cur.recovered || cur.recovered
    if (acc.time) {
      acc.time = acc.time > cur.lastUpdate ? acc.time : cur.lastUpdate
    } else {
      acc.time = cur.lastUpdate
    }

    return acc
  }, {})

  const lastUpdated = new Date(time)

  return (
    <div>
      <Summary numberOfCountries={infectedCountries} totalRecovered={totalRecovered} totalConfirmed={totalConfirmed} totalDeaths={totalDeaths} />
      <TableWrapper>
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
            {fetchedData
              .map(({ country, confirmed, recovered, deaths }) => (
                <tr key={country}>
                  <td>{country}</td>
                  <td className={!confirmed && 'zero-case'}>{toLocaleString(confirmed)}</td>
                  <td className={!recovered && 'zero-case'}>{toLocaleString(recovered)}</td>
                  <td className={!deaths && 'zero-case'}>{toLocaleString(deaths)}</td>
                </tr>
              ))}
          </tbody>
        </Table>
        <p>
          <small>
        Data source: <a href='https://docs.google.com/spreadsheets/d/1yZv9w9zRKwrGTaR-YzmAqMefw4wMlaXocejdxZaTs6w/htmlview?usp=sharing&sle=true#' target='_blank' rel='noreferrer nofollow noopener'>Novel Coronavirus (2019-nCoV) Cases, provided by JHU CSSE</a>
          </small>
        </p>
      </TableWrapper>
    </div>
  )
}

export default StatusTable
