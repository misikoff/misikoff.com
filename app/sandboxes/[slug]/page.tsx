import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Header from 'components/header'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'

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

export const metadata: Metadata = {
  title: 'Sandboxes - Misikoff',
  description: 'Explore statistical concepts through interactive environments.',
}

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join('content/sandboxes'))

  return files.map((filename) => ({
    params: {
      slug: filename.replace('.mdx', ''),
    },
  }))
}

export default async function SandboxSlugPage({
  params,
}: {
  params: { slug: string }
}) {
  const slug = params?.slug
  const markdownWithMeta = fs.readFileSync(
    path.join(`content/sandboxes/${slug}.mdx`),
    'utf-8'
  )

  const { content, frontmatter } = await compileMDX<{ title: string }>({
    source: markdownWithMeta,
    options: { parseFrontmatter: true },
    components,
  })

  return (
    <div className='mx-auto mb-16 mt-4'>
      <Header
        title={frontmatter.title}
        // category={frontMatter.category}
      />
      {content}
    </div>
  )
}
