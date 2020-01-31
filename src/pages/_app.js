import '../styles/normalize.css'
import '../styles/style.css'

export default function MyApp ({ Component, pageProps }) {
  return (
    <div style={{ margin: '20rem' }}>
      <Component {...pageProps} />
    </div>
  )
}
