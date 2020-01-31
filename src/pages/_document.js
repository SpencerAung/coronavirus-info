import Document, { Html, Head, Main, NextScript } from 'next/document'
import Seo from '../components/seo'

class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render () {
    return (
      <Html lang='en'>
        <Head>
          <Seo />
          <link href='https://fonts.googleapis.com/css?family=Lato|Roboto&display=swap' rel='stylesheet' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
