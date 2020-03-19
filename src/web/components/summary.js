import PropTypes from 'prop-types'

import { toLocaleString } from '../helpers'
import { Wrapper, NoteWrapper, Flex, Card } from './summary.style'

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
  const lastUpdated = time ? new Date(time).toUTCString() : ''

  return (
    <Wrapper>
      <h1 style={{ textAlign: 'center' }}>Global Status</h1>
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
        <p>
          <small>
            {!!time && (<span>Updated on:</span>)}
            <span> {lastUpdated.toString()}</span>
          </small>
        </p>
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
