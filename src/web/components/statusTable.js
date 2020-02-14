import styled from '@emotion/styled'

import Summary from './summary'
import useApiData from '../hooks/useApiData'
import useStatus from '../hooks/useStatus'
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
    font-size: 13rem;
  }

  td.zero-case {
    color: ${props => props.theme.colors.offWhite};
    font-weight: 200;
  }
`

const StatusTable = () => {
  const externalData = useApiData()
  const cachedData = useStatus()
  const fetchedData = externalData.length ? externalData : cachedData

  return (
    <div>
      <Summary data={fetchedData} />
      {fetchedData.length > 0 && (
        <TableWrapper>
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
        Data source: <a href='https://docs.google.com/spreadsheets/d/1wQVypefm946ch4XDp37uZ-wartW4V7ILdg-qYiDXUHM/htmlview?usp=sharing&sle=true' target='_blank' rel='noreferrer nofollow noopener'>Novel Coronavirus (2019-nCoV) Cases, provided by JHU CSSE</a>
            </small>
          </p>
        </TableWrapper>
      )}
    </div>
  )
}

export default StatusTable
