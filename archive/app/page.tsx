import { Metadata } from 'next'
import Link from 'next/link'

import Hexagon from '@/components/blocks/hexagon'
import DotPattern from '@/components/dotPattern'
import Globe from '@/components/globe'

export const metadata: Metadata = {
  title: 'misikoff',
}

export default async function IndexPage() {
  return (
    <div className='relative overflow-hidden'>
      <DotPattern />

      <div className='relative pb-16 pt-6 sm:pb-24'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6' />
        <main className='mx-auto max-w-7xl px-4 sm:mt-0'>
          <div className='text-center'>
            <h1 className='text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl'>
              <span className='font-serif lowercase'>
                Tommy
                <br />
                Misikoff
              </span>
              <div className='flex flex-row justify-center font-mono text-2xl text-blue-600 sm:text-3xl md:text-4xl'>
                software
                <Hexagon className='m-2 h-6 w-6 fill-slate-500 transition-transform duration-1000 ease-in-out hover:rotate-180 md:mt-3' />
                statistics
              </div>
            </h1>
            <p className='mx-auto mt-3 max-w-md text-left text-base text-gray-500 sm:text-lg md:mt-8 md:max-w-3xl md:text-xl'>
              This is a growing hub where I discuss novel concepts and their
              applications.
              <br />
              <br />
              Content is broken up into{' '}
              <span className='px-1 font-mono text-blue-600'>
                articles
              </span> and{' '}
              <span className='pl-1 font-mono text-blue-600'>sandboxes</span>.
              Articles have a narrative focus, often introducing concepts to be
              explored experimentally through sandboxes.
            </p>
            <div className='mx-auto mt-8 max-w-md sm:flex sm:justify-center md:mt-8'>
              <div className='rounded-md shadow'>
                <Link
                  href='/articles'
                  className='flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-700 md:px-10 md:py-4 md:text-lg'
                >
                  Read Articles
                </Link>
              </div>
              <div className='mt-3 rounded-md shadow sm:ml-3 sm:mt-0'>
                <Link
                  href='/sandboxes'
                  className='flex w-full items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-blue-600 hover:bg-gray-50 md:px-10 md:py-4 md:text-lg'
                >
                  Explore Sandboxes
                </Link>
              </div>
            </div>
            <Globe className='mt-8 h-48 w-48' />
          </div>
        </main>
      </div>
    </div>
  )
}
