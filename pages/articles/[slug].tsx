import { GetStaticPaths, GetStaticProps } from 'next'
import dynamic from 'next/dynamic'

import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Header from 'components/header'
import Link from 'next/link'
import TailwindImage from 'components/twImage'
import UnsplashImage from 'components/unsplashImage'
import Chassis from 'components/blogHelpers/mult/chassis'
import HeadHelper from 'components/headHelper'
// const Header = dynamic(() => import('components/header'))
// const Link = dynamic(() => import('next/link'))
// const TailwindImage = dynamic(() => import('components/twImage'))
// const UnsplashImage = dynamic(() => import('components/unsplashImage'))
// const Chassis = dynamic(() => import('components/blogHelpers/mult/chassis'))

const components = {
  Header,
  Link,
  TailwindImage,
  UnsplashImage,
  Chassis,
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join('content/articles'))

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.mdx', ''),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug
  const markdownWithMeta = fs.readFileSync(
    path.join(`content/articles/${slug}.mdx`),
    'utf-8'
  )

  const { data: frontMatter, content } = matter(markdownWithMeta)
  const mdxSource = await serialize(content)

  return {
    props: {
      slug,
      frontMatter,
      mdxSource,
    },
  }
}

const PostPage = ({
  slug,
  frontMatter: { title, description, category, date, thumbnailUrl, alt },
  mdxSource,
}: {
  slug: string
  frontMatter: {
    title: string
    description: string
    category: string
    date: Date
    thumbnailUrl: string
    alt: string
  }
  mdxSource: MDXRemoteSerializeResult
}) => {
  return (
    <>
      <HeadHelper
        pageTitle={title}
        title={`${title} - Misikoff`}
        url={`https://misikoff.com/articles/${slug}`}
        description={description}
        // test for linkedin
        image={`${thumbnailUrl}.png`}
        alt={alt}
      />
      <div className='mx-auto mt-4'>
        <Header title={title} category={category} className='mb-6' />
        <div className='prose mx-auto'>
          <MDXRemote {...mdxSource} components={components} />
        </div>
      </div>
    </>
  )
}

export default PostPage
