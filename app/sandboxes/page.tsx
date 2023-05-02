// import type { Metadata } from 'next'
import Header from 'components/header'
import PostList from 'components/postList'
import fs from 'fs'
import { getFileList } from 'lib/api'

// export const metadata: Metadata = {
//   title: 'Sandboxes - Misikoff',
//   description: 'Explore statistical concepts through interactive environments.',
// }

export default async function Sandboxes() {
  const mdxFiles = await getFileList('app/sandboxes')

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
      }
      console.log(metadata)
      return {
        frontMatter: { ...metadata },
        slug: p.replace('app/sandboxes/', '').replace('/page.mdx', ''),
      }
    })
  )

  return (
    <div className='flex flex-col items-center justify-center'>
      <main className='flex w-full flex-1 flex-col items-center justify-center px-4 text-center md:px-20'>
        <Header title='Sandboxes' className='mb-4 md:mb-8' />
        <PostList hideReadTime posts={posts} pathPrefix='/sandboxes/' />
      </main>
    </div>
  )
}
