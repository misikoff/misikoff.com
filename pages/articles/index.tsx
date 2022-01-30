import { GetStaticProps } from 'next'
import readingTime from 'reading-time'

// import { getPostBySlug, getAllPosts } from 'lib/api'

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import Header from 'components/header'
import PostList from 'components/postList'
import HeadHelper from 'components/headHelper'

export const getStaticProps: GetStaticProps = async (_) => {
  const files = fs.readdirSync(path.join('content/articles'))
  console.log(files)
  const posts = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join('content/articles', filename),
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

  return {
    props: {
      posts,
    },
  }
}

const Home = ({ posts = [] as Post[] }) => {
  console.log({ posts })
  // const posts = getAllPosts(['slug'])

  return (
    <>
      <HeadHelper
        pageTitle='Articles'
        title='Articles - Misikoff'
        url='https://misikoff.com/articles'
        description='Read stories introducing novel statistical concepts.'
      />
      <div className='flex flex-col items-center justify-center'>
        <main className='flex w-full flex-1 flex-col items-center justify-center px-4 text-center md:px-20'>
          <Header title='Articles' className='mb-4 md:mb-8' />
          <PostList posts={posts} pathPrefix='/articles/' />
        </main>
      </div>
    </>
  )
}

export default Home
