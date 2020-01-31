import styled from '@emotion/styled'

const Wrapper = styled.div`
 width: 500px;
 margin: 0 auto;

  @media (max-width: 420px) {
    width: 100%;
    max-width: 100%;
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
  }

  .number {
    font-size: 40rem;
    color: ${(props) => props.color};
  }
`
const infoColor = '#2b2c34'
const dangerColor = '#e45858'
const highlightColor = '#2cb67d'

const Summary = ({ numberOfCountries, totalConfirmed, totalRecovered, totalDeaths }) => (
  <Wrapper>
    <Flex>
      <Card color={infoColor}>
        <div className='label'>Infected Countries</div>
        <div className='number'>{numberOfCountries}</div>
      </Card>
      <Card color={infoColor}>
        <div className='label'>Total Confirmed</div>
        <div className='number'>{totalConfirmed}</div>
      </Card>
    </Flex>
    <Flex>
      <Card color={highlightColor}>
        <div className='label'>Total Recovered</div>
        <div className='number'>{totalRecovered}</div>
      </Card>
      <Card color={dangerColor}>
        <div className='label'>Total Deaths</div>
        <div className='number'>{totalDeaths}</div>
      </Card>
    </Flex>
  </Wrapper>
)

export default Summary
