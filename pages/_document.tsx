import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      // prefix needed for LinkedIn
      <Html lang='en' className='h-full' prefix='og: http://ogp.me/ns#'>
        <Head>
          <link rel='manifest' href='/manifest.json' />
          {/* images */}
          <link rel='icon' href='/favicon.ico' />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/icons/favicon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/icons/favicon-16x16.png'
          />
          <link
            rel='mask-icon'
            href='/icons-auto/manifest-icon-192.maskable.png'
            // color="#3a7ff3"
          />

          {/* Apple */}
          <link rel='apple-touch-icon' href='/icons-auto/apple-icon-180.png' />
          <link
            rel='apple-touch-icon'
            sizes='152x152'
            href='/icons/touch-icon-ipad.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/icons/touch-icon-iphone-retina.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='167x167'
            href='/icons/touch-icon-ipad-retina.png'
          />

          {/* Apple splash screen images */}
          {/* <link
            rel="apple-touch-startup-image"
            href="/icons-auto/apple-splash-2048-2732.jpg"
            sizes="2048x2732"
          />
          <link
            rel="apple-touch-startup-image"
            href="/icons-auto/apple-splash-1668-2224.jpg"
            sizes="1668x2224"
          />
          <link
            rel="apple-touch-startup-image"
            href="/icons-auto/apple-splash-1536-2048.jpg"
            sizes="1536x2048"
          />
          <link
            rel="apple-touch-startup-image"
            href="/icons-auto/apple-splash-1125-2436.jpg"
            sizes="1125x2436"
          />
          <link
            rel="apple-touch-startup-image"
            href="/icons-auto/apple-splash-1242-2208.jpg"
            sizes="1242x2208"
          />
          <link
            rel="apple-touch-startup-image"
            href="/icons-auto/apple-splash-750-1334.jpg"
            sizes="750x1334"
          />
          <link
            rel="apple-touch-startup-image"
            href="/icons-auto/apple-splash-640-1136.jpg"
            sizes="640x1136"
          /> */}

          {/* styles */}
          <link rel='stylesheet' href='https://rsms.me/inter/inter.css' />
        </Head>
        <body className='h-full'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
