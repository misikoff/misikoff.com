import type { Metadata } from 'next'
import Header from 'components/header'
import fs from 'fs'
import path from 'path'
import { customParser } from 'lib/api'

export const metadata: Metadata = {
  title: 'Sandboxes - Misikoff',
  description: 'Explore statistical concepts through interactive environments.',
}

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join('content/sandboxes'))

  return files.map((filename) => ({
    slug: filename.replace('.mdx', ''),
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

  const { content, frontmatter } = await customParser(markdownWithMeta)

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
