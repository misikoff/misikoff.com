import { Metadata } from 'next'
import Link from 'next/link'

import Header from '@/components/header'

export const metadata: Metadata = {
  title: 'Games - Misikoff',
  description: '',
}

type game = {
  slug: string
  title: string
  description: string
}

export default function Home() {
  const games: game[] = [
    {
      slug: '2048',
      title: '🚧 2048 🚧',
      description: 'A clone of the popular game 2048',
    },
    // {
    //   slug: 'globe',
    //   title: 'globe',
    //   description: 'A clone of the popular game globe',
    // },
  ]

  return (
    <div className='flex flex-col items-center justify-center'>
      <main className='flex w-full flex-1 flex-col items-center justify-center px-4 text-center md:px-20'>
        <Header title='Games' className='mb-4 md:mb-8' />
        <ul className='space-y-8'>
          {games.map((game) => (
            <li key={game.title}>
              <Link
                href={`games/${game.slug}`}
                className='group my-4 cursor-pointer'
              >
                <div className='flex w-full max-w-lg flex-col overflow-hidden rounded-lg p-4 shadow-md transition-shadow group-hover:shadow-lg'>
                  <div className='mt-2 block'>
                    <p className='text-xl font-semibold text-gray-900'>
                      {game.title}
                    </p>
                    <p className='mt-3 text-base text-gray-500'>
                      {game.description}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
