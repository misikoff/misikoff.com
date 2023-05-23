import { compareDesc } from 'date-fns'
import { allSandboxes } from 'contentlayer/generated'
import { Metadata } from 'next'
import Header from 'components/header'
import PostList from 'components/postList'

export const metadata: Metadata = {
  title: 'Sandboxes - Misikoff',
  description: 'Explore statistical concepts through interactive environments.',
}

export default function Home() {
  const sandboxes = allSandboxes.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  )

  console.log({ sandboxes })

  return (
    <div className='flex flex-col items-center justify-center'>
      <main className='flex w-full flex-1 flex-col items-center justify-center px-4 text-center md:px-20'>
        <Header title='Sandboxes' className='mb-4 md:mb-8' />
        <PostList hideReadTime posts={sandboxes} />
      </main>
    </div>
  )
}
