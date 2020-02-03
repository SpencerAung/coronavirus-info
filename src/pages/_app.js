import styled from '@emotion/styled'
import Router from 'next/router'
import withGA from 'next-ga'
import { ThemeProvider } from 'emotion-theming'

import NavBar from '../components/navBar'
import '../styles/normalize.css'
import '../styles/style.css'
import theme from '../theme'

const Wrapper = styled.div`
  width: 600px;
  margin: 0 auto;

  @media (max-width: 420px) {
    width: 100%;
    max-width: 100%;
    margin: 0;
  }
`
const Content = styled.div`
  padding: 20rem;
`

function MyApp ({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <NavBar />
        <Content>
          <Component {...pageProps} />
        </Content>
        <footer style={{ textAlign: 'center', margin: '50rem' }}>
          <a href='https://github.com/SpencerAung/coronavirus-info' target='_blank' rel='nofollow noreferrer noopener'>github</a>
        </footer>
      </Wrapper>
    </ThemeProvider>
  )
}

export default withGA('UA-143775629-4', Router)(MyApp)
