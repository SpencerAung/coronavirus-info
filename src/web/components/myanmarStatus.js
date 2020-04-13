import styled from '@emotion/styled'

import { toLocaleString } from '../helpers'
import useApi from '../hooks/useApi'
import { Wrapper, NoteWrapper } from './summary.style'
import Spinner from './spinner'

const StyledTable = styled.table`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  border-collapse: collapse;
  border: none;
  outline: none;

  td, th {
    padding: 8rem;
    text-align: center;
  }

  th {
    font-size: 14rem;
    font-weight: 200;
    color: #72757e;
    min-width: 112px;
  }

  td {
    padding-bottom: 15rem;
    font-size: 35rem;
    color: ${props => props.theme.colors.black};
  }

  .info {
    color: ${props => props.theme.colors.black};
  }

  .danger {
    color: ${props => props.theme.colors.red};
  }

  .highlight {
    color: ${props => props.theme.colors.green};
  }

`

const MyanmarStatus = () => {
  const [data] = useApi('/api/myanmar-status', [])

  if (!data) {
    return <Spinner />
  }

  const lastUpdated = new Date(data.updatedAt).toUTCString()

  return (
    <Wrapper style={{ marginBottom: '80rem' }}>
      <h1 style={{ textAlign: 'center' }}><span className='mm-font'>မြန်မာ</span> Status</h1>
      <StyledTable>
        <tbody>
          <tr>
            <th className='mm-font'>စောင့်ကြည့်လူနာစုစုပေါင်း</th>
            <th className='mm-font' />
            <th className='mm-font'>ဓာတ်ခွဲစစ်ဆေးသူစုစုပေါင်း</th>
          </tr>
          <tr>
            <td>{toLocaleString(data.underInvestigation)}</td>
            <td className='highlight' />
            <td>{toLocaleString(data.totalTested)}</td>
          </tr>
          <tr>
            <th className='mm-font'>ပိုးတွေ့လူနာ</th>
            <th className='mm-font'>ပိုးတွေ့ပြန်လည်သက်သာ</th>
            <th className='mm-font'>ပိုးတွေ့သေဆုံးလူနာ</th>
          </tr>
          <tr>
            <td className='danger'>{toLocaleString(data.confirmed)}</td>
            <td className='highlight'>{toLocaleString(data.recovered)}</td>
            <td className='danger'>{toLocaleString(data.deaths)}</td>
          </tr>
        </tbody>
      </StyledTable>
      <NoteWrapper>
        <p>
          <small>
            <span>Updated on:</span>
            <span> {lastUpdated}</span>
          </small>
        </p>
        <p>
          <small>
            <span>Data source: </span>
            <a href='https://doph.maps.arcgis.com/apps/opsdashboard/index.html#/f8fb4ccc3d2d42c7ab0590dbb3fc26b8' target='_blank' rel='nofollow noopener noreferrer'>Coronavirus Disease 2019 (COVID-19) Surveillance Dashboard (Myanmar)</a>{', '}
            <a href='https://www.facebook.com/MinistryOfHealthAndSportsMyanmar/' target='_blank' rel='nofollow noopener noreferrer'>Ministry of Health and Sports, Myanmar</a>

          </small>
        </p>
      </NoteWrapper>
    </Wrapper>
  )
}

export default MyanmarStatus
