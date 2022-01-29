import { GetStaticProps } from 'next'
import Head from 'next/head'
import readingTime from 'reading-time'

// import { getPostBySlug, getAllPosts } from 'lib/api'

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import Header from 'components/header'
import PostList from 'components/postList'

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
      <Head>
        <title>Articles</title>
      </Head>
      <div className='flex flex-col items-center justify-center'>
        <main className='flex w-full flex-1 flex-col items-center justify-center px-20 text-center'>
          <Header title='Articles' className='mb-4 md:mb-8' />
          <PostList posts={posts} pathPrefix='/articles/' />
        </main>
      </div>
    </>
  )
}

export default Home
