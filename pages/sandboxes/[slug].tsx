import { GetStaticPaths, GetStaticProps } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'

import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Header from 'components/header'

const DynamicHeader = dynamic(() => import('components/header'))
const Link = dynamic(() => import('next/link'))
const TaillwindImage = dynamic(() => import('components/twImage'))
const UnsplashImage = dynamic(() => import('components/unsplashImage'))
const ChartTest = dynamic(() => import('components/blogHelpers/mult/chassis'))
const MultSandbox = dynamic(() => import('components/blogHelpers/mult/sandbox'))

const components = {
  Header: DynamicHeader,
  Link,
  TaillwindImage,
  UnsplashImage,
  ChartTest,
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
      frontMatter,
      mdxSource,
    },
  }
}

const PostPage = ({
  frontMatter: { title, category, date },
  mdxSource,
}: {
  frontMatter: { title: string; category: string; date: Date }
  mdxSource: MDXRemoteSerializeResult
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className='mt-4'>
        <div className='mx-auto'>
          {/* <Header title={title} category={category} /> */}
          <MDXRemote {...mdxSource} components={components} />
        </div>
      </div>
    </>
  )
}

export default PostPage
