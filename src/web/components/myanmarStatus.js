import styled from '@emotion/styled'
import PropTypes from 'prop-types'

import { toLocaleString } from '../helpers'
import { Wrapper, NoteWrapper } from './summary.style'
import Spinner from './spinner'

const StyledTable = styled.table`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  border-collapse: collapse;
  border: none;
  outline: none;

  td,
  th {
    padding: 8rem;
    text-align: center;
    vertical-align: top;
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
    color: ${(props) => props.theme.colors.black};
  }

  .info {
    color: ${(props) => props.theme.colors.black};
  }

  .danger {
    color: ${(props) => props.theme.colors.red};
  }

  .highlight {
    color: ${(props) => props.theme.colors.green};
  }

  span,
  small {
    display: block;
  }

  small {
    font-size: 20rem;
    font-weight: 200;
  }
`

const MyanmarStatus = ({ fetchedData }) => {
  if (!fetchedData) {
    return <Spinner />
  }

  const data = fetchedData.filter(({ country }) => country === 'Burma')[0]

  if (!data) {
    return <Spinner />
  }

  const lastUpdated = new Date(data.lastUpdate).toUTCString()

  return (
    <Wrapper style={{ marginBottom: '80rem' }}>
      <h1 style={{ textAlign: 'center' }}>
        <span className='mm-font'>မြန်မာ</span> Status
      </h1>
      <StyledTable>
        <tbody>
          <tr>
            <th className='mm-font'>ပိုးတွေ့လူနာ</th>
            <th className='mm-font'>ပိုးတွေ့ပြန်လည်သက်သာ</th>
            <th className='mm-font'>ပိုးတွေ့သေဆုံးလူနာ</th>
          </tr>
          <tr>
            <td className='danger'>
              <span>{toLocaleString(data.confirmed)}</span>
              {data.changeInConfirmed > 0 && (
                <small>+({toLocaleString(data.changeInConfirmed)})</small>
              )}
            </td>
            <td className='highlight'>
              <span>{toLocaleString(data.recovered)}</span>
              {data.changeInRecovered > 0 && (
                <small>+({toLocaleString(data.changeInRecovered)})</small>
              )}
            </td>
            <td className='danger'>
              <span>{toLocaleString(data.deaths)}</span>
              {data.changeInDeaths > 0 && (
                <small>+({toLocaleString(data.changeInDeaths)})</small>
              )}
            </td>
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
            <a
              href='https://doph.maps.arcgis.com/apps/opsdashboard/index.html#/f8fb4ccc3d2d42c7ab0590dbb3fc26b8'
              target='_blank'
              rel='nofollow noopener noreferrer'
            >
              Coronavirus Disease 2019 (COVID-19) Surveillance Dashboard
              (Myanmar)
            </a>
            {', '}
            <a
              href='https://www.facebook.com/MinistryOfHealthAndSportsMyanmar/'
              target='_blank'
              rel='nofollow noopener noreferrer'
            >
              Ministry of Health and Sports, Myanmar
            </a>
          </small>
        </p>
      </NoteWrapper>
    </Wrapper>
  )
}

MyanmarStatus.propTypes = {
  fetchedData: PropTypes.arrayOf(PropTypes.shape())
}

MyanmarStatus.defaultProps = {
  fetchedData: []
}

export default MyanmarStatus
