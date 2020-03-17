import styled from '@emotion/styled'
import { useState } from 'react'

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

  th:first-of-type,
  td:first-of-type {
    text-align: left;
  }

  th {
    background-color: #d1d1e9;
    font-weight: 200;
    font-size: 13rem;
  }

  td {
    vertical-align: top;
  }

  td.new-entry {
    background-color: ${props => props.theme.colors.washedWhite};
  }

  td.zero-case {
    color: ${props => props.theme.colors.offWhite};
    font-weight: 200;
  }

  span.change {
    font-size: 11rem;
  }

  span.danger {
    color: ${props => props.theme.colors.red};
  }

  span.highlight {
    color: ${props => props.theme.colors.green};
  }
`
const SearchInput = styled.input`
  width: 100%;
  margin-bottom: 10rem;
  padding: 8rem;
`

const renderDataRows = (data = []) => data.map(({
  country,
  confirmed,
  recovered,
  deaths,
  changeInConfirmed,
  changeInRecovered,
  changeInDeaths,
  previous
}) => {
  const confirmedTdClassName = confirmed ? '' : 'zero-case '
  const recoveredTdClassName = recovered ? '' : 'zero-case '
  const deathsTdClassName = deaths ? '' : 'zero-case '

  return (
    <tr key={country}>
      <td>{country} {!previous && <small><span className='danger'>new</span></small>}</td>
      <td className={confirmedTdClassName}>
        <span>{toLocaleString(confirmed)}</span>
        {changeInConfirmed > 0 && <><br /><span className='change danger'>+({changeInConfirmed})</span></>}
      </td>
      <td className={recoveredTdClassName}>
        <span>{toLocaleString(recovered)}</span>
        {changeInRecovered > 0 && <><br /><span className='change highlight'>+({changeInRecovered})</span></>}
      </td>
      <td className={deathsTdClassName}>
        <span>{toLocaleString(deaths)}</span>
        {changeInDeaths > 0 && <><br /><span className='change danger'>+({changeInDeaths})</span></>}
      </td>
    </tr>
  )
})

const StatusTable = () => {
  const fetchedData = useApiData()
  const [keyword, setKeyword] = useState('')
  const records = fetchedData.filter(record => record.country.toLowerCase().startsWith(keyword.toLowerCase()))

  return (
    <div>
      <Summary data={fetchedData} />
      {fetchedData.length > 0 && (
        <TableWrapper>
          <SearchInput type='text' onChange={e => setKeyword(e.target.value)} placeholder='Search country' />
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
              {renderDataRows(records)}
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
