import { AppProps } from 'next/dist/shared/lib/router/router'
import Head from 'next/head'
import Layout from 'components/layout'
import { Inter } from 'next/font/google'
import { usePanelbear } from '@panelbear/panelbear-nextjs'
import 'tailwindcss/tailwind.css'

const meta = {
  title: 'Misikoff',
  description:
    'This is a growing hub where I discuss novel concepts and their applications.',
  url: 'https://misikoff.com',
  logoAlt: 'wave ball logo',
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

function MyApp({ Component, pageProps }: AppProps) {
  usePanelbear('4BATPpqorpU', { scriptSrc: '/bear.js' })

  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
        />

        <meta
          property='application-name'
          key='application-name'
          content={meta.title}
        />
        <meta
          property='apple-mobile-web-app-capable'
          key='apple-mobile-web-app-capable'
          content='yes'
        />
        <meta
          property='apple-mobile-web-app-status-bar-style'
          key='apple-mobile-web-app-status-bar-style'
          content='default'
        />
        <meta
          property='apple-mobile-web-app-title'
          key='apple-mobile-web-app-title'
          content={meta.title}
        />
        <meta
          property='description'
          key='description'
          content={meta.description}
        />
        <meta
          property='format-detection'
          key='format-detection'
          content='telephone=no'
        />
        <meta
          property='mobile-web-app-capable'
          key='mobile-web-app-capable'
          content='yes'
        />
        <meta property='theme-color' key='theme-color' content='#ffffff' />

        {/* Microsoft */}
        {/* <meta
            property='msapplication-config'
            key='msapplication-config'
            content='/icons/browserconfig.xml'
          />
          <meta
            property='msapplication-TileColor'
            key='msapplication-TileColor'
            content='#3a7ff3'
          />
          <meta
            property='msapplication-tap-highlight'
            key='msapplication-tap-highlight'
            content='no'
          /> */}

        {/* Twitter */}
        <meta property='twitter:card' key='twitter:card' content='summary' />
        <meta property='twitter:url' key='twitter:url' content={meta.url} />
        <meta
          property='twitter:title'
          key='twitter:title'
          content={meta.title}
        />
        <meta
          property='twitter:description'
          key='twitter:description'
          content={meta.description}
        />
        <meta
          property='twitter:image'
          key='twitter:image'
          content='https://misikoff.com/icons-auto/manifest-icon-192.maskable.png'
        />
        <meta
          property='twitter:image:alt'
          key='twitter:image:alt'
          content={meta.logoAlt}
        />
        <meta property='twitter:site' key='twitter:site' content='@TMisikoff' />
        <meta
          property='twitter:creator'
          key='twitter:creator'
          content='@TMisikoff'
        />

        {/* OpenGraph */}
        <meta property='og:type' key='og:type' content='website' />
        <meta property='og:title' key='og:title' content={meta.title} />
        <meta
          property='og:description'
          key='og:description'
          content={meta.description}
        />
        <meta property='og:site_name' key='og:site_name' content={meta.title} />
        <meta property='og:url' key='og:url' content={meta.url} />
        <meta
          property='og:image'
          key='og:image'
          content='https://misikoff.com/icons-auto/manifest-icon-512.maskable.png'
        />
        <meta
          property='og:image:alt'
          key='og:image:alt'
          content={meta.logoAlt}
        />

        <meta name='author' content='Tommy Misikoff' />
      </Head>
      <Layout className={`${inter.variable} font-sans`}>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
