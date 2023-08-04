import { Metadata } from 'next'

import Header from '@/components/header'

import GameBoard from './game'

export const metadata: Metadata = {
  title: 'Misikoff - Articles',
  description:
    'This is a growing hub where I discuss novel concepts and their applications.',
}

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center'>
      <main className='flex w-full flex-1 flex-col items-center justify-center px-4 text-center md:px-20'>
        <Header title='2048 - My Way' className='mb-4 md:mb-8' />
        <GameBoard />
      </main>
    </div>
  )
}
