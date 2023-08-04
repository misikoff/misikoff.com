import { Metadata } from 'next'
import { allPackages } from 'contentlayer/generated'

import Header from '@/components/header'

import PackageList from './packageList'
export const metadata: Metadata = {
  title: 'Misikoff - Packages',
  description: 'This is a list of packages I use and my thoughts on them.',
}

export default function Home() {
  const packages = allPackages

  return (
    <div className='flex flex-col items-center justify-center'>
      <main className='flex w-full flex-1 flex-col items-center justify-center px-4 text-center md:px-20'>
        <Header title='Packages' className='mb-4 md:mb-8' />
        <p className='mb-8 max-w-lg text-lg leading-7 text-gray-500'>
          This is a place for me keep track of packages I{"'"}ve found useful
          and take notes on my experiences with them for future reference. If
          someone else finds this helpful, that{"'"}s great!
        </p>
        <PackageList packages={packages} />
      </main>
    </div>
  )
}
