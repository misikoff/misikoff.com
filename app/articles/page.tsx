import { Metadata } from 'next'
import Header from 'components/header'
import PostList from 'components/postList'
import fs from 'fs'
import { getFileList } from 'lib/api'
import readingTime from 'reading-time'

// export const metadata: Metadata = {
//   title: 'Articles - Misikoff',
//   description: 'Read stories introducing novel statistical concepts.',
// }

export default async function Home() {
  const mdxFiles = await getFileList('app/articles')

  console.log({ mdxFiles })

  const posts = await Promise.all(
    mdxFiles.map(async (p: string) => {
      let metadata = {} as any
      const curModule = await import(`${p}`)
      if (curModule.metadata) {
        metadata = curModule.metadata
      }

      const markdownWithMeta = fs.readFileSync(p, 'utf-8')
      metadata = {
        ...metadata,
        wordCount: markdownWithMeta.split(/\s+/gu).length,
        readingTime: readingTime(markdownWithMeta) as { time: number },
      }
      console.log(metadata)
      return {
        frontMatter: { ...metadata },
        slug: p.replace('app/articles/', '').replace('/page.mdx', ''),
      }
    })
  )
  // console.log({ posts })

  return (
    <div className='flex flex-col items-center justify-center'>
      <main className='flex w-full flex-1 flex-col items-center justify-center px-4 text-center md:px-20'>
        <Header title='Articles' className='mb-4 md:mb-8' />
        <PostList posts={posts} pathPrefix='/articles/' />
      </main>
    </div>
  )
}
