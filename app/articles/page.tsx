import { Metadata } from 'next'
import Header from 'components/header'
import PostList from 'components/postList'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import readingTime from 'reading-time'

export const dynamicParams = true

export const metadata: Metadata = {
  title: 'Articles - Misikoff',
  description: 'Read stories introducing novel statistical concepts.',
}

export default async function Home() {
  const files = fs.readdirSync(path.join('content/articles'))
  console.log(files)
  const posts: Post[] = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join('content/articles', filename),
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
        <Header title='Articles' className='mb-4 md:mb-8' />
        <PostList posts={posts} pathPrefix='/articles/' />
      </main>
    </div>
  )
}
