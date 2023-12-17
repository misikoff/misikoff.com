import Head from 'next/head'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { MDXComponents } from 'mdx/types'
import { getMDXComponent } from 'next-contentlayer/hooks'
import { ImGithub, ImNpm } from 'react-icons/im'
import { IoLogoPython, IoPower } from 'react-icons/io5'
import { allPackages } from 'contentlayer/generated'

import Header from '@/components/header'
import RIcon from '@/components/icons/r'
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
  allPackages.map((pack) => ({ slug: [pack._raw.flattenedPath] }))

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const pack = allPackages.find(
    (pack) =>
      pack._raw.flattenedPath === `packages/${params.slug}` ||
      pack._raw.flattenedPath === `packages/${params.slug}/page`,
  )

  console.log({ pack })

  if (pack !== undefined) {
    return {
      title: pack.title,
      openGraph: {
        title: pack.title,
        description: pack.description,
        url: `https://misikoff.com/${pack._raw.flattenedPath.replace(
          '/page',
          '',
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
        title: pack.title,
        card: 'summary',
        description: pack.description,
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
  const pack = allPackages.find(
    (pack) =>
      // true ||
      pack._raw.flattenedPath === `packages/${params.slug.join('/')}` ||
      pack._raw.flattenedPath === `packages/${params.slug.join('/')}/page`,
  )

  // join array of strings into a path string
  // const path = params.slug.join('/')

  if (pack === undefined) {
    notFound()
  }

  const MDXContent = getMDXComponent(pack.body.code)

  return (
    <article className='mx-auto max-w-xl py-8'>
      <Head>
        <title>{pack.title}</title>
      </Head>
      <Header title={pack.title} category='Packages' className='mb-6'>
        {pack.ecosystem === 'npm' && <ImNpm className='h-6 w-6' />}
        {pack.ecosystem === 'r' && <RIcon className='h-6 w-6' />}
        {pack.ecosystem === 'python' && <IoLogoPython className='h-6 w-6' />}
      </Header>

      <div className='mb-6 border-b-2'>
        {pack.repo && (
          <a
            href={pack.repo}
            className='flex transform items-center fill-gray-400 transition-all duration-75 hover:fill-gray-500'
          >
            <span className='sr-only'>{pack.title} repository</span>
            <ImGithub
              className='m-2 h-6 w-6 duration-150 hover:fill-blue-500'
              aria-hidden='true'
            />
            View Repository
          </a>
        )}
        <div className='m-2'>
          {pack.enabled && (
            <div className='flex items-center gap-2'>
              <IoPower className='h-6 w-6 fill-green-400 group-hover:animate-pulse' />
              <span className='font-mono text-xs'>
                This package is used by the current site.
              </span>
            </div>
          )}
        </div>
      </div>
      <div className='prose mx-auto'>
        <MDXContent components={mdxComponents} />
      </div>
    </article>
  )
}
