import styled from '@emotion/styled'
import Router from 'next/router'
import withGA from 'next-ga'
import { ThemeProvider } from 'emotion-theming'
import {
  FaGithub as GithubIcon,
  FaTwitter as TwitterIcon
} from 'react-icons/fa'

import NavBar from '../components/navBar'
import '../styles/normalize.css'
import '../styles/style.css'
import theme from '../theme'
import useExternalApiData from '../hooks/useExternalApiData'
import StatusContext from '../context/statusContext'

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
  padding: 10rem;
`
const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    margin: 0 20rem;
  }

  svg {
    vertical-align: middle;
  }
`

function MyApp ({ Component, pageProps }) {
  const fetchedData = useExternalApiData(process.env.API_ENDPOINT, [])
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <NavBar />
        <Content>
          <StatusContext.Provider value={fetchedData}>
            <Component {...pageProps} />
          </StatusContext.Provider>
        </Content>
        <Footer style={{ textAlign: 'center', margin: '50rem' }}>
          <a
            href='https://github.com/SpencerAung/coronavirus-info'
            target='_blank'
            rel='nofollow noreferrer noopener'
          >
            <GithubIcon /> Github
          </a>
          <a
            href='https://twitter.com/SpencerAung'
            target='_blank'
            rel='nofollow noreferrer noopener'
          >
            <TwitterIcon /> SpencerAung
          </a>
        </Footer>
      </Wrapper>
    </ThemeProvider>
  )
}

export default withGA('UA-143775629-4', Router)(MyApp)
