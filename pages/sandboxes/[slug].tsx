import { GetStaticPaths, GetStaticProps } from 'next'
import dynamic from 'next/dynamic'

import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import HeadHelper from 'components/headHelper'
// import Header from 'components/header'

const Header = dynamic(() => import('components/header'))
const Link = dynamic(() => import('next/link'))
const TailwindImage = dynamic(() => import('components/twImage'))
const UnsplashImage = dynamic(() => import('components/unsplashImage'))
const Chassis = dynamic(() => import('components/blogHelpers/mult/chassis'))
const MultSandbox = dynamic(() => import('components/blogHelpers/mult/sandbox'))

const components = {
  Header,
  Link,
  TailwindImage,
  UnsplashImage,
  Chassis,
  MultSandbox,
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join('content/sandboxes'))

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
    path.join(`content/sandboxes/${slug}.mdx`),
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
  frontMatter: { title, description, category, date },
  mdxSource,
}: {
  slug: string
  frontMatter: {
    title: string
    description: string
    category: string
    date: Date
  }
  mdxSource: MDXRemoteSerializeResult
}) => {
  return (
    <>
      <HeadHelper
        pageTitle={title}
        title={`${title} - Misikoff`}
        url={`https://misikoff.com/sandboxes/${slug}`}
        description={description}
      />
      <div className='mx-auto mt-4 mb-16'>
        {/* <Header title={title} category={category} /> */}
        <MDXRemote {...mdxSource} components={components} />
      </div>
    </>
  )
}

export default PostPage
