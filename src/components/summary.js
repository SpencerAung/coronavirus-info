import styled from '@emotion/styled'
import PropTypes from 'prop-types'

import { toLocaleString } from '../helpers'

const Wrapper = styled.div`
 width: 500px;
 margin: 0 auto;

  @media (max-width: 420px) {
    width: 100%;
    max-width: 100%;
  }
`

const NoteWrapper = styled.div`
  width: 450px;
  margin: 0 auto;

  @media (max-width: 420px) {
    width: 100%;
  }
`

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Card = styled.div`
  width: 200px;
  padding: 20rem;
  text-align: center;

  .label {
    font-size: 14rem;
    font-weight: 200;
    margin-bottom: 8rem;
    color: #72757e;
  }

  .number {
    font-size: 40rem;
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

const getSummarizedData = (data = []) => data.reduce((acc, cur) => {
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

const Summary = ({ data = [] }) => {
  if (!data || data.length === 0) {
    return null
  }

  const countries = data.length
  const { totalRecovered, totalConfirmed, totalDeaths, time } = getSummarizedData(data)
  const [confirmed, recovered, deaths] = [totalConfirmed, totalRecovered, totalDeaths].map(toLocaleString)
  const lastUpdated = time ? new Date(time) : 'showing cached data'

  return (
    <Wrapper>
      <h1 style={{ textAlign: 'center' }}>Infection Status</h1>
      <Flex>
        <Card>
          <div className='label'>Infected Countries</div>
          <div className='number info'>{countries}</div>
        </Card>
        <Card>
          <div className='label'>Total Confirmed</div>
          <div className='number info'>{confirmed}</div>
        </Card>
      </Flex>
      <Flex>
        <Card>
          <div className='label'>Total Recovered</div>
          <div className='number highlight'>{recovered}</div>
        </Card>
        <Card>
          <div className='label'>Total Deaths</div>
          <div className='number danger'>{deaths}</div>
        </Card>
      </Flex>
      <NoteWrapper>
        <p><small>Updated on: {lastUpdated.toString()}</small></p>
      </NoteWrapper>
    </Wrapper>
  )
}

Summary.propTypes = {
  numberOfCountries: PropTypes.number,
  totalConfirmed: PropTypes.number,
  totalRecovered: PropTypes.number,
  totalDeaths: PropTypes.number
}

Summary.defaultProps = {
  numberOfCountries: 0,
  totalConfirmed: 0,
  totalRecovered: 0,
  totalDeaths: 0
}
export default Summary
