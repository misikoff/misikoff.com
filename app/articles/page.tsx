import { compareDesc } from 'date-fns'
import { allArticles } from 'contentlayer/generated'
import { Metadata } from 'next'
import Header from 'components/header'
import PostList from 'components/postList'

export const metadata: Metadata = {
  title: 'Misikoff - Articles',
  description:
    'This is a growing hub where I discuss novel concepts and their applications.',
}

export default function Home() {
  const articles = allArticles.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  )

  return (
    <div className='flex flex-col items-center justify-center'>
      <main className='flex w-full flex-1 flex-col items-center justify-center px-4 text-center md:px-20'>
        <Header title='Articles' className='mb-4 md:mb-8' />
        <PostList posts={articles} />
      </main>
    </div>
  )
}
