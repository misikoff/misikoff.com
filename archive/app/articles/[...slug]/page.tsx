import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { MDXComponents } from 'mdx/types'
import { getMDXComponent } from 'next-contentlayer/hooks'
import { allArticles } from 'contentlayer/generated'

import Header from '@/components/header'
// Multiplicative Payoffs
import TailwindImage from '@/components/tailwindImage'
import Chassis from '@/content/articles/risk/multiplicativePayoffs/helpers/chassis'

// Define your custom MDX components.
const mdxComponents: MDXComponents = {
  // General
  Link: ({ className, href, children }) => (
    <Link className={className} href={href as string}>
      {children}
    </Link>
  ),
  TailwindImage: (props) => <TailwindImage {...props} />,
  // h1: (props: any) => (
  //   <h2
  //     className='relative mt-3 border-t-2 border-rose-200/5 pt-9 text-xl font-medium text-rose-100/90 sm:text-3xl'
  //     {...props}
  //   />
  // ),
  // h2: (props: any) => (
  //   <h3
  //     className='relative mt-3 border-t-2 border-rose-200/5 pt-9 text-xl font-medium text-rose-100/90 sm:text-2xl'
  //     {...props}
  //   />
  // ),
  // h3: (props: any) => (
  //   <h4 className='text-xl font-medium text-rose-100/90' {...props} />
  // ),
  // h4: (props: any) => (
  //   <h5 className='text-lg font-medium text-rose-100/90' {...props} />
  // ),

  // Multiplicative Payoffs
  Chassis: ({ children }) => <Chassis>{children}</Chassis>,
}

export const generateStaticParams = async () =>
  allArticles.map((article) => ({ slug: [article._raw.flattenedPath] }))

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const article = allArticles.find(
    (article) =>
      article._raw.flattenedPath === `articles/${params.slug}` ||
      `articles/${params.slug}/page`,
  )

  if (article !== undefined) {
    return {
      title: article.title,
      openGraph: {
        title: article.title,
        description: article.description,
        url: `https://misikoff.com/${article._raw.flattenedPath.replace(
          '/page',
          '',
        )}`,
        images: [
          {
            url: article.thumbnailUrl.replace('auto=format', 'fm=png'),
            alt: article.alt,
            // width: 800,
            // height: 600,
          },
        ],
        locale: 'en-US',
        type: 'article',
        publishedTime: article.published,
        authors: ['Thomas Misikoff'],
      },
      twitter: {
        title: article.title,
        card: 'summary',
        description: article.description,
        images: [
          {
            url: article.thumbnailUrl.replace('auto=format', 'fm=png'),
            alt: article.alt,
            // width: 800,
            // height: 600,
          },
        ],
      },
    }
  }
}

export default function ArticleLayout({
  params,
}: {
  params: { slug: string[] }
}) {
  const article = allArticles.find(
    (article) =>
      article._raw.flattenedPath === `articles/${params.slug.join('/')}` ||
      article._raw.flattenedPath === `articles/${params.slug.join('/')}/page`,
  )

  if (article === undefined) {
    notFound()
  }

  const MDXContent = getMDXComponent(article.body.code)

  return (
    <article className='mx-auto max-w-xl py-8'>
      <Header title={article.title} className='mb-6' />
      <div className='prose mx-auto'>
        <MDXContent components={mdxComponents} />
      </div>
    </article>
  )
}
