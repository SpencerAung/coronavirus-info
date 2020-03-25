import styled from '@emotion/styled'

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
      <h1 style={{ textAlign: 'center' }} className='mm-font'>မြန်မာ Status</h1>
      <StyledTable>
        <tbody>
          <tr>
            <th className='mm-font'>စောင့်ကြည့်လူနာ</th>
            <th className='mm-font'>သံသယလူနာ</th>
            <th className='mm-font'>စောင့်ကြည့်/သံသယလူနာစုစုပေါင်း</th>
          </tr>
          <tr>
            <td>{data.underInvestigation}</td>
            <td>{data.suspected}</td>
            <td>{data.underInvestigation + data.suspected}</td>
          </tr>
          <tr>
            <th className='mm-font'>ပိုးတွေ့လူနာ</th>
            <th className='mm-font'>ပိုးမတွေ့လူနာ</th>
            <th className='mm-font'>ဓာတ်ခွဲအဖြေစောင့်ဆိုင်းဆဲ</th>
          </tr>
          <tr>
            <td className='danger'>{data.confirmed}</td>
            <td className='highlight'>{data.negative}</td>
            <td>{data.pending}</td>
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
