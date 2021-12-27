import { AppProps } from 'next/dist/shared/lib/router/router'
import 'tailwindcss/tailwind.css'
import Layout from 'components/layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
