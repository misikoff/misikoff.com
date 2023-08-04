import { Metadata } from 'next'
import Link from 'next/link'
import clsx from 'clsx'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { FaRebel } from 'react-icons/fa'
import { FaFireFlameCurved } from 'react-icons/fa6'
import { GiCapitol, GiGreekTemple, GiUnionJack } from 'react-icons/gi'
import { PiBarbellFill, PiFeatherFill } from 'react-icons/pi'
import { RiBoxingFill } from 'react-icons/ri'
import { SiRome } from 'react-icons/si'
import { Word, allWords } from 'contentlayer/generated'

import Header from '@/components/header'
import { shuffle } from '@/lib/utilityFunctions'

export const metadata: Metadata = {
  title: 'Misikoff - Words',
  description:
    'This is a growing hub where I discuss novel concepts and their applications.',
}

function getIcon(word: Word, className?: string) {
  switch (word.icon) {
    case 'arch':
      return <SiRome className={className} />
    case 'temple':
      return <GiGreekTemple className={className} />
    case 'British flag':
      return (
        <GiUnionJack
          className={clsx(className, 'rounded-lg bg-black text-white')}
        />
      )
    case 'capitol':
      return <GiCapitol className={className} />
    case 'Star Wars':
      return <FaRebel className={className} />
    case 'boxing glove':
      return <RiBoxingFill className={className} />
    case 'feather':
      return <PiFeatherFill className={className} />
    case 'fire':
      return <FaFireFlameCurved className={className} />
    case 'dumbbell':
      return <PiBarbellFill className={className} />
    default:
      return <span>haha</span>
  }
}

function WordBlock({ word }: { word: Word }) {
  const MDXContent = useMDXComponent(word.body.code)
  return (
    <div className='@container'>
      <figure className='w-full space-y-6 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5 transition @lg:space-y-8 @lg:p-10'>
        <blockquote className='prose line-clamp-3 text-left text-gray-900 @lg:text-xl @lg:font-semibold @lg:tracking-tight'>
          <MDXContent />
        </blockquote>
        <figcaption className='flex items-center justify-between gap-x-4'>
          <div className='h-8 w-8' />

          <div>
            <Link
              href={word.url}
              className='font-semibold transition-colors duration-150 hover:text-blue-500'
            >
              {word.title}
            </Link>
            <div className='text-gray-600'> {`${word.author}`}</div>
          </div>

          <div className='h-8 w-8'>{getIcon(word, 'h-8 w-8')}</div>
        </figcaption>
      </figure>
    </div>
  )
}

export default function Home() {
  const words = allWords

  return (
    <div className='flex flex-col items-center justify-center'>
      <main className='flex w-full flex-1 flex-col items-center justify-center px-4 text-center md:px-20'>
        <Header title='Words' className='mb-4 md:mb-8' />
        <p className='mb-8 text-lg leading-7 text-gray-500'>
          This is a list of nice words.
        </p>

        <div
          className='mx-auto mt-16 grid w-full max-w-md grid-flow-dense
          grid-cols-1 grid-rows-[masonry] gap-8 text-sm
          leading-6 text-gray-900 sm:mt-20 sm:max-w-2xl
          sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-cols-4'
        >
          {shuffle(words).map((word) => (
            <div
              key={word.title}
              className='odd:sm:col-span-2 first:xl:col-start-2'
            >
              <WordBlock word={word} />
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
