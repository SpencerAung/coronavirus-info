import styled from '@emotion/styled'

import '../styles/normalize.css'
import '../styles/style.css'

const Wrapper = styled.div`
  width: 600px;
  margin: 0 auto;

  @media (max-width: 420px) {
    width: 100%;
    max-width: 100%;
    margin: 0;
    padding: 20rem;
  }
`

export default function MyApp ({ Component, pageProps }) {
  return (
    <Wrapper>
      <Component {...pageProps} />
      <footer style={{ textAlign: 'center', margin: '50rem' }}>
        <a href='https://github.com/SpencerAung/coronavirus-info' target='blank'>github</a>
      </footer>
    </Wrapper>
  )
}
