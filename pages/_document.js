import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html className="h-full">
        <Head>
          <meta name="application-name" content="PWA App" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="PWA App" />
          <meta name="description" content="Best PWA App in the world" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta
            name="msapplication-config"
            content="/icons/browserconfig.xml"
          />
          <meta name="msapplication-TileColor" content="#3a7ff3" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#ffffff" />

          <link rel="apple-touch-icon" href="/icons-auto/apple-icon-180.png" />
          {/* <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/icons/touch-icon-ipad.png"
          /> */}
          {/* <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icons/touch-icon-iphone-retina.png"
          /> */}
          {/* <link
            rel="apple-touch-icon"
            sizes="167x167"
            href="/icons/touch-icon-ipad-retina.png"
          /> */}

          {/* <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/icons/favicon-32x32.png"
          /> */}
          {/* <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/icons/favicon-16x16.png"
          /> */}
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="mask-icon"
            href="/icons-auto/manifest-icon-192.maskable.png"
            color="#3a7ff3"
          />
          <link rel="shortcut icon" href="/favicon.ico" />
          {/* <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          /> */}

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://yourdomain.com" />
          <meta name="twitter:title" content="PWA App" />
          <meta
            name="twitter:description"
            content="Best PWA App in the world"
          />
          <meta
            name="twitter:image"
            content="https://yourdomain.com/icons/manifest-icon-192.maskable.png"
          />
          <meta name="twitter:creator" content="@TMisikoff" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="PWA App" />
          <meta property="og:description" content="Best PWA App in the world" />
          <meta property="og:site_name" content="PWA App" />
          <meta property="og:url" content="https://yourdomain.com" />
          <meta
            property="og:image"
            content="https://yourdomain.com/icons/apple-icon-180.png"
          />

          {/* apple splash screen images */}
          <link
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
          />
        </Head>
        <body className="h-full">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
