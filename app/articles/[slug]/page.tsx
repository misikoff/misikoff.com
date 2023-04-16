'use-client'

import Link from 'next/link'
import Header from 'components/header'
// import TailwindImage from 'components/twImage'
// import UnsplashImage from 'components/unsplashImage'
// import Chassis from 'components/blogHelpers/mult/chassis'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'

import dynamic from 'next/dynamic'
// const Header = dynamic(() => import('components/header'))
// const Link = dynamic(() => import('next/link'))
const TailwindImage = dynamic(() => import('components/twImage'))
const UnsplashImage = dynamic(() => import('components/unsplashImage'))
const Chassis = dynamic(() => import('components/blogHelpers/mult/chassis'))

const components = {
  Header,
  Link,
  TailwindImage,
  UnsplashImage,
  Chassis,
}

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join('content/articles'))

  return files.map((filename) => ({
    params: {
      slug: filename.replace('.mdx', ''),
    },
  }))
}

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const slug = params.slug
  const markdownWithMeta = fs.readFileSync(
    path.join(`content/articles/${slug}.mdx`),
    'utf-8'
  )

  const { content, frontmatter } = await compileMDX<{ title: string }>({
    source: markdownWithMeta,
    options: { parseFrontmatter: true },
    components,
  })

  return (
    <div className='mx-auto mt-4'>
      <Header
        title={frontmatter.title}
        // category={frontmatter.category}
        className='mb-6'
      />
      <div className='prose mx-auto'>{content}</div>
    </div>
  )
}
