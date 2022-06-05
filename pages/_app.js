import Script from 'next/script'
import '../styles/globals.css'
import axios from 'axios'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  axios.defaults.baseURL=process.env.NEXT_PUBLIC_SERVER_URL_API;
  axios.defaults.withCredentials=true;
  return <>
    <Head>
      <meta charSet='utf-8' />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <title>Gede Arya - Web Developer</title>
    </Head>
    <Component {...pageProps} />
    <Script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
      strategy="lazyOnload"
    />

    
  </>
}

export default MyApp
