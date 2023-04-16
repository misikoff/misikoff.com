'use client'

import Header from 'components/header'
import Link from 'next/link'
// import TailwindImage from 'components/twImage'
import UnsplashImage from 'components/unsplashImage'
import Chassis from 'components/blogHelpers/mult/chassis'

export default function PostPage() {
  return (
    <div className='mt-4'>
      <div className='prose mx-auto'>
        <Header title={'THIS IS A TEST'} />
        Suppose you find a new game in your neighborhood casino. It costs
        **$100** to play. Your bet is put into the pot. Your payoff is
        determined by **10** consecutive coin tosses. * After each heads the pot
        is <span className='font-extrabold text-green-700'>increased 50%</span>.
        * After each tails the pot is{' '}
        <span className='font-extrabold text-red-600'>decreased 40%</span>.
        After **10** tosses, whatever{"'"}s in the pot is yours. ##
        Phone-A-Friend Curious, you call up your friend, a fellow studying
        mathematics at MIT. He{"'"}s rather busy. You explain the situation and
        he jots it all down. After a few minutes he says the expected value of
        the pot at the end of the game is about **$162.88**. He wishes you luck
        as he hurries off the phone to make it to office hours.
        <figure>
          <UnsplashImage
            className='h-96 w-full rounded-lg'
            src='https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
            fit='facearea'
            q={100}
            facepad={3}
            width={1310}
            height={873}
          />
          {/* <TailwindImage
              className='h-96 w-full'
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&w=1310&h=873&q=100&facepad=3"
              alt='Article Image'
              width={400}
              height={200}
          /> */}
          <figcaption>
            Your mathematician friend. He bears a striking resemblance to a
            stock photo you saw online.
          </figcaption>
        </figure>
        ## Your Turn The area between you and the game clears. Do you play?
        {'>'} Carpe diem.
        <Chassis>
          <p className='font-bold text-gray-900'>
            Want to make your own rules? Visit the sandbox to see how changing
            the parameters of the game affects the distribution of outcomes.
          </p>
          <div className='isolate mt-4 flex justify-center'>
            <Link
              href='/sandboxes/multiplicativePayoffs'
              className='inline-flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-blue-100 px-5 py-3 text-base font-medium text-blue-700 transition-colors duration-75 hover:bg-blue-600 hover:text-white'
            >
              Go To Sandbox
            </Link>
          </div>
          <p>
            This article was inspired by the work of Ole Peters in the field of
            ergodicity economics.
            <br />
            Visit his{' '}
            <a
              href='https://ergodicityeconomics.com/'
              className='transition-colors duration-75 hover:text-blue-600'
            >
              blog
            </a>{' '}
            to learn more.
          </p>
        </Chassis>
        <Chassis />
      </div>
    </div>
  )
}
