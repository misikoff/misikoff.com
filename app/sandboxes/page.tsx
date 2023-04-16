import type { Metadata } from 'next'
import Header from 'components/header'
import PostList from 'components/postList'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import readingTime from 'reading-time'

export const dynamicParams = true

export const metadata: Metadata = {
  title: 'Sandboxes - Misikoff',
  description: 'Explore statistical concepts through interactive environments.',
}

export default function Sandboxes() {
  const files = fs.readdirSync(path.join('content/sandboxes'))
  console.log(files)
  const posts: Post[] = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join('content/sandboxes', filename),
      'utf-8'
    )
    const { data: frontMatter } = matter(markdownWithMeta)

    return {
      frontMatter: {
        wordCount: markdownWithMeta.split(/\s+/gu).length,
        readingTime: readingTime(markdownWithMeta) as { time: number },
        ...frontMatter,
      } as FrontMatter,
      slug: filename.split('.')[0],
    }
  })

  return (
    <div className='flex flex-col items-center justify-center'>
      <main className='flex w-full flex-1 flex-col items-center justify-center px-4 text-center md:px-20'>
        <Header title='Sandboxes' className='mb-4 md:mb-8' />
        <PostList hideReadTime posts={posts} pathPrefix='/sandboxes/' />
      </main>
    </div>
  )
}
