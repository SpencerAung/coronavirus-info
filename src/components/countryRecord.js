import styled from '@emotion/styled'

const Card = styled.div`
  width: 450px;
  margin: 20rem auto;
  display: grid;
  grid-template-columns: 10% 2fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-column-gap: 10px;
  grid-template-areas:
    "index title secondary-1"
    "index primary secondary-2";
  padding: 20rem 0;
  background-color: ${props => props.theme.colors.washedWhite};


  @media (max-width: 420px) {
    width: 100%;
    grid-template-columns: 2fr 8fr;
    grid-column-gap: 20px;
    grid-template-areas:
      "index title"
      "index primary"
      "index secondary-1"
      "index secondary-2";
  }

  .title {
    grid-area: title;
  }
  .index {
    grid-area: index;
  }
  .primary {
    grid-area: primary;
  }
  .secondary-1 {
    grid-area: secondary-1;
  }
  .secondary-2 {
    grid-area: secondary-2;
  }
`

const Title = styled.h3`
  font-weight: 400;
  margin: 0;
  color: ${props => props.theme.colors.black};
`

const PrimaryNumber = styled.h3`
  font-weight: 200;
  font-size: 30rem;
  margin: 0;
`
const SecondaryNumber = styled.h4`
  font-size: 20rem;
  font-weight: 200;
  margin: 0;
`
const Index = styled.div`
  color: ${props => props.theme.colors.offWhite};
  font-size: 20rem;
  text-align: right;
`
const Label = styled.small`
  font-size: 14rem;
  font-weight: 200;
  color: ${props => props.theme.colors.grey}
`

function CountryRecord ({ number, country, confirmed, recovered, deaths }) {
  return (
    <Card>
      <Index className='index'>
        <span>{number}</span>
      </Index>
      <Title className='title'>{country}</Title>
      <PrimaryNumber className='primary'>{confirmed} <Label>confirmed</Label></PrimaryNumber>
      {recovered > 0 && <SecondaryNumber className='secondary-1'>{recovered} <Label>recovered</Label></SecondaryNumber>}
      {deaths > 0 && <SecondaryNumber className='secondary-2'>{deaths} <Label>deaths</Label></SecondaryNumber>}
    </Card>
  )
}

export default CountryRecord
