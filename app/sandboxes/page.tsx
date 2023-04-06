import readingTime from 'reading-time'

// import { getPostBySlug, getAllPosts } from 'lib/api'

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import Header from 'components/header'
import PostList from 'components/postList'
// import HeadHelper from 'components/headHelper'

export default function Sandboxes() {
  const files = fs.readdirSync(path.join('content/sandboxes'))
  console.log(files)
  const posts = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join('content/sandboxes', filename),
      'utf-8'
    )
    const { data: frontMatter } = matter(markdownWithMeta)

    return {
      // frontMatter,
      frontMatter: {
        wordCount: markdownWithMeta.split(/\s+/gu).length,
        readingTime: readingTime(markdownWithMeta),
        ...frontMatter,
      },
      slug: filename.split('.')[0],
    }
  })
  console.log({ posts })
  // const posts = getAllPosts(['slug'])

  return (
    // <>
    // <HeadHelper
    //   pageTitle='Sandboxes'
    //   title='Sandboxes - Misikoff'
    //   url='https://misikoff.com/sandboxes'
    //   description='Explore statistical concepts through interactive environments.'
    // />

    <div className='flex flex-col items-center justify-center'>
      <main className='flex w-full flex-1 flex-col items-center justify-center px-4 text-center md:px-20'>
        <Header title='Sandboxes' className='mb-4 md:mb-8' />
        <PostList hideReadTime posts={posts} pathPrefix='/sandboxes/' />
      </main>
    </div>
    // </>
  )
}
