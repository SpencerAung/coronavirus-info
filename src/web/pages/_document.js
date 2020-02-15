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
          <link href='https://fonts.googleapis.com/css?family=Lato:400,700|Roboto:400,700&display=swap' rel='stylesheet' />
          <link href='https://fonts.googleapis.com/css?family=Padauk:400,700&display=swap&subset=myanmar' rel='stylesheet' />
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
