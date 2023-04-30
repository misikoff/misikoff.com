import Header from 'components/header'
import { customParser } from 'lib/api'
import fs from 'fs'
import path from 'path'

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join('content/articles'))

  return files.map((filename) => ({
    slug: filename.replace('.mdx', ''),
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

  const { content, frontmatter } = await customParser(markdownWithMeta)

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
