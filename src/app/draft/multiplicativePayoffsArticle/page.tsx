import Link from 'next/link'

import Chassis from '../helpers/chassis'
// import TailwindImage from '@/components/TailwindImage'

export const thumbnailUrl =
  'https://images.unsplash.com/photo-1585347374528-f2a81c8693b3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format'
export const alt = 'coin embedded in snow'

export default function MultiplicativePayoffsArticle() {
  return (
    <article className='prose prose-lg mx-auto py-8'>
      <h1>Multiplicative Payoffs: Would You Play?</h1>
      <p>
        Suppose you find a new game in your neighborhood casino. It costs{' '}
        <strong>$100</strong> to play. Your bet is put into the pot. Your payoff
        is determined by <strong>10</strong> consecutive coin tosses.
      </p>
      <ul>
        <li>
          After each heads the pot{' '}
          <span className='font-extrabold text-green-700'>increases 50%</span>.
        </li>
        <li>
          After each tails the pot{' '}
          <span className='font-extrabold text-red-600'>decreases 40%</span>.
        </li>
      </ul>
      <p>
        After <strong>10</strong> tosses, whatever&apos;s in the pot is yours.
      </p>
      {/* <figure>
        <TailwindImage
          className='h-96 w-full'
          src={thumbnailUrl}
          alt={alt}
          width={600}
          height={450}
          priority
          unsplash
        />
      </figure> */}
      <p>
        You perform some quick calculations and find the expected value of the
        pot at the end of the game is about <strong>$162.88</strong>.
      </p>
      <p>Would you play?</p>
      <Chassis>
        <div className='font-bold text-gray-900'>
          Want to make your own rules? Visit the sandbox to see how changing the
          parameters of the game affects the distribution of outcomes.
        </div>
        <div className='isolate mt-4 flex justify-center'>
          <Link
            href='/sandboxes/multiplicativePayoffs'
            className='inline-flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-blue-100 px-5 py-3 text-base font-medium text-blue-700 no-underline transition-colors duration-75 hover:bg-blue-600 hover:text-white'
          >
            Go To Sandbox
          </Link>
        </div>
      </Chassis>
    </article>
  )
}
