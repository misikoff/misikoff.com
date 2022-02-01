import Head from 'next/head'

export default function HeadHelper({
  pageTitle,
  title,
  url,
  description,
  image,
  alt,
}: {
  pageTitle?: string
  title?: string
  url?: string
  description?: string
  image?: string
  alt?: string
}) {
  return (
    <Head>
      {pageTitle && <title>{pageTitle}</title>}
      {url && (
        <>
          <meta property='twitter:url' key='twitter:url' content={url} />
          <meta property='og:url' key='og:url' content={url} />
        </>
      )}
      {title && (
        <>
          <meta property='twitter:title' key='twitter:title' content={title} />
          <meta property='og:title' key='og:title' content={title} />
        </>
      )}
      {description && (
        <>
          <meta
            property='twitter:description'
            key='twitter:description'
            content={description}
          />
          <meta
            property='og:description'
            key='og:description'
            content={description}
          />
        </>
      )}
      {image && <meta property='og:image' key='og:image' content={image} />}
      {alt && <meta property='og:image:alt' key='og:image:alt' content={alt} />}
    </Head>
  )
}
