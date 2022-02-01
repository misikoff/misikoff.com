import Link from 'next/link'
import Globe from 'components/globe'
import DotPattern from 'components/dotPattern'
import HeadHelper from 'components/headHelper'

export default function Example() {
  return (
    <>
      <HeadHelper
        pageTitle='Misikoff'
        image='https://drive.google.com/file/d/1ZzrBBJ8O73kTlWK3HDjLtfgPuKodbVnK/preview'
        alt='website home page with logo'
      />
      <div className='relative overflow-hidden'>
        <DotPattern />

        <div className='relative pb-16 pt-6 sm:pb-24'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6' />

          <main className='mx-auto max-w-7xl px-4 sm:mt-0'>
            <div className='text-center'>
              <h1 className='text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl'>
                <span className=''>Tommy Misikoff</span>
                <div className='flex flex-row items-center justify-center text-2xl text-blue-600 sm:text-3xl md:text-4xl'>
                  <span> software engineer </span>

                  <span className='px-2 text-black'> • </span>

                  <span> statistical analyst </span>
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
                </span>{' '}
                and{' '}
                <span className='pl-1 font-mono text-blue-600'>sandboxes</span>.
                Articles have a narrative focus, often introducing concepts to
                be explored experimentally through sandboxes.
              </p>
              <div className='mx-auto mt-8 max-w-md sm:flex sm:justify-center md:mt-8'>
                <div className='rounded-md shadow'>
                  <Link href='/articles'>
                    <a className='flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-700 md:px-10 md:py-4 md:text-lg'>
                      Read Articles
                    </a>
                  </Link>
                </div>
                <div className='mt-3 rounded-md shadow sm:ml-3 sm:mt-0'>
                  <Link href='/sandboxes'>
                    <a className='flex w-full items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-blue-600 hover:bg-gray-50 md:px-10 md:py-4 md:text-lg'>
                      Explore Sandboxes
                    </a>
                  </Link>
                </div>
              </div>
              <Globe />
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
