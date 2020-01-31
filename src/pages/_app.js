import '../styles/normalize.css'
import '../styles/style.css'

export default function MyApp ({ Component, pageProps }) {
  return (
    <div style={{ margin: '20rem' }}>
      <Component {...pageProps} />
      <footer style={{ textAlign: 'center', margin: '50rem' }}>
        <a href='https://github.com/SpencerAung/coronavirus-info' target='blank'>github</a>
      </footer>
    </div>
  )
}
