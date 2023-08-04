import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { MDXComponents } from 'mdx/types'
import { getMDXComponent } from 'next-contentlayer/hooks'
import { allWords } from 'contentlayer/generated'

import Header from '@/components/header'
import TailwindImage from '@/components/tailwindImage'

// Define your custom MDX components.
const mdxComponents: MDXComponents = {
  // General
  Link: ({ className, href, children }) => (
    <Link className={className} href={href as string}>
      {children}
    </Link>
  ),
  TailwindImage: (props) => <TailwindImage {...props} />,
}

export const generateStaticParams = async () =>
  allWords.map((word) => ({ slug: [word._raw.flattenedPath] }))

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const word = allWords.find(
    (word) =>
      word._raw.flattenedPath === `words/${params.slug.join('/')}` ||
      word._raw.flattenedPath === `words/${params.slug.join('/')}/page`
  )

  if (word !== undefined) {
    return {
      title: word.title,
      openGraph: {
        title: word.title,
        description: word.description,
        url: `https://misikoff.com/${word._raw.flattenedPath.replace(
          '/page',
          ''
        )}`,
        images: [
          {
            // url: word.thumbnailUrl.replace('auto=format', 'fm=png'),
            // alt: word.alt,
            // width: 800,
            // height: 600,
          },
        ],
        locale: 'en-US',
        // type: 'article',
        // publishedTime: word.published,
        authors: ['Thomas Misikoff'],
      },
      twitter: {
        title: word.title,
        card: 'summary',
        description: word.description,
        images: [
          {
            // url: word.thumbnailUrl.replace('auto=format', 'fm=png'),
            // alt: word.alt,
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
  console.log({ params })
  const word = allWords.find(
    (word) =>
      word._raw.flattenedPath === `words/${params.slug.join('/')}` ||
      word._raw.flattenedPath === `words/${params.slug.join('/')}/page`
  )

  // join array of strings into a path string
  // const path = params.slug.join('/')

  if (word === undefined) {
    notFound()
  }

  const MDXContent = getMDXComponent(word.body.code)

  return (
    <article className='mx-auto max-w-xl py-8'>
      <Header title={word.title} className='mb-6' />
      <div className='prose'>
        <blockquote className='mx-auto w-fit rounded-md bg-slate-200 px-4 py-2 text-gray-900'>
          <MDXContent components={mdxComponents} />
        </blockquote>
      </div>
      <div className='mt-6 text-center'>— {word.author}</div>
    </article>
  )
}
